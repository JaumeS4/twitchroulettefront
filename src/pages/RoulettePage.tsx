import React, { useContext, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import UsersList from '../components/UsersList';
import ResultsList from '../components/ResultsList';
import { RouletteContext } from '../context/roulette/RouletteContext';
import RouletteTypes from '../types';
import { SocketContext } from '../context/SocketContext';

let wheel: any;

const RoulettePage: React.FC = () => {
    const {
        rouletteState: {
            users,
            winnerObject,
            activeWinner,
            spinning,
            defaultRouletteActive,
            colorIndex,
            defaultUsers,
            colors,
        },
        dispatch,
    } = useContext(RouletteContext);

    const { socket } = useContext(SocketContext);

    const audio = new Audio('/assets/rouletteaudio.mp3');

    const createRoulette = (usersArg: UserType[]) => {
        let ind = 0;

        const segments = usersArg.map((user) => {
            const segmentObj = {
                fillStyle: colors[ind],
                text: user.name,
                textFontSize: 16,
                textFillStyle: '#000',
                strokeStyle: '#fff',
            };

            ind += 1;
            if (ind > 6) ind = 0;
            return segmentObj;
        });
        // eslint-disable-next-line
        // @ts-ignore
        return new Winwheel({
            outerRadius: 250, // Set outer radius so wheel fits inside the background.
            innerRadius: 40, // Make wheel hollow so segments dont go all way to center.
            textFontSize: 24, // Set default font size for the segments.
            textOrientation: 'horizontal', // Make text vertical so goes down from the outside of wheel.
            textAlignment: 'center', // Align text to outside of wheel.
            numSegments: segments.length, // Specify number of segments.
            // Define segments including colour and text.
            segments,
            // Specify the animation to use.
            animation: {
                type: 'spinToStop',
                duration: 5,
                spins: 3,
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                callbackFinished: alertPrize, // Function to call whent the spinning has stopped.
            },
        });
    };

    const alertPrize = (indicatedSegment: any) => {
        dispatch({ type: RouletteTypes.SetActiveWinner, payload: true });
        dispatch({ type: RouletteTypes.SetActiveWinner, payload: true });

        const { text, fillStyle } = indicatedSegment;

        dispatch({ type: RouletteTypes.SetWinnerObject, payload: { text, fillStyle } });
        dispatch({ type: RouletteTypes.SetResult, payload: { result: text } });
    };

    const onSpinClick = () => {
        if (spinning) return;

        if (defaultRouletteActive) {
            wheel = createRoulette(defaultUsers);
        } else {
            wheel = createRoulette(users);
        }

        audio.play();
        wheel.startAnimation();
        dispatch({ type: RouletteTypes.SetSpinning, payload: true });
    };

    const hideWinner = () => {
        dispatch({ type: RouletteTypes.SetActiveWinner, payload: false });
        dispatch({ type: RouletteTypes.SetSpinning, payload: false });
    };

    const addUser = (user: UserType) => {
        if (spinning) return;

        dispatch({ type: RouletteTypes.SetUser, payload: user });

        if (defaultRouletteActive) {
            wheel = createRoulette([user]);

            dispatch({ type: RouletteTypes.IncrementColorIndex });
            dispatch({ type: RouletteTypes.SetDefaultRouletteActive, payload: false });
        } else {
            wheel.addSegment({
                text: user.name,
                fillStyle: colors[colorIndex],
                textFontSize: 16,
                textFillStyle: '#000',
                strokeStyle: '#fff',
            });

            wheel.draw();

            dispatch({ type: RouletteTypes.IncrementColorIndex });

            if (colorIndex >= 6) dispatch({ type: RouletteTypes.ResetColorIndex });
        }
    };

    const removeUser = (name: string, uid: string) => {
        dispatch({ type: RouletteTypes.DeleteUser, payload: uid });
        const newUsers = users.filter((user) => user.uid !== uid);

        if (users.length <= 1) {
            dispatch({ type: RouletteTypes.SetDefaultRouletteActive, payload: true });
            wheel = createRoulette(defaultUsers);
        } else {
            wheel = createRoulette(newUsers);
        }
    };

    const removeAllUsers = () => {
        dispatch({ type: RouletteTypes.DeleteAllUsers });

        wheel.segments.forEach(() => wheel.deleteSegment());

        dispatch({ type: RouletteTypes.SetDefaultRouletteActive, payload: true });
        dispatch({ type: RouletteTypes.ResetColorIndex });
        wheel = createRoulette(defaultUsers);
        wheel.draw();
    };

    useEffect(() => {
        wheel = createRoulette(defaultUsers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket?.on('addUser', ({ name, fromMod }: { name: string; fromMod: boolean }) => {
            if (fromMod) {
                addUser({ name, uid: uuidv4() });
            } else {
                if (users.find((user) => user.name === name)) return;
                addUser({ name, uid: uuidv4() });
            }
        });

        return () => socket?.off('addUser');
    }, [socket, users, spinning, defaultRouletteActive, colorIndex, addUser]);

    return (
        <div>
            <div className='flex h-screen items-center justify-around'>
                <UsersList removeUser={removeUser} removeAllUsers={removeAllUsers} />

                <div
                    className={`${
                        spinning ? '' : 'hover:opacity-80'
                    } transition ease-in-out duration-200`}
                >
                    <div className={` ${spinning ? 'ArrowDown-Spinning' : ''} ArrowDown`} />
                    <canvas
                        id='canvas'
                        className={`${spinning ? '' : 'cursor-pointer'} focus:outline-none`}
                        width='510'
                        height='510'
                        onClick={onSpinClick}
                    />
                    <div
                        role='button'
                        tabIndex={-1}
                        className={` ${spinning ? 'cursor-default' : ''} pandito`}
                        onClick={onSpinClick}
                        onKeyPress={() => {}}
                        aria-label='icon'
                    />
                    <div
                        className={`${activeWinner ? '' : 'none'} WheelResult focus:outline-none`}
                        style={
                            activeWinner
                                ? { backgroundColor: `${winnerObject.fillStyle}D8` }
                                : { backgroundColor: 'none' }
                        }
                        onClick={hideWinner}
                        role='button'
                        onKeyPress={() => {}}
                        tabIndex={-1}
                    >
                        {winnerObject.text}
                    </div>
                </div>

                <ResultsList />
            </div>
        </div>
    );
};

export default RoulettePage;

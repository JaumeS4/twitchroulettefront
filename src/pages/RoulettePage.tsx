import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useRef } from 'react';

import { v4 as uuid } from 'uuid';
import { startValidatingRouletteToken } from '../actions/roulette';
import { RootState } from '../types/state.types';
import LoadingFullScreen from '../components/LoadingFullScreen';
import Error from '../components/RoulettePage/Error';
import { SocketContext } from '../context/SocketContext';
import { IUser } from '../interfaces/roulette';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wheel: any;

const RoulettePage = (): JSX.Element => {
    const { loadingRouletteChecking, errorRouletteChecking } = useSelector(
        (state: RootState) => state.ui,
    );

    const {
        users,
        winnerObject,
        activeWinner,
        spinning,
        defaultRouletteActive,
        colorIndex,
    } = useSelector((state: RootState) => state.roulette);

    const {
        rouletteDuration,
        rouletteLaps,
        rouletteWinnerDuration,
        song,
        imageUrl,
        songUrl,
        defaultUsers,
        colors,
        imageHeight,
        imageWidth,
        imageBackgroundSize,
        radioRoulette,
        marginTextRoulette,
    } = useSelector((state: RootState) => state.settings);

    const { twitchProfileImageUrl } = useSelector((state: RootState) => state.auth);

    const { socket } = useContext(SocketContext);
    const dispatch = useDispatch();
    const history = useHistory();

    const { token } = useParams<{ token: string }>();

    const divRef = useRef<HTMLDivElement>(null);
    let audio: HTMLAudioElement;

    if (songUrl) {
        audio = new Audio(songUrl);
        audio.muted = true;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const alertPrize = (indicatedSegment: any) => {
        const { text, fillStyle } = indicatedSegment;

        socket?.emit('set-winner', { text, fillStyle });

        socket?.emit('set-result', { winner: text, uid: uuid() });

        setTimeout(() => {
            socket?.emit('hide-winner');
        }, rouletteWinnerDuration * 1000);
    };

    // TODO: Handle this
    const createRoulette = (usersArg: any[]) => {
        let newUsersArg;
        if (!usersArg[0].name) {
            newUsersArg = usersArg.map((user) => ({ name: user, uid: uuid() }));
        } else {
            newUsersArg = usersArg;
        }

        let ind = 0;

        // TODO: Handle this too
        const segments = newUsersArg.map((user: any) => {
            const segmentObj = {
                fillStyle: colors[ind],
                text: user.name,
                textFontSize: 16,
                textFillStyle: '#000',
                strokeStyle: '#fff',
            };

            ind += 1;
            if (ind >= colors.length) ind = 0;
            return segmentObj;
        });

        // eslint-disable-next-line
        // @ts-ignore
        return new Winwheel({
            outerRadius: 250, // Set outer radius so wheel fits inside the background.
            innerRadius: radioRoulette, // Make wheel hollow so segments dont go all way to center.
            textMargin: marginTextRoulette,
            textFontSize: 24, // Set default font size for the segments.
            textOrientation: 'horizontal', // Make text vertical so goes down from the outside of wheel.
            textAlignment: 'center', // Align text to outside of wheel.
            numSegments: segments.length, // Specify number of segments.
            // Define segments including colour and text.
            segments,
            // Specify the animation to use.
            animation: {
                type: 'spinToStop',
                duration: rouletteDuration,
                spins: rouletteLaps,
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                callbackFinished: alertPrize, // Function to call whent the spinning has stopped.
            },
        });
    };

    const spinRoulette = () => {
        if (spinning) return;

        socket?.emit('spin-roulette-state');

        if (defaultRouletteActive) {
            wheel = createRoulette(defaultUsers);
        } else {
            wheel = createRoulette(users);
        }

        if (song && songUrl) {
            audio.play();
            audio.muted = false;
        }

        wheel.startAnimation();
    };

    const addUser = (user: IUser) => {
        if (spinning) return;

        // TODO: Dejar que se añadan usuarios en la pantalla donde sale el ganador

        if (defaultRouletteActive) {
            wheel = createRoulette([user]);
        } else {
            wheel.addSegment({
                text: user.name,
                fillStyle: colors[colorIndex],
                textFontSize: 16,
                textFillStyle: '#000',
                strokeStyle: '#fff',
            });

            wheel.draw();
        }
    };

    const removeUser = (uid: string) => {
        const newUsers = users.filter((user) => user.uid !== uid);

        if (users.length <= 1) {
            wheel = createRoulette(defaultUsers);
        } else {
            wheel = createRoulette(newUsers);
        }
    };

    const removeAllUsers = () => {
        wheel.segments.forEach(() => wheel.deleteSegment());
        wheel = createRoulette(defaultUsers);
        wheel.draw();
    };

    const reDrawDefault = () => {
        if (defaultRouletteActive) {
            wheel = createRoulette(defaultUsers);
            wheel.draw();
        }
    };

    const forceReDraw = () => {
        if (defaultRouletteActive) {
            wheel = createRoulette(defaultUsers);
            wheel.draw();
        } else {
            wheel = createRoulette(users);
            wheel.draw();
        }
    };

    useEffect(() => {
        dispatch(startValidatingRouletteToken(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (!loadingRouletteChecking && !errorRouletteChecking) {
            if (defaultRouletteActive) wheel = createRoulette(defaultUsers);
            if (!defaultRouletteActive) wheel = createRoulette(users);

            // TODO: Revisar una mejor forma de gestionar esto (en obs sin el setTimeout no emite el evento)
            setTimeout(() => socket?.emit('new-instance-roulette'), 500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingRouletteChecking, errorRouletteChecking]);

    useEffect(() => {
        socket?.on('new-instance-roulette', () => history.push('/new-instance', { error: true }));

        return () => socket?.off('new-instance-roulette');
    }, [socket, history]);

    useEffect(() => {
        let bgImageUrl: string;

        if (imageUrl) {
            bgImageUrl = `url('${imageUrl}')`;

            if (divRef.current && bgImageUrl) divRef.current.style.backgroundImage = bgImageUrl;
        } else if (twitchProfileImageUrl) {
            bgImageUrl = `url('${twitchProfileImageUrl}')`;
            if (divRef.current && bgImageUrl) divRef.current.style.backgroundImage = bgImageUrl;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageUrl]);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.style.width = `${imageWidth}px`;
            divRef.current.style.height = `${imageHeight}px`;
            divRef.current.style.backgroundSize = `${imageBackgroundSize}px ${imageBackgroundSize}px`;
        }
    }, [imageHeight, imageWidth, imageBackgroundSize]);

    useEffect(() => {
        if (spinning || loadingRouletteChecking || errorRouletteChecking) return;
        forceReDraw();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radioRoulette, marginTextRoulette]);

    useEffect(() => {
        socket?.on('spin-roulette', () => spinRoulette());

        socket?.on('add-user-roulette', (user: { name: string; uid: string; fromMod: boolean }) =>
            addUser(user),
        );

        socket?.on('remove-user-roulette', (userUid: string) => removeUser(userUid));
        socket?.on('remove-all-users-roulette', () => removeAllUsers());

        socket?.on('re-draw-default-roulette', () => reDrawDefault());
        socket?.on('force-re-draw-roulette', () => forceReDraw());

        return () => {
            socket?.off('add-user-roulette');
            socket?.off('spin-roulette');
            socket?.off('remove-user-roulette');
            socket?.off('remove-all-users-roulette');
            socket?.off('re-draw-default-roulette');
            socket?.off('force-re-draw-roulette');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, users, defaultUsers, colors, song, spinning, defaultRouletteActive, colorIndex]);

    return (
        <>
            {loadingRouletteChecking && <LoadingFullScreen />}
            {!loadingRouletteChecking && errorRouletteChecking ? (
                <Error />
            ) : (
                <div className='flex h-screen background-transparent items-center justify-around'>
                    <div>
                        <div className={` ${spinning ? 'ArrowDown-Spinning' : ''} ArrowDown`} />
                        <canvas id='canvas' width='510' height='510' />
                        <div ref={divRef} className='img-center' />
                        <div
                            className={` ${activeWinner ? '' : 'none'} WheelResult ml-3`}
                            style={
                                activeWinner
                                    ? { backgroundColor: `${winnerObject.fillStyle}D8` }
                                    : { backgroundColor: 'none' }
                            }
                        >
                            {winnerObject.text}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RoulettePage;

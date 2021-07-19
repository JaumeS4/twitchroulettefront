import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/state.types';
import { SocketContext } from '../../context/SocketContext';

const Modes = (): JSX.Element => {
    const { subMode, manualMode, spinning } = useSelector((state: RootState) => state.roulette);
    const { song } = useSelector((state: RootState) => state.settings);
    const { socket } = useContext(SocketContext);

    const handleChangeSubMode = ({ target: { checked } }: { target: { checked: boolean } }) => {
        if (spinning) return;
        socket?.emit('update-sub-mode', checked);
    };

    const handleChangeSong = ({ target: { checked } }: { target: { checked: boolean } }) => {
        if (spinning) return;
        socket?.emit('update-song', checked);
    };

    const handleChangeManualMode = ({ target: { checked } }: { target: { checked: boolean } }) => {
        if (spinning) return;
        socket?.emit('update-manual-mode', checked);
    };

    return (
        <div className='rounded-lg overflow-hidden shadow-lg bg-white mb-5'>
            <div className='px-7 py-4'>
                <label
                    htmlFor='toggleSong'
                    className='flex items-center justify-between cursor-pointer mb-3.5'
                >
                    <div className='mr-4 font-bold'>Canción</div>
                    <div className='relative'>
                        <input
                            id='toggleSong'
                            name='song'
                            checked={song}
                            onChange={handleChangeSong}
                            type='checkbox'
                            className='hidden'
                        />
                        <div className='toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner' />
                        <div className='toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0' />
                    </div>
                </label>

                <div className='border-b-2 border-gray-200 mb-3.5 rounded-full -mx-10' />

                <label
                    htmlFor='toggleSubMode'
                    className='flex items-center justify-between cursor-pointer mb-3.5'
                >
                    <div className='mr-4 font-bold'>Solo subs</div>
                    <div className='relative'>
                        <input
                            id='toggleSubMode'
                            name='subMode'
                            checked={subMode}
                            onChange={handleChangeSubMode}
                            type='checkbox'
                            className='hidden'
                        />
                        <div className='toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner' />
                        <div className='toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0' />
                    </div>
                </label>

                <div className='border-b-2 border-gray-200 mb-3.5 rounded-full -mx-10' />

                <label
                    htmlFor='toggleManualMode'
                    className='flex items-center justify-between cursor-pointer'
                >
                    <div className='mr-4 font-bold'>Modo manual</div>
                    <div className='relative'>
                        <input
                            id='toggleManualMode'
                            name='manualMode'
                            checked={manualMode}
                            onChange={handleChangeManualMode}
                            type='checkbox'
                            className='hidden'
                        />
                        <div className='toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner' />
                        <div className='toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0' />
                    </div>
                </label>

                {/* TODO: Añadir soporte para el follow mode, gracias twitch por no devolver si
                alguien es follow :D */}

                {/* <label
                    htmlFor='toggleFollowMode'
                    className='flex items-center justify-between cursor-pointer'
                >
                    <div className='mr-4 font-bold'>Solo follows</div>
                    <div className='relative'>
                        <input
                            id='toggleFollowMode'
                            name='followMode'
                            checked={followMode}
                            type='checkbox'
                            className='hidden'
                        />
                        <div className='toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner' />
                        <div className='toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0' />
                    </div>
                </label> */}
            </div>
        </div>
    );
};

export default Modes;

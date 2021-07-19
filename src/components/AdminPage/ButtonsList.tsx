import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../Button';
import { startLogout } from '../../actions/auth';
import { RootState } from '../../types/state.types';
import { newRouletteToken, refreshRouletteToken } from '../../actions/roulette';
import { SocketContext } from '../../context/SocketContext';

const ButtonsList = (): JSX.Element => {
    const { rouletteToken } = useSelector((state: RootState) => state.auth);
    const { spinning, loadingManualUsers, loadingWaitingUsers } = useSelector(
        (state: RootState) => state.roulette,
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const { socket } = useContext(SocketContext);

    const handleSpinRoulette = () => {
        if (spinning || loadingManualUsers || loadingWaitingUsers) return;
        socket?.emit('spin-roulette');
    };

    const handleResetRoulette = () => {
        if (spinning || loadingManualUsers || loadingWaitingUsers) return;
        socket?.emit('reset-roulette');
    };

    const handleOpenRoulette = async () => {
        if (rouletteToken.length > 0) {
            window.open(`/roulette/${rouletteToken}`, '_blank');
        } else {
            const resp = await dispatch(newRouletteToken());
            if (resp) window.open(`/roulette/${resp}`, '_blank');
        }
    };

    const handleResetLinkRoulette = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Tendrás que cambiar el link de la ruleta en tu OBS/Streamlabs.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Reiniciar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) dispatch(refreshRouletteToken());
        });
    };

    const handleOpenSettings = () => history.push('/settings');

    const handleLogout = () => dispatch(startLogout());

    return (
        <div className='rounded-lg overflow-y-auto shadow-lg bg-white'>
            <div className=' py-2 md:py-6 px-6'>
                <div className='px-2 py-2 my-1.5 text-xl space-y-3.5'>
                    <Button
                        onClick={handleSpinRoulette}
                        text='Tirar ruleta'
                        borderColor='border-green-500'
                        backgroundColor='bg-green-500'
                        bgHoverColor='hover:bg-green-600'
                    />

                    <Button
                        onClick={handleResetRoulette}
                        text='Reiniciar ruleta'
                        borderColor='border-red-600'
                        backgroundColor='bg-red-600'
                        bgHoverColor='hover:bg-red-700'
                    />

                    <div className='border-b-2 border-gray-200 mb-3.5 rounded-full mx-2' />

                    <Button
                        onClick={handleOpenRoulette}
                        text='Abrir ruleta'
                        borderColor='border-blue-600'
                        backgroundColor='bg-blue-600'
                        bgHoverColor='hover:bg-blue-700'
                    />

                    <Button
                        onClick={handleResetLinkRoulette}
                        text='Reiniciar link ruleta'
                        borderColor='border-pink-600'
                        backgroundColor='bg-pink-600'
                        bgHoverColor='hover:bg-pink-700'
                    />

                    <Button
                        onClick={handleOpenSettings}
                        text='Ajustes'
                        borderColor='border-gray-500'
                        backgroundColor='bg-gray-500'
                        bgHoverColor='hover:bg-gray-600'
                    />

                    <div>
                        <Button
                            onClick={handleLogout}
                            text='Cerrar sesión'
                            borderColor='border-red-700'
                            backgroundColor='bg-red-700'
                            bgHoverColor='hover:bg-red-800'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ButtonsList;

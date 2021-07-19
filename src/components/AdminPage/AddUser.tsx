import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { Transition } from '@headlessui/react';
import Button from '../Button';
import { SocketContext } from '../../context/SocketContext';
import { RootState } from '../../types/state.types';
import ModalAddUsers from './ModalAddUsers';
import LoadingUsers from './LoadingUsers';

type FormValues = {
    userName: string;
};

const AddUser = (): JSX.Element => {
    const { socket } = useContext(SocketContext);
    const { spinning, loadingManualUsers } = useSelector((state: RootState) => state.roulette);

    const [showModal, setShowModal] = useState(false);

    const { register, handleSubmit, watch, reset } = useForm<FormValues>();

    const userWatch = watch('userName');

    const onSubmit = ({ userName }: FormValues) => {
        if (spinning || loadingManualUsers) return;
        socket?.emit('add-user-button', { name: userName, uid: uuid(), fromMod: true });
        reset();
    };

    return (
        <>
            {/* TODO: Arreglar bug transición (botón cambia color y título resultados) */}
            <Transition
                show={showModal}
                enter='duration-200 ease-in'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='duration-300 ease-out'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
            >
                <ModalAddUsers setShowModal={setShowModal} />
            </Transition>

            <Transition
                show={loadingManualUsers}
                enter='duration-300 ease-in'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='duration-300 ease-out'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
            >
                <LoadingUsers />
            </Transition>

            <div className='rounded-lg overflow-hidden shadow-lg bg-white mb-5'>
                <div className='px-6 py-4'>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <input
                            name='userName'
                            autoComplete='off'
                            className='bg-gray-200 text-gray-700 h-10 w-full pl-5 pr-4 mb-4 rounded-lg text-sm focus:outline-none'
                            ref={register({
                                required: true,
                            })}
                        />

                        <Button
                            text='Añadir usuario'
                            borderColor='border-green-500'
                            backgroundColor='bg-green-500'
                            bgHoverColor='hover:bg-green-700'
                            type='submit'
                            disabled={!userWatch || spinning || loadingManualUsers}
                        />
                    </form>

                    <div className='border-b-2 border-gray-200 mb-3.5 mt-3.5 rounded-full -mx-10' />

                    <Button
                        text='Añadir usuarios'
                        borderColor='border-custom-orange-500'
                        backgroundColor='bg-custom-orange-500'
                        bgHoverColor='hover:bg-custom-orange-700'
                        type='submit'
                        onClick={() => setShowModal(true)}
                    />
                </div>
            </div>
        </>
    );
};

export default AddUser;

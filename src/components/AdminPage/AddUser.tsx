import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import Button from '../Button';
import { SocketContext } from '../../context/SocketContext';
import { RootState } from '../../types/state.types';

type FormValues = {
    userName: string;
};

const AddUser = (): JSX.Element => {
    const { socket } = useContext(SocketContext);
    const { spinning } = useSelector((state: RootState) => state.roulette);

    const { register, handleSubmit, watch, reset } = useForm<FormValues>();

    const userWatch = watch('userName');

    const onSubmit = ({ userName }: FormValues) => {
        if (spinning) return;
        socket?.emit('add-user-button', { name: userName, uid: uuid(), fromMod: true });
        reset();
    };

    return (
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
                        disabled={!userWatch || spinning}
                    />
                </form>
            </div>
        </div>
    );
};

export default AddUser;

import React, { useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import Button from '../Button';
import FormError from '../FormError';
import { SocketContext } from '../../context/SocketContext';

type ModalAddUsersProp = {
    setShowModal: (arg0: boolean) => void;
};

type FormValues = {
    users: string;
};

const ModalAddUsers = ({ setShowModal }: ModalAddUsersProp): JSX.Element => {
    const { socket } = useContext(SocketContext);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, watch, reset, errors, setError } = useForm<FormValues>();

    const userWatch = watch('users');

    const closeModal = () => {
        setShowModal(false);
    };

    const onSubmit = ({ users }: FormValues) => {
        const finalUsers = users
            .replace(/ /g, '')
            .split(RegExp('[\\s,:;]+'))
            .filter((user) => user.length !== 0)
            .map((user) => {
                return {
                    name: user,
                    uid: uuid(),
                    fromMod: true,
                };
            });

        if (finalUsers.length <= 0) {
            setError('users', {
                type: 'invalid-format',
                message: 'El formato introducido no es válido, revisa que sea correcto.',
            });
            reset({}, { errors: true });
            return;
        }

        if (finalUsers.length > 200) {
            setError('users', {
                type: 'too-much-users',
                message: 'Actualmente solo se pueden cargar 200 usuarios a la vez.',
            });
            reset({}, { errors: true });
            return;
        }

        socket?.emit('add-users-button', finalUsers);
        reset();
        closeModal();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current?.contains(event.target as Node)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);

        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, []);

    return (
        <div
            className='fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center'
            style={{ background: 'rgba(0,0,0,.7' }}
        >
            <div className='border border-gray-500 shadow-lg modal-container bg-white w-3/4 sm:w-3/5 md:w-2/4 lg:max-w-xl xl:w-4/12 mx-auto rounded-xl shadow-lg overflow-y-auto'>
                <div className='py-4 text-left px-6' ref={wrapperRef}>
                    <div className='flex justify-between items-center'>
                        <div />
                        <p className='text-2xl font-bold text-center'>Añadir usuarios</p>
                        <div
                            aria-hidden='true'
                            className='modal-close cursor-pointer z-50 -ml-5'
                            onClick={closeModal}
                        >
                            <svg
                                className='fill-current text-gray-500 hover:text-red-500 transition duration-500 ease'
                                xmlns='http://www.w3.org/2000/svg'
                                width='18'
                                height='18'
                                viewBox='0 0 18 18'
                            >
                                <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z' />
                            </svg>
                        </div>
                    </div>

                    <div className='my-5 mr-5 ml-5 flex justify-center'>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='w-full'
                            autoComplete='off'
                        >
                            <textarea
                                name='users'
                                autoComplete='off'
                                ref={register({ required: true })}
                                rows={6}
                                className='px-3 py-3 mb-5 leading-relaxed w-full block appearance-none border-2 border-gray-100 bg-gray-100 rounded focus:outline-none focus:bg-white focus:border-gray-200 transition duration-500 ease'
                            />

                            {errors.users && errors.users.type === 'required' && (
                                <FormError msg='Añade usuarios.' />
                            )}

                            {errors.users && errors.users.type === 'invalid-format' && (
                                <FormError msg='El formato introducido no es válido, revisa que sea correcto.' />
                            )}

                            {errors.users && errors.users.type === 'too-much-users' && (
                                <FormError msg='Actualmente solo se pueden cargar 200 usuarios a la vez, reduce la lista.' />
                            )}

                            <Button
                                text='Añadir'
                                bgHoverColor='hover:bg-custom-orange-700'
                                borderColor='border-custom-orange-500'
                                backgroundColor='bg-custom-orange-500'
                                type='submit'
                                disabled={!userWatch}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAddUsers;

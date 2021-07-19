import React, { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { object, array, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import CardTitle from './CardTitle';
import Button from '../Button';
import Input from './Input';
import FormError from '../FormError';
import { updateDefaultUsers } from '../../actions/settings';
import { RootState } from '../../types/state.types';
import { SocketContext } from '../../context/SocketContext';

type FormValues = {
    users: [{ uid: string; name: string }];
};

const schema = object().shape({
    users: array()
        .of(
            object().shape({
                value: string().required('El usuario no puede estar vacio.'),
            }),
        )
        .required('Mínimo un usuario es obligatorio.'),
});

const DefaultUsersListForm = (): JSX.Element => {
    const { defaultUsers } = useSelector((state: RootState) => state.settings);
    const { spinning } = useSelector((state: RootState) => state.roulette);
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);

    const { register, handleSubmit, control, errors, watch } = useForm<FormValues>({
        defaultValues: {
            users: defaultUsers.map((user) => ({ uid: uuid(), name: user })),
        },
        resolver: yupResolver(schema),
    });

    const usersWatch = watch('users');

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'users',
    });

    const newInput = () => append({ uid: uuid(), name: '' });

    const onSubmit = async ({ users }: { users: [{ value: string }] }) => {
        const usersArr = users.map((user) => user.value);
        const resp = await dispatch(updateDefaultUsers(usersArr));
        if (!resp) return;
        socket?.emit('update-default-users', usersArr);
    };

    return (
        <div className='rounded-lg overflow-hidden shadow-lg bg-white  px-4 py-4'>
            <CardTitle title='Usuarios por defecto' />

            <div className='flex justify-center px-20 pb-4'>
                <Button
                    onClick={newInput}
                    bgHoverColor='hover:bg-green-700'
                    borderColor='border-green-600'
                    backgroundColor='bg-green-600'
                    text='Añadir usuario'
                />
            </div>

            <div className='border-b-2 border-gray-200 mb-3.5 rounded-full mx-6' />

            <form onSubmit={handleSubmit(onSubmit)} autoComplete='false'>
                <ul>
                    {fields.map((user, index) => (
                        <li key={user.uid}>
                            <Input
                                key={user.uid}
                                name={`users[${index}].value`}
                                register={register}
                                defaultValue={user.name}
                                index={index}
                                remove={remove}
                                error={errors.users && errors.users[index]}
                            />
                        </li>
                    ))}
                </ul>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(errors.users as any)?.message && (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <FormError msg={(errors.users as any).message} />
                )}
                <Button
                    bgHoverColor='hover:bg-green-600'
                    borderColor='border-green-500'
                    backgroundColor='bg-green-500'
                    text='Guardar cambios'
                    type='submit'
                    disabled={
                        // TODO: Manejar esto mejor, revisar el tipo de datos que tiene el form, ya que no corresponde luego con los valores del array
                        watch('users').length <= 0 ||
                        ((usersWatch as unknown) as [{ value: string }])[usersWatch.length - 1]
                            .value === '' ||
                        spinning
                    }
                />
            </form>
        </div>
    );
};

export default DefaultUsersListForm;

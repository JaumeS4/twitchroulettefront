import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { array, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CardTitle from './CardTitle';
import Button from '../Button';
import Input from './Input';
import FormError from './FormError';
import { updateColors } from '../../actions/settings';
import { RootState } from '../../types/state.types';
import { SocketContext } from '../../context/SocketContext';

type FormValues = {
    colors: [{ uid: string; color: string }];
};

const schema = object().shape({
    colors: array()
        .of(
            object().shape({
                value: string().matches(
                    /^#[0-9a-f]{6}$/i,
                    'Formato hexadecimal inválido. Ej: #A1B1C1',
                ),
            }),
        )
        .required('Mínimo un color es obligatorio.'),
});

const ColorsForm = (): JSX.Element => {
    const { colors } = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);

    const { register, handleSubmit, control, errors, watch } = useForm<FormValues>({
        defaultValues: {
            colors: colors.map((color) => ({ uid: uuid(), color })),
        },
        resolver: yupResolver(schema),
    });

    const colorsWatch = watch('colors');

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'colors',
    });

    const newInput = () => append({ uid: uuid(), color: '' });

    const onSubmit = ({ colors: colorsForm }: { colors: [{ value: string }] }) => {
        const colorsArr = colorsForm.map((color) => color.value);
        const resp = dispatch(updateColors(colorsArr));
        if (!resp) return;
        socket?.emit('update-colors', colorsArr);
    };

    return (
        <div className='rounded-lg overflow-hidden shadow-lg bg-white px-4 py-4'>
            <CardTitle title='Colores' />

            <div className='flex justify-center px-20 pb-4'>
                <Button
                    onClick={newInput}
                    bgHoverColor='hover:bg-green-700'
                    borderColor='border-green-600'
                    backgroundColor='bg-green-600'
                    text='Añadir color'
                />
            </div>

            <div className='border-b-2 border-gray-200 mb-3.5 rounded-full mx-6' />

            <form onSubmit={handleSubmit(onSubmit)} autoComplete='false'>
                <ul>
                    {fields.map((color, index) => (
                        <li key={color.uid}>
                            <Input
                                key={color.uid}
                                name={`colors[${index}].value`}
                                register={register}
                                defaultValue={color.color}
                                index={index}
                                remove={remove}
                                error={errors.colors && errors.colors[index]}
                            />
                        </li>
                    ))}
                </ul>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(errors.colors as any)?.message && (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <FormError msg={(errors.colors as any).message} />
                )}
                <Button
                    bgHoverColor='hover:bg-green-600'
                    borderColor='border-green-500'
                    backgroundColor='bg-green-500'
                    text='Guardar cambios'
                    type='submit'
                    disabled={
                        // TODO: Manejar esto mejor, revisar el tipo de datos que tiene el form, ya que no corresponde luego con los valores del array
                        watch('colors').length <= 0 ||
                        ((colorsWatch as unknown) as [{ value: string }])[colorsWatch.length - 1]
                            .value === ''
                    }
                />
            </form>
        </div>
    );
};

export default ColorsForm;

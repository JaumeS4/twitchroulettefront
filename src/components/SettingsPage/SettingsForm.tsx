import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CardTitle from './CardTitle';
import Button from '../Button';
import { ISettingsBasic } from '../../interfaces/settings';
import { updateBasicSettings } from '../../actions/settings';
import FormError from './FormError';
import { RootState } from '../../types/state.types';
import { SocketContext } from '../../context/SocketContext';

const SettingsForm = (): JSX.Element => {
    const { rouletteDuration, rouletteLaps, rouletteWinnerDuration } = useSelector(
        (state: RootState) => state.settings,
    );

    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);

    const { register, handleSubmit, errors } = useForm<ISettingsBasic>({
        defaultValues: {
            rouletteDuration,
            rouletteLaps,
            rouletteWinnerDuration,
        },
    });

    const onSubmit = async (values: ISettingsBasic) => {
        const resp = await dispatch(updateBasicSettings(values));
        if (!resp) return;
        socket?.emit('update-basic-settings', values);
    };

    return (
        <div className='rounded-lg overflow-hidden shadow-lg bg-white max-h-96 px-4 py-4 mb-5'>
            <CardTitle title='Ajustes' />
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='false'>
                <div className='flex justify-center align-middle mb-4'>
                    <p className='leading-9 font-semibold text-lg '>Duración ruleta:</p>
                    <input
                        name='rouletteDuration'
                        autoComplete='off'
                        className={`
                            ml-4 bg-gray-200 text-gray-700 h-10 w-10 rounded-lg focus:outline-none text-center
                            ${errors.rouletteDuration && 'border-2 border-red-500'}
                        `}
                        ref={register({
                            required: true,
                            min: 0,
                            max: 30,
                            valueAsNumber: true,
                            pattern: new RegExp('^\\d+$'),
                        })}
                    />
                </div>

                {errors.rouletteDuration && errors.rouletteDuration.type === 'required' && (
                    <FormError msg='Este valor es obligatorio.' />
                )}
                {errors.rouletteDuration && errors.rouletteDuration.type === 'min' && (
                    <FormError msg='El valor mínimo es 0.' />
                )}
                {errors.rouletteDuration && errors.rouletteDuration.type === 'max' && (
                    <FormError msg='El valor máximo es 30.' />
                )}
                {errors.rouletteDuration && errors.rouletteDuration.type === 'pattern' && (
                    <FormError msg='El valor tiene que ser un número.' />
                )}

                <div className='flex justify-center align-middle mb-4'>
                    <p className='leading-9 font-semibold text-lg '>Vueltas ruleta:</p>
                    <input
                        name='rouletteLaps'
                        autoComplete='off'
                        className={`
                            ml-4 bg-gray-200 text-gray-700 h-10 w-10 rounded-lg focus:outline-none text-center
                            ${errors.rouletteLaps && 'border-2 border-red-500'}
                        `}
                        ref={register({
                            required: true,
                            min: 0,
                            max: 15,
                            valueAsNumber: true,
                            pattern: new RegExp('^\\d+$'),
                        })}
                    />
                </div>

                {errors.rouletteLaps && errors.rouletteLaps.type === 'required' && (
                    <FormError msg='Este valor es obligatorio.' />
                )}
                {errors.rouletteLaps && errors.rouletteLaps.type === 'min' && (
                    <FormError msg='El valor mínimo es 0.' />
                )}
                {errors.rouletteLaps && errors.rouletteLaps.type === 'max' && (
                    <FormError msg='El valor máximo es 30.' />
                )}
                {errors.rouletteLaps && errors.rouletteLaps.type === 'pattern' && (
                    <FormError msg='El valor tiene que ser un número.' />
                )}

                <div className='flex justify-center align-middle mb-4'>
                    <p className='leading-9 font-semibold text-lg '>Duración ganador (s):</p>
                    <input
                        name='rouletteWinnerDuration'
                        autoComplete='off'
                        className={`
                            ml-4 bg-gray-200 text-gray-700 h-10 w-10 rounded-lg focus:outline-none text-center
                            ${errors.rouletteWinnerDuration && 'border-2 border-red-500'}
                        `}
                        ref={register({
                            required: true,
                            min: 1,
                            max: 60,
                            valueAsNumber: true,
                            pattern: new RegExp('^\\d+$'),
                        })}
                    />
                </div>

                {errors.rouletteWinnerDuration &&
                    errors.rouletteWinnerDuration.type === 'required' && (
                        <FormError msg='Este valor es obligatorio.' />
                    )}
                {errors.rouletteWinnerDuration && errors.rouletteWinnerDuration.type === 'min' && (
                    <FormError msg='El valor mínimo es 0.' />
                )}
                {errors.rouletteWinnerDuration && errors.rouletteWinnerDuration.type === 'max' && (
                    <FormError msg='El valor máximo es 30.' />
                )}
                {errors.rouletteWinnerDuration &&
                    errors.rouletteWinnerDuration.type === 'pattern' && (
                        <FormError msg='El valor tiene que ser un número.' />
                    )}

                <div className='mt-5' />

                <Button
                    text='Guardar'
                    borderColor='border-green-500'
                    backgroundColor='bg-green-500'
                    bgHoverColor='hover:bg-green-600'
                    type='submit'
                />
            </form>
        </div>
    );
};

export default SettingsForm;

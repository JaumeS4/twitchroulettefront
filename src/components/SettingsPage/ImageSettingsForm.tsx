import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import CardTitle from './CardTitle';
import Button from '../Button';
import { ISettingsImage } from '../../interfaces/settings';
import { RootState } from '../../types/state.types';
import { SocketContext } from '../../context/SocketContext';
import FormError from './FormError';
import { updateImageSettings } from '../../actions/settings';

const ImageSettingsForm = (): JSX.Element => {
    const { imageHeight, imageWidth, imageBackgroundSize } = useSelector(
        (state: RootState) => state.settings,
    );
    const { spinning } = useSelector((state: RootState) => state.roulette);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { socket } = useContext(SocketContext);

    const { register, handleSubmit, errors } = useForm<ISettingsImage>({
        defaultValues: {
            imageHeight,
            imageWidth,
            imageBackgroundSize,
        },
    });

    const onSubmit = async (values: ISettingsImage) => {
        const resp = await dispatch(updateImageSettings(values));
        if (!resp) return;
        socket?.emit('update-image-settings', values);
    };

    return (
        <div className='rounded-lg overflow-hidden shadow-lg bg-white max-h-96 px-4 py-4 mb-5'>
            <CardTitle title='Ajustes imagen' />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-center align-middle mb-4'>
                    <p className='leading-9 font-semibold text-lg '>Altura imagen (px):</p>
                    <input
                        name='imageHeight'
                        autoComplete='off'
                        className={`
                            ml-4 bg-gray-200 text-gray-700 h-10 w-10 rounded-lg focus:outline-none text-center
                            ${errors.imageHeight && 'border-2 border-red-500'}
                        `}
                        ref={register({
                            required: true,
                            min: 10,
                            max: 300,
                            valueAsNumber: true,
                            pattern: new RegExp('^\\d+$'),
                        })}
                    />
                </div>

                {errors.imageHeight && errors.imageHeight.type === 'required' && (
                    <FormError msg='Este valor es obligatorio.' />
                )}
                {errors.imageHeight && errors.imageHeight.type === 'min' && (
                    <FormError msg='El valor mínimo es 10.' />
                )}
                {errors.imageHeight && errors.imageHeight.type === 'max' && (
                    <FormError msg='El valor máximo es 300.' />
                )}
                {errors.imageHeight && errors.imageHeight.type === 'pattern' && (
                    <FormError msg='El valor tiene que ser un número.' />
                )}

                <div className='flex justify-center align-middle mb-4'>
                    <p className='leading-9 font-semibold text-lg '>Ancho imagen (px):</p>
                    <input
                        name='imageWidth'
                        autoComplete='off'
                        className={`
                            ml-4 bg-gray-200 text-gray-700 h-10 w-10 rounded-lg focus:outline-none text-center
                            ${errors.imageWidth && 'border-2 border-red-500'}
                        `}
                        ref={register({
                            required: true,
                            min: 10,
                            max: 300,
                            valueAsNumber: true,
                            pattern: new RegExp('^\\d+$'),
                        })}
                    />
                </div>

                {errors.imageWidth && errors.imageWidth.type === 'required' && (
                    <FormError msg='Este valor es obligatorio.' />
                )}
                {errors.imageWidth && errors.imageWidth.type === 'min' && (
                    <FormError msg='El valor mínimo es 10.' />
                )}
                {errors.imageWidth && errors.imageWidth.type === 'max' && (
                    <FormError msg='El valor máximo es 300.' />
                )}
                {errors.imageWidth && errors.imageWidth.type === 'pattern' && (
                    <FormError msg='El valor tiene que ser un número.' />
                )}

                <div className='flex justify-center align-middle mb-4'>
                    <p className='leading-9 font-semibold text-lg '>Tamaño imagen fondo (px):</p>
                    <input
                        name='imageBackgroundSize'
                        autoComplete='off'
                        className={`
                            ml-4 bg-gray-200 text-gray-700 h-10 w-10 rounded-lg focus:outline-none text-center
                            ${errors.imageBackgroundSize && 'border-2 border-red-500'}
                        `}
                        ref={register({
                            required: true,
                            min: 10,
                            max: 300,
                            valueAsNumber: true,
                            pattern: new RegExp('^\\d+$'),
                        })}
                    />
                </div>

                {errors.imageBackgroundSize && errors.imageBackgroundSize.type === 'required' && (
                    <FormError msg='Este valor es obligatorio.' />
                )}
                {errors.imageBackgroundSize && errors.imageBackgroundSize.type === 'min' && (
                    <FormError msg='El valor mínimo es 10.' />
                )}
                {errors.imageBackgroundSize && errors.imageBackgroundSize.type === 'max' && (
                    <FormError msg='El valor máximo es 300.' />
                )}
                {errors.imageBackgroundSize && errors.imageBackgroundSize.type === 'pattern' && (
                    <FormError msg='El valor tiene que ser un número.' />
                )}

                <div className='mt-5' />

                <Button
                    text='Guardar'
                    borderColor='border-green-500'
                    backgroundColor='bg-green-500'
                    bgHoverColor='hover:bg-green-600'
                    type='submit'
                    disabled={spinning}
                />
            </form>
        </div>
    );
};

export default ImageSettingsForm;

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CardTitle from './CardTitle';
import Button from '../Button';
import { deleteImage, uploadFile } from '../../actions/settings';
import FormError from './FormError';
import { RootState } from '../../types/state.types';
import { SocketContext } from '../../context/SocketContext';

const schema = yup.object().shape({
    image: yup
        .mixed()
        .test('fileSize', 'El archivo es demasiado grande, máximo 1MB', (value) => {
            return value && value[0].size < 1024 * 1024;
        })
        .test(
            'fileType',
            'Solo están permitidos los archivos de tipo: jpg, jpeg, png o gif',
            (value) => {
                return (
                    (value && value[0].type === 'image/jpg') ||
                    (value && value[0].type === 'image/jpeg') ||
                    (value && value[0].type === 'image/png') ||
                    (value && value[0].type === 'image/gif')
                );
            },
        ),
});

const ImageForm = (): JSX.Element => {
    const { register, watch, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const { imageUrl } = useSelector((state: RootState) => state.settings);

    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);

    const image = watch('image');

    const onSubmit = async (data: { image: FileList }) => {
        const resp = await dispatch(uploadFile(data.image[0], 'image'));
        if (resp) socket?.emit('update-image-url', resp);

        reset();
    };

    const removeImage = async () => {
        const resp = await dispatch(deleteImage());
        if (!resp) return;
        socket?.emit('update-image-url', null);
    };
    // TODO: Hacer un loading/algo visual mientras se sube la imagen
    return (
        <div className='rounded-lg overflow-hidden shadow-lg bg-white max-h-96 px-4 py-4 mb-5'>
            <CardTitle title='Cambiar imagen centro ruleta' />

            <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
                <div className={`flex justify-center ${image?.length > 0 ? 'mb-2' : 'mb-5'}`}>
                    <label
                        htmlFor='imageInput'
                        className='w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white'
                    >
                        <svg
                            className='w-8 h-8'
                            fill='currentColor'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                        >
                            <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
                        </svg>
                        <span className='mt-2 text-base leading-normal'>Seleccionar imagen</span>
                        <input
                            ref={register({ required: true })}
                            id='imageInput'
                            name='image'
                            type='file'
                            accept='image/png, image/jpeg, image/png, image/gif'
                            multiple={false}
                            className='hidden'
                        />
                    </label>
                </div>
                {image?.length > 0 && (
                    <>
                        <div className='text-center font-semibold text-xl mb-1'>
                            Imagen seleccionada:
                        </div>
                        <p className='text-center mb-5'>{image[0]?.name}</p>
                    </>
                )}
                {errors.image && errors.image.type === 'fileSize' && (
                    <FormError msg={errors.image.message} />
                )}

                {errors.image && errors.image.type === 'fileType' && (
                    <FormError msg={errors.image.message} />
                )}

                <Button
                    borderColor='border-green-500'
                    backgroundColor='bg-green-500'
                    text='Subir imagen'
                    bgHoverColor='hover:bg-green-600'
                    type='submit'
                    disabled={!image || (image && image.length <= 0) || errors.image}
                />
            </form>

            {imageUrl && (
                <div className='mt-2'>
                    <Button
                        onClick={removeImage}
                        borderColor='border-red-500'
                        backgroundColor='bg-red-500'
                        bgHoverColor='hover:bg-red-600'
                        text='Eliminar imagen existente'
                    />
                </div>
            )}
        </div>
    );
};

export default ImageForm;

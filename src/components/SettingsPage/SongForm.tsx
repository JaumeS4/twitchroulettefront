import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { object, mixed } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import CardTitle from './CardTitle';
import { uploadFile } from '../../actions/settings';
import FormError from './FormError';
import Button from '../Button';
import { SocketContext } from '../../context/SocketContext';

const schema = object().shape({
    song: mixed()
        .test('fileSize', 'El archivo es demasiado grande, máximo 1MB', (value) => {
            return value && value[0].size < 1024 * 1024;
        })
        .test(
            'fileType',
            'Solo están permitidos los archivos de tipo: mpeg, ogg o wav',
            (value) => {
                return (
                    (value && value[0].type === 'audio/mpeg') ||
                    (value && value[0].type === 'audio/ogg') ||
                    (value && value[0].type === 'audio/wav')
                );
            },
        ),
});

const SongForm = (): JSX.Element => {
    const { register, watch, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);

    const song = watch('song');

    const onSubmit = async (data: { song: FileList }) => {
        const resp = await dispatch(uploadFile(data.song[0], 'song'));
        if (resp) socket?.emit('update-song-url', resp);
        reset();
    };
    // TODO: Hacer un loading/algo visual mientras se sube la canción
    return (
        <div className='rounded-lg overflow-hidden shadow-lg bg-white max-h-96 px-4 py-4 mb-5'>
            <CardTitle title='Cambiar canción' />

            <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
                <div className={`flex justify-center ${song?.length > 0 ? 'mb-2' : 'mb-5'}`}>
                    <label
                        htmlFor='songInput'
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
                        <span className='mt-2 text-base leading-normal'>Seleccionar canción</span>
                        <input
                            ref={register({ required: true })}
                            id='songInput'
                            name='song'
                            type='file'
                            accept='audio/mpeg, audio/ogg, audio/wav'
                            multiple={false}
                            className='hidden'
                        />
                    </label>
                </div>
                {song?.length > 0 && (
                    <>
                        <div className='text-center font-semibold text-xl mb-1'>
                            Canción seleccionada:
                        </div>
                        <p className='text-center mb-5'>{song[0]?.name}</p>
                    </>
                )}
                {errors.song && errors.song.type === 'fileSize' && (
                    <FormError msg={errors.song.message} />
                )}

                {errors.song && errors.song.type === 'fileType' && (
                    <FormError msg={errors.song.message} />
                )}

                <Button
                    borderColor='border-green-500'
                    backgroundColor='bg-green-500'
                    text='Subir canción'
                    bgHoverColor='hover:bg-green-600'
                    type='submit'
                    disabled={!song || (song && song.length <= 0) || errors.song}
                />
            </form>
        </div>
    );
};

export default SongForm;

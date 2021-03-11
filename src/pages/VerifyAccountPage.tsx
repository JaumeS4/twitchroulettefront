import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { RootState } from '../types/state.types';
import Button from '../components/Button';
import { verifyAccount } from '../actions/auth';

const VerifyAccountPage = (): JSX.Element => {
    const { verified } = useSelector((state: RootState) => state.auth);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dispatch = useDispatch();
    const [key, setKey] = useState('');

    if (verified) return <Redirect to='/' />;

    const handleSubmit = () => {
        if (key.trim().length <= 0) return;
        dispatch(verifyAccount(key));
    };

    return (
        <div className='flex align-middle justify-center min-h-screen bg-gray-800'>
            <div className='flex flex-col justify-center align-middle min-w-full'>
                <>
                    <h2 className='mb-5 text-3xl font-bold text-center text-white'>
                        Escribe la key:
                    </h2>
                    <input
                        type='text'
                        className='bg-white w-10/12 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-3/12 2xl:w-1/5 mx-auto h-10 px-5 rounded-md text-sm focus:outline-none'
                        name='key'
                        autoComplete='off'
                        onChange={(event) => setKey(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') handleSubmit();
                        }}
                    />
                    <div className='w-10/12 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-3/12 2xl:w-1/5 mx-auto mt-2'>
                        <Button
                            onClick={handleSubmit}
                            bgHoverColor='hover:bg-green-700'
                            borderColor='border-green-600'
                            backgroundColor='bg-green-600'
                            text='Activar'
                            disabled={key.trim().length <= 0}
                        />
                    </div>
                </>
            </div>
        </div>
    );
};

export default VerifyAccountPage;

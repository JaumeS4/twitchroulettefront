import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingUsers = (): JSX.Element => {
    return (
        <div
            className='fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center'
            style={{ background: 'rgba(0,0,0,.7' }}
        >
            <div className='border border-gray-500 shadow-lg modal-container bg-white w-3/4 sm:w-3/5 md:w-2/4 lg:max-w-xl xl:w-4/12 rounded-xl shadow-lg overflow-y-auto'>
                <div className='py-4 content-center'>
                    <div className='flex justify-center items-center'>
                        <FontAwesomeIcon
                            className='fa-spin fa-pulse mr-5 text-black'
                            icon={faSpinner}
                            size='5x'
                        />

                        <h3 className=' font-extrabold text-2xl text-black text-justify'>
                            Añadiendo usuarios...
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingUsers;

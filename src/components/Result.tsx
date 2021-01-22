import React from 'react';

const Result = ({ result, index }: ResultType): JSX.Element => {
    return (
        <div className='flex justify-center space-x-6 px-2 py-2'>
            <p className='text-xl text-gray-700 '>
                <span>{`${index}. ${result}`}</span>
            </p>
        </div>
    );
};

export default Result;

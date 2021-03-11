import React from 'react';

type ResultProps = {
    winner: string;
    index: number;
};

const Result = ({ winner, index }: ResultProps): JSX.Element => {
    return (
        <div className='flex justify-center space-x-6 px-2 py-2'>
            <p className='text-xl text-gray-700 '>
                <span>{`${index + 1}. ${winner}`}</span>
            </p>
        </div>
    );
};

export default Result;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Result from './Result';
import { RootState } from '../../types/state.types';
import { clearResultsAction } from '../../actions/roulette';

const ResultsList = (): JSX.Element => {
    const { results } = useSelector((state: RootState) => state.roulette);
    const dispatch = useDispatch();

    const handleDelete = () => dispatch(clearResultsAction());

    return (
        <div className='rounded-lg overflow-hidden shadow-lg bg-white max-h-96 '>
            <div className='relative'>
                <p className='text-gray-600 text-xl text-center font-bold pt-3 block'>Resultados</p>
                <FontAwesomeIcon
                    className='mt-3 text-red-700 absolute top-0.5 right-3 cursor-pointer hover:text-red-800 transition ease-in-out duration-300'
                    icon={faTrash}
                    size='lg'
                    onClick={handleDelete}
                />
            </div>
            <div className='border-b-2 border-gray-200 my-2 rounded-full mx-20' />
            <div className='py-2 px-6 max-h-80 h-80 overflow-y-auto'>
                {results.map((result, i) => (
                    <Result key={result.uid} winner={result.winner} index={i} />
                ))}
            </div>
        </div>
    );
};

export default ResultsList;

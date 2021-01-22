import React, { useContext } from 'react';
import Result from './Result';
import { RouletteContext } from '../context/roulette/RouletteContext';

const ResultsList = (): JSX.Element => {
    const {
        rouletteState: { results },
    } = useContext(RouletteContext);

    return (
        <div className='lg:w-1/6 sm:w-1/2 md:w-1/3'>
            {results.length > 0 ? (
                <div className='rounded-lg overflow-hidden shadow-lg bg-gray min-h-64'>
                    <p className='text-gray-600 mb-2 text-xl font-bold px-4 pt-3 text-center'>
                        Resultados
                    </p>
                    <div className='py-5 px-6 max-h-96 overflow-auto overflow-x-hidden'>
                        {results.map((result) => (
                            <Result
                                result={result.result}
                                index={result.index}
                                key={result.index}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ResultsList;

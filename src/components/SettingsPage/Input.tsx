import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DeepMap, FieldError } from 'react-hook-form';
import FormError from './FormError';

type InputProps = {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    remove: (index?: number | number[] | undefined) => void;
    defaultValue: string;
    index: number;
    error: DeepMap<Record<string, string>, FieldError> | undefined;
};

const Input = ({ name, register, defaultValue, remove, index, error }: InputProps): JSX.Element => {
    return (
        <div>
            <div className='flex justify-center py-2 px-4'>
                <div className='space-x-4'>
                    <input
                        name={name}
                        className='bg-gray-200 text-gray-700 h-10 pl-5 pr-4 mb-4 rounded-lg text-sm focus:outline-none'
                        defaultValue={defaultValue}
                        ref={register()}
                        autoComplete='off'
                    />
                    <FontAwesomeIcon
                        onClick={() => remove(index)}
                        className='
                            text-red-700 cursor-pointer
                            hover:text-red-900
                            transition duration-500 ease
                        '
                        size='lg'
                        icon={faTimes}
                    />
                </div>
            </div>
            {error && <FormError msg={error.value?.message || ''} />}
        </div>
    );
};

export default Input;

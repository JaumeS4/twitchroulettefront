import React from 'react';
import Button from '../Button';

type AddInputProps = {
    text: string;
};

const AddInput = ({ text }: AddInputProps): JSX.Element => {
    return (
        <div className='flex justify-center py-2 px-4'>
            <div>
                <Button
                    bgHoverColor='hover:bg-green-600'
                    borderColor='border-green-500'
                    backgroundColor='bg-green-500'
                    text={text}
                />
            </div>
        </div>
    );
};

export default AddInput;

import React from 'react';

type FormErrorProps = {
    msg: string;
};

const FormError = ({ msg }: FormErrorProps): JSX.Element => {
    return <div className='text-red-500 font-bold text-center -mt-3 mb-3'>{msg}</div>;
};

export default FormError;

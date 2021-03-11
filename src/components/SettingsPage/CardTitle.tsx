import React from 'react';

type CardTitleProps = {
    title: string;
};

const CardTitle = ({ title }: CardTitleProps): JSX.Element => {
    return <p className='text-gray-600 mb-5 text-xl font-bold text-center'>{title}</p>;
};

export default CardTitle;

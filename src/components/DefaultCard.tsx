import React from 'react';

const DefaultCard = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
    return (
        <div className='sm:w-2/3 md:w-1/2 lg:2/3 xl:w-1/4 2xl:w-1/5 mx-auto xl:mx-0 mb-5'>
            {children}
        </div>
    );
};

export default DefaultCard;

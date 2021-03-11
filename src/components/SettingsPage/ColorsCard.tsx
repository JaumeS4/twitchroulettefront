import React from 'react';
import DefaultCard from '../DefaultCard';
import ColorsForm from './ColorsForm';

const ColorsCard = (): JSX.Element => {
    return (
        <DefaultCard>
            <ColorsForm />
        </DefaultCard>
    );
};

export default ColorsCard;

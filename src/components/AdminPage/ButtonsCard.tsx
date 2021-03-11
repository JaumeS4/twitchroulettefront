import React from 'react';
import DefaultCard from '../DefaultCard';
import ButtonsList from './ButtonsList';

const ButtonsCard = (): JSX.Element => {
    return (
        <DefaultCard>
            <ButtonsList />
        </DefaultCard>
    );
};

export default ButtonsCard;

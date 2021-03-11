import React from 'react';
import ResultsList from './ResultsList';
import DefaultCard from '../DefaultCard';

const ResultsCard = (): JSX.Element => {
    return (
        <DefaultCard>
            <ResultsList />
        </DefaultCard>
    );
};

export default ResultsCard;

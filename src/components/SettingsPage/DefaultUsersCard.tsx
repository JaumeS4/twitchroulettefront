import React from 'react';

import DefaultCard from '../DefaultCard';
import DefaultUsersListForm from './DefaultUsersListForm';

const DefaultUsersCard = (): JSX.Element => {
    return (
        <DefaultCard>
            <DefaultUsersListForm />
        </DefaultCard>
    );
};

export default DefaultUsersCard;

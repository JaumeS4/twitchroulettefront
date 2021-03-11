import React from 'react';
import Modes from './Modes';
import AddUser from './AddUser';
import UsersList from './UsersList';
import DefaultCard from '../DefaultCard';

const UsersCard = (): JSX.Element => {
    return (
        <DefaultCard>
            <Modes />
            <AddUser />
            <UsersList />
        </DefaultCard>
    );
};

export default UsersCard;

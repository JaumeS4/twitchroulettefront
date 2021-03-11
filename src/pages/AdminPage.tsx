import React from 'react';

import ButtonsCard from '../components/AdminPage/ButtonsCard';
import UsersCard from '../components/AdminPage/UsersCard';
import ResultsCard from '../components/AdminPage/ResultsCard';

const AdminPage = (): JSX.Element => {
    return (
        <div className='min-h-screen bg-gray-800 p-8 xl:flex xl:justify-center xl:space-x-32'>
            <ButtonsCard />

            <UsersCard />

            <ResultsCard />
        </div>
    );
};

export default AdminPage;

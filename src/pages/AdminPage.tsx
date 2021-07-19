import React from 'react';

import ButtonsCard from '../components/AdminPage/ButtonsCard';
import UsersCard from '../components/AdminPage/UsersCard';
import ResultsCard from '../components/AdminPage/ResultsCard';
import NavButtons from '../components/AdminPage/NavButtons';
import ModalNews from '../components/AdminPage/ModalNews';

const AdminPage = (): JSX.Element => {
    return (
        <div className='min-h-screen bg-gray-800'>
            <ModalNews />

            <NavButtons />
            <div className='p-8 pt-0 xl:flex xl:justify-center xl:space-x-32'>
                <ButtonsCard />

                <UsersCard />

                <ResultsCard />
            </div>
        </div>
    );
};

export default AdminPage;

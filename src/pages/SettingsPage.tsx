import { useHistory } from 'react-router-dom';
import SettingsCard from '../components/SettingsPage/SettingsCard';
import ColorsCard from '../components/SettingsPage/ColorsCard';
import DefaultUsersCard from '../components/SettingsPage/DefaultUsersCard';
import Button from '../components/Button';

const SettingsPage = (): JSX.Element => {
    const history = useHistory();

    const handleGoBack = () => history.push('/admin');

    return (
        <div className='bg-gray-800 min-h-screen'>
            <div className='pt-8 px-8 '>
                <div className='sm:w-2/3 md:w-1/2 lg:2/3 xl:w-1/4 2xl:w-1/5 mx-auto'>
                    <Button
                        text='Volver atrás'
                        borderColor='border-red-500'
                        backgroundColor='bg-red-500'
                        bgHoverColor='hover:bg-red-600'
                        onClick={handleGoBack}
                    />
                </div>
            </div>

            <div className='p-8 xl:flex xl:justify-center xl:space-x-32'>
                <SettingsCard />

                <DefaultUsersCard />

                <ColorsCard />
            </div>
        </div>
    );
};

export default SettingsPage;

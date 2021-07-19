import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const NavButtons = (): JSX.Element => {
    const history = useHistory();

    const handleNavigate = (route: string) => history.push(route);

    return (
        <div className='flex justify-center space-x-14 mb-8 pt-8'>
            <button
                type='button'
                className='text-white font-bold px-4 w-auto h-12 bg-blue-500 rounded-full hover:bg-blue-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none'
                onClick={() => handleNavigate('/help')}
            >
                <FontAwesomeIcon icon={faInfoCircle} size='lg' className='mr-1' />
                <span>Ayuda</span>
            </button>

            <button
                type='button'
                className='text-white font-bold px-4 w-auto h-12 bg-red-500 rounded-full hover:bg-red-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none'
                onClick={() => handleNavigate('/changelog')}
            >
                <FontAwesomeIcon icon={faClipboardList} size='lg' className='mr-1' />
                <span>Changelog</span>
            </button>
        </div>
    );
};

export default NavButtons;

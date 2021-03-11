import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';

type LocationState = {
    error: boolean;
};

const NewInstanceErrorPage = (): JSX.Element => {
    const history = useHistory();
    const location = useLocation<LocationState>();

    if (!location.state || !location.state.error) history.replace('/');

    return (
        <div className='flex flex-col align-middle justify-center min-h-screen bg-gray-800'>
            <FontAwesomeIcon className='mx-auto text-red-500' size='10x' icon={faTimes} />
            <h2 className='mx-auto px-40 font-bold text-5xl text-gray-300 text-justify'>
                Nueva instancia de la ruleta abierta en otra pestaña.
            </h2>
            <h3 className='mx-auto px-40 font-bold text-4xl text-gray-300 text-justify mt-5'>
                Solo puedes abrir una ruleta a la vez.
            </h3>
        </div>
    );
};

export default NewInstanceErrorPage;

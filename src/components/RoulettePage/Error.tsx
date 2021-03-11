import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Error = (): JSX.Element => {
    return (
        <div className='flex flex-col align-middle justify-center min-h-screen bg-gray-800'>
            <FontAwesomeIcon className='mx-auto text-red-500' size='10x' icon={faTimes} />
            <h2 className='mx-auto px-40 font-bold text-5xl text-gray-300 text-justify'>
                Error al cargar la ruleta.
            </h2>
            <h3 className='mx-auto px-40 font-bold text-4xl text-gray-300 text-justify mt-5'>
                Genera un nuevo link desde tu panel de administración.
            </h3>
        </div>
    );
};

export default Error;

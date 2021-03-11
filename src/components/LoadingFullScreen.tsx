import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingFullScreen = (): JSX.Element => {
    return (
        <div className='flex flex-col align-middle justify-center min-h-screen bg-gray-800 bg-gray-800'>
            <FontAwesomeIcon
                className='fa-spin fa-pulse mx-auto text-gray-200'
                icon={faSpinner}
                size='10x'
            />
        </div>
    );
};

export default LoadingFullScreen;

import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { startLogin } from '../actions/auth';
import LoadingFullScreen from '../components/LoadingFullScreen';

const LoginPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { code } = queryString.parse(location.search);

    if (code) {
        dispatch(startLogin(code as string));
    }

    return (
        <div className='flex align-middle justify-center min-h-screen bg-gray-800'>
            <div className='flex flex-col justify-center align-middle'>
                {code ? (
                    <LoadingFullScreen />
                ) : (
                    <>
                        <h2 className='mb-5 text-2xl font-bold text-center text-white'>
                            Haz login con tu cuenta de:
                        </h2>
                        <a
                            href={`https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_TWITCH_REDIRECT_URI}`}
                            className='w-full h-16 flex justify-center items-center text-xl font-bold border border-purple-500 bg-purple-500 text-white rounded-full px-4 py-2 transition duration-500 ease select-none
                            hover:bg-purple-700 focus:outline-none focus:shadow-outline'
                        >
                            TWITCH
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginPage;

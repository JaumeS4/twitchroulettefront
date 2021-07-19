import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types/state.types';
import { fetchWithToken } from '../../helpers/fetch';
import { setViewedNews } from '../../actions/auth';

// Al tener novedades, hay que actualizar manualmente el campo "viewedNews"
// de todos los usuarios en la base de datos.
// Desde la shell de mongo:
// use name_db
// db.users.updateMany({}, {$set: {"viewedNews": false}})

const ModalNews = (): JSX.Element => {
    const { viewedNews } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const closeModal = () => {
        setShowModal(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current?.contains(event.target as Node)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (!viewedNews) {
            setShowModal(true);
            fetchWithToken('user/viewed-news', {}, 'POST');
            dispatch(setViewedNews(true));
        }
    }, [viewedNews, setShowModal, dispatch]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);

        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, []);

    return showModal ? (
        <div
            className='fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center'
            style={{ background: 'rgba(0,0,0,.7' }}
        >
            <div className='border border-gray-500 shadow-lg modal-container bg-white w-3/4 sm:w-3/5 md:w-2/4 lg:max-w-xl xl:w-4/12 mx-auto rounded-xl shadow-lg overflow-y-auto'>
                <div className='py-4 text-left px-6' ref={wrapperRef}>
                    <div className='flex justify-between items-center'>
                        <div />
                        <h3 className='text-3xl font-bold text-center'>Novedades</h3>
                        <div
                            aria-hidden='true'
                            className='modal-close cursor-pointer z-50 -ml-5'
                            onClick={closeModal}
                        >
                            <svg
                                className='fill-current text-gray-500 hover:text-red-500 transition duration-500 ease'
                                xmlns='http://www.w3.org/2000/svg'
                                width='18'
                                height='18'
                                viewBox='0 0 18 18'
                            >
                                <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z' />
                            </svg>
                        </div>
                    </div>
                    <div className='my-5 text-center'>
                        <h4 className='font-semibold text-xl mb-5'>
                            Ruleta actualizada a la versión 2.2.0.
                        </h4>
                        <div className='text-lg leading-6 mb-5'>
                            <p>- Añadida carga múltiple de usuarios.</p>
                            <p>- Añadido modo manual.</p>
                            <p>- Solucionado bugs.</p>
                        </div>

                        <p className='font-semibold text-lg text-gray-900'>
                            Para más info revisa el{' '}
                            <Link to='/changelog' className='text-red-500 hover:text-red-700'>
                                changelog
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default ModalNews;

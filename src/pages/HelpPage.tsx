import { useHistory } from 'react-router-dom';

const HelpPage = (): JSX.Element => {
    const history = useHistory();

    const handleGoBack = () => history.push('/admin');

    return (
        <div className='bg-gray-800 min-h-screen'>
            <button
                className='w-full text-gray-300 py-2 bg-gray-700 focus:outline-none'
                type='button'
                onClick={handleGoBack}
            >
                <span className='font-semibold'>Volver</span>
            </button>

            <div className='py-8 px-10 lg:px-40 xl:px-48 2xl:px-80'>
                <div className='text-center'>
                    <h2 className='text-gray-200 font-bold text-2xl'>Ayuda</h2>
                    <hr className='my-5 border-gray-600' />
                </div>

                <div>
                    <h3 className='text-gray-100 text-2xl font-bold mb-3.5'>Comandos</h3>

                    <div className='bg-gray-500 rounded-md px-4 pt-2 pb-4'>
                        <p className='mb-3 font-bold text-white'>Usuarios</p>

                        <div className='overflow-x-auto'>
                            <table className='table-fixed border-collapse w-full overflow-x-scroll'>
                                <thead>
                                    <tr className='rounded-lg font-medium text-gray-700 text-left'>
                                        <th className='px-3 py-2 bg-gray-100 sm:w-1/3 md:w-1/5'>
                                            Comando
                                        </th>
                                        <th className='px-3 py-2 bg-gray-100'>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody className='text-sm font-semibold text-gray-200'>
                                    <tr className='border-b border-gray-200 py-10'>
                                        <td className='px-3 py-3'>!yo</td>
                                        <td className='px-3 py-3'>Añade el usuario a la ruleta.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className='mb-3 font-bold text-white mt-5'>Mods</p>

                        <div className='overflow-x-auto'>
                            <table className='table-fixed border-collapse w-full overflow-x-scroll'>
                                <thead>
                                    <tr className='rounded-lg font-medium text-gray-700 text-left'>
                                        <th className='px-3 py-2 bg-gray-100 w-2/5 sm:w-1/3 md:w-1/5'>
                                            Comando
                                        </th>
                                        <th className='px-3 py-2 bg-gray-100'>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody className='text-sm font-semibold text-gray-200'>
                                    <tr className='border-b border-gray-200 py-10'>
                                        <td className='px-3 py-3'>!yoa usuario</td>
                                        <td className='px-3 py-3'>
                                            Añade el usuario indicado a la ruleta.
                                        </td>
                                    </tr>
                                    <tr className='border-b border-gray-200 py-10'>
                                        <td className='px-3 py-3'>!tirar</td>
                                        <td className='px-3 py-3'>Tira de la ruleta.</td>
                                    </tr>
                                    <tr className='border-b border-gray-200 py-10'>
                                        <td className='px-3 py-3'>!reiniciar</td>
                                        <td className='px-3 py-3'>
                                            Reinicia los usuarios de la ruleta.
                                        </td>
                                    </tr>
                                    <tr className='border-b border-gray-200 py-10'>
                                        <td className='px-3 py-3'>!ruletasubs on/off</td>
                                        <td className='px-3 py-3'>
                                            Activa/desactiva el modo subs.
                                        </td>
                                    </tr>

                                    <tr className='border-b border-gray-200 py-10'>
                                        <td className='px-3 py-3'>!ruletasong on/off</td>
                                        <td className='px-3 py-3'>
                                            Activa/desactiva la canción al tirar de la ruleta.
                                        </td>
                                    </tr>
                                    <tr className='border-b border-gray-200 py-10'>
                                        <td className='px-3 py-3'>!ruletamanual on/off</td>
                                        <td className='px-3 py-3'>
                                            Activa/desactiva el modo manual de la ruleta (!yo
                                            desactivado).
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;

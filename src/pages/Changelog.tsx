import { useHistory } from 'react-router-dom';

const ChangelogPage = (): JSX.Element => {
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
            <div className='py-8 px-16 lg:px-40 xl:px-48 2xl:px-80'>
                <div className='text-center'>
                    <h2 className='text-gray-200 font-bold text-2xl'>Changelog</h2>
                    <hr className='my-5 border-gray-600' />
                </div>
                <div>
                    <h3 className='text-gray-100 text-lg mb-2'>V 2.1</h3>

                    <h4 className='text-gray-100 text-lg mb-2'>Features</h4>
                    <ul className='text-gray-300 mb-10 leading-6'>
                        <li className='mb-6'>
                            <p className='text-blue-300'>
                                Añadida funcionalidad para carga múltiple de usuarios.
                            </p>
                            <p className='text-white'>
                                Actualmente se pueden cargar un máximo de 200 usuarios a la vez.
                            </p>
                            <p className='text-yellow-600 mb-1'>
                                Mientras se estén cargando los usuarios no se podrá tirar de la
                                ruleta.
                            </p>
                            <p>
                                <span className='text-red-300'>Formatos admitidos:</span> coma (,),
                                punto y coma (;), dos puntos(:) y enter. Se pueden combinar ambos.
                            </p>
                            <p>
                                <span className='text-green-300'>Ejemplo:</span> lucas, luis; angel:
                                antonio , jose
                            </p>
                        </li>

                        <li className='mb-6'>
                            <p className='text-blue-300'>Añadido modo manual.</p>
                            <p className='text-white mb-1'>
                                Solo se pueden añadir usuarios a la ruleta desde el panel de admin o
                                desde el chat con el comando !yoa (mods).
                            </p>
                            <p>
                                <span className='text-purple-300'>Comando:</span> !ruletamanual
                                on/off
                            </p>
                        </li>

                        <li className='mb-6'>
                            <p className='text-blue-300'>
                                Comando !yo cuando la ruleta está girando
                            </p>
                            <p className='text-white'>
                                Cuando el usuario ponga !yo (o !yoa) mientras la ruleta está en
                                funcionamiento, se guardará y al terminar la ruleta los añadirá
                                (respetando el modo de la ruleta y revisando si ya está dentro).
                            </p>
                            <p className='text-yellow-600'>
                                Mientras se estén cargando los usuarios no se podrá tirar de la
                                ruleta.
                            </p>
                        </li>

                        <li className='mb-6'>
                            <p className='text-blue-300'>
                                Añadida página de changelog con los cambios en cada versión.
                            </p>
                        </li>
                        <li className='mb-6'>
                            <p className='text-blue-300'>
                                Añadida página de ayuda con los comandos disponibles actualmente.
                            </p>
                        </li>

                        <li className='mb-6'>
                            <p className='text-blue-300'>
                                Añadido popup que aparece cuando hay novedades.
                            </p>
                        </li>
                    </ul>

                    <h4 className='text-gray-100 text-lg mb-2'>Bugs corregidos</h4>
                    <ul className='text-gray-300 leading-4'>
                        <li className='mb-6'>
                            No acepta ninguna variante aunque empiece por !yo (!yoabcd !yo abcd).
                        </li>
                        <li>
                            Al eliminar los usuarios uno a uno de forma manual (vuelven usuarios por
                            defecto) y añadir uno nuevo no se eliminan los usuarios por defecto.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChangelogPage;

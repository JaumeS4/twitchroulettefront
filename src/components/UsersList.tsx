import React, { useContext } from 'react';

import User from './User';
import { RouletteContext } from '../context/roulette/RouletteContext';

type UsersListProps = {
    removeUser: (name: string, uid: string) => void;
    removeAllUsers: () => void;
};

const UsersList = ({ removeUser, removeAllUsers }: UsersListProps): JSX.Element => {
    const onClickDeleteAll = () => {
        removeAllUsers();
    };

    const {
        rouletteState: { users, spinning },
    } = useContext(RouletteContext);

    return (
        <div className='lg:w-1/6 sm:w-1/2 md:w-1/3'>
            <div className='rounded-lg overflow-hidden shadow-lg bg-gray min-h-64 '>
                <p className='text-gray-600 mb-2 text-xl font-bold px-4 pt-3 text-center'>
                    Panditos
                </p>
                <div className='py-5 px-6 max-h-96 overflow-auto'>
                    {users.map((user) => (
                        <User
                            name={user.name}
                            uid={user.uid}
                            removeUser={removeUser}
                            key={user.uid}
                        />
                    ))}
                </div>
                <div className='bg-gray-300 px-2 py-3'>
                    <button
                        type='button'
                        className={`bg-red-500 py-2 px-4 rounded text-white w-full focus:outline-none
                            ${
                                users.length <= 0 || spinning
                                    ? 'opacity-50 cursor-default'
                                    : 'hover:bg-red-700'
                            }
                            transition ease-in-out duration-300`}
                        onClick={onClickDeleteAll}
                        disabled={(users.length <= 0 && true) || spinning}
                    >
                        Borrar todos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsersList;

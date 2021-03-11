import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import User from './User';
import { RootState } from '../../types/state.types';

const UsersList = (): JSX.Element => {
    const { users } = useSelector((state: RootState) => state.roulette);

    const [filter, setFilter] = useState('');

    return (
        <div className='rounded-lg overflow-hidden shadow-lg bg-white max-h-96 pb-0.5'>
            <p className='text-gray-600 mb-2 text-xl font-bold px-4 pt-3 text-center'>Usuarios</p>

            <div className='px-6'>
                <input
                    autoComplete='off'
                    type='search'
                    name='search'
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    placeholder='Buscar usuario...'
                    className='bg-gray-200 text-gray-700 h-10 w-full pl-5 pr-4 rounded-full text-sm focus:outline-none'
                />
            </div>

            <div className='py-2 px-6 max-h-72 h-72 overflow-y-auto'>
                {users
                    .filter((f) => f.name.includes(filter.toLowerCase()) || filter === '')
                    .map((user) => (
                        <User
                            key={user.uid}
                            name={user.name}
                            uid={user.uid}
                            fromMod={user.fromMod}
                        />
                    ))}
            </div>
        </div>
    );
};

export default UsersList;

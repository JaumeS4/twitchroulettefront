import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RouletteContext } from '../context/roulette/RouletteContext';

type UserTypes = {
    name: string;
    uid: string;
    removeUser: (name: string, uid: string) => void;
};

const User = ({ name, uid, removeUser }: UserTypes): JSX.Element => {
    const {
        rouletteState: { spinning },
    } = useContext(RouletteContext);

    const onClick = (nameArg: string, uidArg: string) => {
        if (spinning) return;
        removeUser(nameArg, uidArg);
    };

    return (
        <div className='flex justify-center space-x-6 px-2 py-2'>
            <p className='flex text-xl text-gray-700'>{name}</p>
            <p className='flex items-end mb-0.5'>
                <FontAwesomeIcon
                    className={`text-red-700
                        ${
                            spinning
                                ? 'opacity-50 cursor-default'
                                : 'hover:text-red-900 cursor-pointer'
                        }
                        transition ease-in-out duration-300
                    `}
                    size='lg'
                    icon={faTimes}
                    onClick={() => onClick(name, uid)}
                />
            </p>
        </div>
    );
};

export default User;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';

type UserProps = {
    name: string;
    uid: string;
    fromMod: boolean;
};

const User = ({ name, uid, fromMod }: UserProps): JSX.Element => {
    const { socket } = useContext(SocketContext);

    const removeUser = (userUid: string) => socket.emit('remove-user-button', userUid);

    return (
        <div className='flex justify-center space-x-6 px-2 py-2 pt-6'>
            <p className={`flex text-xl text-gray-700 ${fromMod && 'font-semibold'}`}>{name}</p>
            <p className='flex items-end mb-0.5'>
                <FontAwesomeIcon
                    className='
                        text-red-700 cursor-pointer
                        hover:text-red-900
                        transition ease-in-out duration-300
                    '
                    size='lg'
                    icon={faTimes}
                    onClick={() => removeUser(uid)}
                />
            </p>
        </div>
    );
};

export default User;

import { createContext, useEffect } from 'react';
import useSocket from '../hooks/useSocket';

export const SocketContext = createContext<SocketStateType>(null);

export const SocketProvider: React.FC = ({ children }) => {
    const { socket, connectSocket } = useSocket('https://node-twitchroulette.herokuapp.com/');

    useEffect(() => {
        connectSocket();
    }, [connectSocket]);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

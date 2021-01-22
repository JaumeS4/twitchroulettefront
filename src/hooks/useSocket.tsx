import { useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (serverPath: string) => {
    const [socket, setSocket] = useState<Socket>();

    const connectSocket = useCallback(() => {
        const socketTemp = io(serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
        });

        setSocket(socketTemp);
    }, [serverPath]);

    const disconnectSocket = useCallback(() => {
        socket?.disconnect();
    }, [socket]);

    return {
        socket,
        connectSocket,
        disconnectSocket,
    };
};

export default useSocket;

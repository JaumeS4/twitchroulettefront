import { useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (
    serverPath: string,
): {
    socket: Socket | undefined;
    connectSocket: (rouletteToken: string | null) => void;
    disconnectSocket: () => void;
} => {
    const [socket, setSocket] = useState<Socket>();

    const connectSocket = useCallback(
        (rouletteToken: string | null) => {
            const token = localStorage.getItem('token');

            const socketTemp = io(serverPath, {
                transports: ['websocket'],
                autoConnect: true,
                forceNew: true,
                query: {
                    'x-token': token,
                    'roulette-token': rouletteToken,
                },
            });

            setSocket(socketTemp);
        },
        [serverPath],
    );

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

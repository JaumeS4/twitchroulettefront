import React from 'react';

import { SocketProvider } from './context/SocketContext';
import AppRouter from './router/AppRouter';
import { RouletteProvider } from './context/roulette/RouletteContext';

const App: React.FC = () => {
    return (
        <RouletteProvider>
            <SocketProvider>
                <AppRouter />
            </SocketProvider>
        </RouletteProvider>
    );
};

export default App;

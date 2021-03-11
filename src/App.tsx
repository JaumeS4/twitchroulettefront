import React from 'react';

import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import { SocketProvider } from './context/SocketContext';
import store from './store/store';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <SocketProvider>
                <AppRouter />
            </SocketProvider>
        </Provider>
    );
};

export default App;

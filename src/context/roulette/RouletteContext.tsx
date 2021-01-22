import { createContext, Dispatch, useReducer } from 'react';
import rouletteReducer, { RouletteActions } from './RouletteReducer';

const initialState = {
    wheel: null,
    spinning: false,
    activeWinner: false,
    winnerObject: {
        text: '',
        fillStyle: '',
    },
    results: [],
    users: [],
    colorIndex: 0,
    defaultRouletteActive: true,
    defaultUsers: [
        { uid: '0', name: 'Leo' },
        { uid: '1', name: 'Julia' },
        { uid: '2', name: 'Luis' },
        { uid: '3', name: 'Sandra' },
        { uid: '4', name: 'Simon' },
        { uid: '5', name: 'Maria' },
        { uid: '6', name: 'Raul' },
    ],
    colors: ['#AE9BE8', '#F896A8', '#FDD1A2', '#A7D1FF', '#C8F2E0', '#7500EA', '#B780E6'],
};

const RouletteContext = createContext<{
    rouletteState: RouletteStateType;
    dispatch: Dispatch<RouletteActions>;
}>({
    rouletteState: initialState,
    dispatch: () => null,
});

const RouletteProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [rouletteState, dispatch] = useReducer(rouletteReducer, initialState);

    return (
        <RouletteContext.Provider value={{ rouletteState, dispatch }}>
            {children}
        </RouletteContext.Provider>
    );
};

export { RouletteContext, RouletteProvider };

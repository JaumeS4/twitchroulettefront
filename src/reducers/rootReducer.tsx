import { combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';
import uiReducer from './uiReducer';
import rouletteReducer from './rouletteReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    roulette: rouletteReducer,
    settings: settingsReducer,
    ui: uiReducer,
});

export default rootReducer;

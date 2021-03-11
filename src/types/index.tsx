import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AuthTypes, RouletteTypes, SettingsTypes, UiTypes } from './action.types';
import { RootState } from './state.types';

export type KnownTypes = Action<AuthTypes | SettingsTypes | UiTypes | RouletteTypes>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export type ReduxThunkDispatch = ThunkDispatch<RootState, Record<string, unknown>, KnownTypes>;

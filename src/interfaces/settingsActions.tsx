import { ISettings, ISettingsBasic } from './settings';
import { SettingsTypes } from '../types/action.types';

export interface ISetInitialSettingsActionResponse {
    payload: ISettings;
    type: SettingsTypes;
}

export interface IUpdateBasicSettingsActionResponse {
    payload: ISettingsBasic;
    type: SettingsTypes;
}

export interface IUpdateImageUrlActionResponse {
    payload: string | null;
    type: SettingsTypes;
}

export interface IUpdateSongUrlActionResponse {
    payload: string | null;
    type: SettingsTypes;
}

export interface IUpdateSongBoolActionResponse {
    payload: boolean;
    type: SettingsTypes;
}

export interface IUpdateDefaultUsersActionResponse {
    payload: Array<string>;
    type: SettingsTypes;
}

export interface IUpdateColorsActionResponse {
    payload: Array<string>;
    type: SettingsTypes;
}

import { AuthTypes, RouletteTypes } from '../types/action.types';
import { IResult, IRouletteBasic, IUser, IWinnerObject } from './roulette';
import { IUserAuth } from './user';

export interface ISetSpinningActionResponse {
    payload: boolean;
    type: RouletteTypes;
}

export interface ISetActiveWinnerActionResponse {
    payload: boolean;
    type: RouletteTypes;
}

export interface ISetWinnerObjectActionResponse {
    payload: IWinnerObject | string;
    type: RouletteTypes;
}

export interface ISetResultActionResponse {
    payload: IResult;
    type: RouletteTypes;
}

export interface IClearResultsActionResponse {
    type: RouletteTypes;
}

export interface ISetUserActionResponse {
    payload: IUser;
    type: RouletteTypes;
}

export interface IDeleteUserActionResponse {
    payload: string;
    type: RouletteTypes;
}

export interface IDeleteAllUsersActionResponse {
    type: RouletteTypes;
}

export interface IIncrementColorIndexActionResponse {
    type: RouletteTypes;
}

export interface IResetColorIndexActionResponse {
    type: RouletteTypes;
}

export interface ISetDefaultRouletteActiveActionResponse {
    payload: boolean;
    type: RouletteTypes;
}

export interface ISetSubModeActionResponse {
    payload: boolean;
    type: RouletteTypes;
}

export interface ISetManualModeActionResponse {
    payload: boolean;
    type: RouletteTypes;
}

export interface ISetInitialRouletteActionResponse {
    payload: IRouletteBasic;
    type: RouletteTypes;
}

export interface ISetLoadingManualUsersActionResponse {
    payload: boolean;
    type: RouletteTypes;
}

export interface ISetLoadingWaitingUsersActionResponse {
    payload: boolean;
    type: RouletteTypes;
}

export interface ILoginActionResponse {
    payload: IUserAuth;
    type: AuthTypes;
}

export interface ISetRouletteTokenResponse {
    payload: string;
    type: AuthTypes;
}

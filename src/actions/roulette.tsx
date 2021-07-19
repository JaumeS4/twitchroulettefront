import Swal from 'sweetalert2';
import { AppThunk, ReduxThunkDispatch } from '../types';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { setInitialSettingsAction } from './settings';
import { finishLoadingRouletteCheckingAction, setErrorRouletteCheckingAction } from './ui';
import { AuthTypes, RouletteTypes } from '../types/action.types';
import { IResult, IRouletteBasic, IUser, IWinnerObject } from '../interfaces/roulette';
import { IUserAuth } from '../interfaces/user';
import {
    IClearResultsActionResponse,
    IDeleteAllUsersActionResponse,
    IDeleteUserActionResponse,
    IIncrementColorIndexActionResponse,
    ILoginActionResponse,
    IResetColorIndexActionResponse,
    ISetActiveWinnerActionResponse,
    ISetDefaultRouletteActiveActionResponse,
    ISetInitialRouletteActionResponse,
    ISetLoadingManualUsersActionResponse,
    ISetLoadingWaitingUsersActionResponse,
    ISetManualModeActionResponse,
    ISetResultActionResponse,
    ISetRouletteTokenResponse,
    ISetSpinningActionResponse,
    ISetSubModeActionResponse,
    ISetUserActionResponse,
    ISetWinnerObjectActionResponse,
} from '../interfaces/rouletteActions';

export const setSpinningAction = (payload: boolean): ISetSpinningActionResponse => ({
    type: RouletteTypes.SetSpinning,
    payload,
});

export const setActiveWinnerAction = (payload: boolean): ISetActiveWinnerActionResponse => ({
    type: RouletteTypes.SetActiveWinner,
    payload,
});

export const setWinnerObjectAction = (
    winnerObject: IWinnerObject | string,
): ISetWinnerObjectActionResponse => ({
    type: RouletteTypes.SetWinnerObject,
    payload: winnerObject,
});

export const setResultAction = (result: IResult): ISetResultActionResponse => ({
    type: RouletteTypes.SetResult,
    payload: result,
});

export const clearResultsAction = (): IClearResultsActionResponse => ({
    type: RouletteTypes.ClearResults,
});

export const setUserAction = (user: IUser): ISetUserActionResponse => ({
    type: RouletteTypes.SetUser,
    payload: user,
});

export const deleteUserAction = (uid: string): IDeleteUserActionResponse => ({
    type: RouletteTypes.DeleteUser,
    payload: uid,
});

export const deleteAllUsersAction = (): IDeleteAllUsersActionResponse => ({
    type: RouletteTypes.DeleteAllUsers,
});

export const incrementColorIndexAction = (): IIncrementColorIndexActionResponse => ({
    type: RouletteTypes.IncrementColorIndex,
});

export const resetColorIndexAction = (): IResetColorIndexActionResponse => ({
    type: RouletteTypes.ResetColorIndex,
});

export const setDefaultRouletteActiveAction = (
    payload: boolean,
): ISetDefaultRouletteActiveActionResponse => ({
    type: RouletteTypes.SetDefaultRouletteActive,
    payload,
});

export const setSubModeAction = (payload: boolean): ISetSubModeActionResponse => ({
    type: RouletteTypes.SetSubMode,
    payload,
});

export const setManualModeAction = (payload: boolean): ISetManualModeActionResponse => ({
    type: RouletteTypes.SetManualMode,
    payload,
});

const setInitialRouletteAction = (roulette: IRouletteBasic): ISetInitialRouletteActionResponse => ({
    type: RouletteTypes.SetInitialRoulette,
    payload: roulette,
});

export const setLoadingManualUsers = (payload: boolean): ISetLoadingManualUsersActionResponse => ({
    type: RouletteTypes.SetLoadingManualUsers,
    payload,
});

export const setLoadingWaitingUsers = (
    payload: boolean,
): ISetLoadingWaitingUsersActionResponse => ({
    type: RouletteTypes.SetLoadingWaitingUsers,
    payload,
});

const loginAction = (user: IUserAuth): ILoginActionResponse => ({
    type: AuthTypes.Login,
    payload: user,
});

export const setRouletteToken = (rouletteToken: string): ISetRouletteTokenResponse => ({
    type: AuthTypes.SetRouletteToken,
    payload: rouletteToken,
});

export const startRouletteLoading = (): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (await fetchWithToken('roulette')).json();
        if (resp.ok) {
            await dispatch(setInitialRouletteAction(resp.roulette));
        } else {
            localStorage.removeItem('token');
            await Swal.fire({
                titleText: 'Error',
                text: 'Ha ocurrido un error, contacte con el administrador.',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
        }
    };
};

export const startValidatingRouletteToken = (token: string): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (
            await fetchWithoutToken('roulette/validate-token', { token }, 'POST')
        ).json();

        if (resp.ok) {
            dispatch(loginAction(resp.user));
            dispatch(setInitialSettingsAction(resp.settings));
            dispatch(setInitialRouletteAction(resp.roulette));

            dispatch(finishLoadingRouletteCheckingAction());
        } else {
            dispatch(setErrorRouletteCheckingAction());
            dispatch(finishLoadingRouletteCheckingAction());
        }
    };
};

export const newRouletteToken = (): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (await fetchWithToken('roulette/generate-token', {}, 'POST')).json();

        if (resp.ok) {
            await dispatch(setRouletteToken(resp.rouletteToken));
            return resp.rouletteToken;
        }

        await Swal.fire({
            titleText: 'Error',
            text: 'Error abriendo la ruleta, prueba de nuevo o contacta con un administrador.',
            icon: 'error',
            confirmButtonText: 'Cerrar',
        });

        return null;
    };
};

export const refreshRouletteToken = (): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (await fetchWithToken('roulette/generate-token', {}, 'POST')).json();

        if (resp.ok) {
            await dispatch(setRouletteToken(resp.rouletteToken));

            await Swal.fire({
                titleText: 'Link reiniciado',
                text: 'Link reiniciado correctamente.',
                timer: 3000,
                icon: 'success',
                confirmButtonText: 'Cerrar',
            });
        } else {
            await Swal.fire({
                titleText: 'Error',
                text: 'Error reiniciando el link, prueba de nuevo o contacta con el administrador.',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
        }
    };
};

export const deleteAllUsers = (): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        dispatch(deleteAllUsersAction());
        dispatch(setDefaultRouletteActiveAction(true));
        dispatch(setWinnerObjectAction(''));
        dispatch(resetColorIndexAction());
    };
};

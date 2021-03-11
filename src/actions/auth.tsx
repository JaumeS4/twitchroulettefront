import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { AppThunk, ReduxThunkDispatch } from '../types';
import { clearSettings, startSettingsLoading } from './settings';
import { AuthTypes } from '../types/action.types';
import { IUserAuth } from '../interfaces/user';
import { startRouletteLoading } from './roulette';

const loginAction = (user: IUserAuth) => ({
    type: AuthTypes.Login,
    payload: user,
});

const checkingFinishAction = () => ({ type: AuthTypes.CheckingFinish });

const logoutAction = () => ({ type: AuthTypes.Logout });

const verifyAccountAction = () => ({ type: AuthTypes.VerifyAccount });

export const startLogin = (code: string): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (await fetchWithoutToken('auth/signin', { code }, 'POST')).json();

        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            dispatch(
                loginAction({
                    userId: resp.userId,
                    verified: resp.verified,
                    twitchId: resp.twitchId,
                    twitchName: resp.twitchName,
                    twitchProfileImageUrl: resp.twitchProfileImageUrl,
                    rouletteToken: resp.rouletteToken,
                }),
            );
            await dispatch(startSettingsLoading());
            await dispatch(startRouletteLoading());
        } else {
            await Swal.fire({
                titleText: 'Error',
                text: 'Ha ocurrido un error, contacte con el administrador.',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
        }
    };
};

export const startChecking = (): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (await fetchWithToken('auth/validate-token')).json();

        if (resp.ok) {
            await dispatch(startSettingsLoading());
            await dispatch(startRouletteLoading());

            // If token is close to expire, backend will send new token in response
            if (resp.token) localStorage.setItem('token', resp.token);

            dispatch(
                loginAction({
                    userId: resp.userId,
                    verified: resp.verified,
                    twitchId: resp.twitchId,
                    twitchName: resp.twitchName,
                    twitchProfileImageUrl: resp.twitchProfileImageUrl,
                    rouletteToken: resp.rouletteToken,
                }),
            );
        } else {
            dispatch(checkingFinishAction());
        }
    };
};

export const verifyAccount = (key: string): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (await fetchWithToken('auth/verify-account', { key }, 'POST')).json();

        if (resp.ok) {
            dispatch(verifyAccountAction());
        } else {
            Swal.fire({
                titleText: 'Error',
                text: 'Esa key no es válida, contacte con el administrador.',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
        }
    };
};

export const startLogout = (): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        localStorage.removeItem('token');
        dispatch(logoutAction());
        dispatch(clearSettings());
    };
};

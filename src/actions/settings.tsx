import Swal from 'sweetalert2';
import { fetchWithToken, fetchWithTokenFormData } from '../helpers/fetch';
import { AppThunk, ReduxThunkDispatch } from '../types';
import { ISettings, ISettingsBasic } from '../interfaces/settings';
import { SettingsTypes } from '../types/action.types';
import {
    ISetInitialSettingsActionResponse,
    IUpdateBasicSettingsActionResponse,
    IUpdateColorsActionResponse,
    IUpdateDefaultUsersActionResponse,
    IUpdateImageUrlActionResponse,
    IUpdateSongBoolActionResponse,
    IUpdateSongUrlActionResponse,
} from '../interfaces/settingsActions';

export const setInitialSettingsAction = (
    settings: ISettings,
): ISetInitialSettingsActionResponse => ({
    type: SettingsTypes.SetInitialSettings,
    payload: settings,
});

export const updateBasicSettingsAction = (
    basicSettings: ISettingsBasic,
): IUpdateBasicSettingsActionResponse => ({
    type: SettingsTypes.UpdateBasicSettings,
    payload: basicSettings,
});

export const updateImageUrlAction = (imageUrl: string | null): IUpdateImageUrlActionResponse => ({
    type: SettingsTypes.UpdateImageUrl,
    payload: imageUrl,
});

export const updateSongUrlAction = (songUrl: string | null): IUpdateSongUrlActionResponse => ({
    type: SettingsTypes.UpdateSongUrl,
    payload: songUrl,
});

export const updateSongBoolAction = (payload: boolean): IUpdateSongBoolActionResponse => ({
    type: SettingsTypes.UpdateSongBool,
    payload,
});

export const updateDefaultUsersAction = (
    users: Array<string>,
): IUpdateDefaultUsersActionResponse => ({
    type: SettingsTypes.UpdateDefaultUsers,
    payload: users,
});

export const updateColorsAction = (colors: Array<string>): IUpdateColorsActionResponse => ({
    type: SettingsTypes.UpdateColors,
    payload: colors,
});

export const startSettingsLoading = (): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (await fetchWithToken('settings')).json();

        if (resp.ok) {
            await dispatch(setInitialSettingsAction(resp.settings));
        } else {
            localStorage.removeItem('token');
            Swal.fire({
                titleText: 'Error',
                text: 'Ha ocurrido un error, contacte con el administrador.',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
        }
    };
};

export const updateBasicSettings = (data: ISettingsBasic): AppThunk => {
    return async (dispatch: ReduxThunkDispatch): Promise<boolean | null> => {
        const resp = await (await fetchWithToken('settings', data, 'POST')).json();
        if (resp.ok) {
            dispatch(updateBasicSettingsAction(data));

            Swal.fire({
                titleText: 'Ajustes guardados',
                text: 'Ajustes guardados correctamente.',
                icon: 'success',
                confirmButtonText: 'Cerrar',
            });
            return resp.ok;
        }

        Swal.fire({
            titleText: 'Error',
            text:
                'Ha ocurrido un error guardando los ajustes, pruebe de nuevo o contacte con el administrador.',
            icon: 'error',
            confirmButtonText: 'Cerrar',
        });

        return null;
    };
};

export const uploadFile = (file: File, type: string): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const data = new FormData();
        data.append('type', type);
        data.append('file', file);
        const resp = await (await fetchWithTokenFormData('upload', data)).json();

        if (resp.ok) {
            if (type === 'image') dispatch(updateImageUrlAction(resp.url));

            if (type === 'song') dispatch(updateSongUrlAction(resp.url));

            Swal.fire({
                titleText: 'Archivo subido',
                text: 'Archivo subido correctamente.',
                icon: 'success',
                confirmButtonText: 'Cerrar',
            });

            return resp.url;
        }
        if (resp.err === 'invalid-file-type') {
            let fileTypes;

            if (type === 'image') {
                fileTypes = 'jpeg, jpg, png o gif';
            } else {
                fileTypes = 'mpeg, ogg o wav';
            }

            Swal.fire({
                titleText: 'Error',
                html: `Solo están permitidos los archivos de tipo: <br> ${fileTypes}.`,
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
            return null;
        }

        if (resp.err === 'LIMIT_FILE_SIZE') {
            Swal.fire({
                titleText: 'Error',
                text: 'Error al subir el archivo, es demasiado grande.',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
            return null;
        }

        Swal.fire({
            titleText: 'Error',
            text: 'Error al subir el archivo, pruebe de nuevo.',
            icon: 'error',
            confirmButtonText: 'Cerrar',
        });

        return null;
    };
};

export const updateDefaultUsers = (users: Array<string>): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (
            await fetchWithToken('settings/update-default-users', { users }, 'POST')
        ).json();

        if (resp.ok) {
            dispatch(updateDefaultUsersAction(users));

            Swal.fire({
                titleText: 'Usuarios actualizados',
                text: 'Usuarios actualizados correctamente.',
                timer: 3500,
                icon: 'success',
                confirmButtonText: 'Cerrar',
            });
            return true;
        }

        Swal.fire({
            titleText: 'Error',
            text: 'Error al actualizar usuarios, pruebe de nuevo.',
            icon: 'error',
            confirmButtonText: 'Cerrar',
        });

        return null;
    };
};

export const updateColors = (colors: Array<string>): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (
            await fetchWithToken('settings/update-colors', { colors }, 'POST')
        ).json();

        if (resp.ok) {
            dispatch(updateColorsAction(colors));

            Swal.fire({
                titleText: 'Colores actualizados',
                text: 'Colores actualizados correctamente.',
                timer: 3500,
                icon: 'success',
                confirmButtonText: 'Cerrar',
            });
            return true;
        }

        Swal.fire({
            titleText: 'Error',
            text: 'Error al actualizar colores, pruebe de nuevo.',
            icon: 'error',
            confirmButtonText: 'Cerrar',
        });

        return null;
    };
};

export const deleteImage = (): AppThunk => {
    return async (dispatch: ReduxThunkDispatch) => {
        const resp = await (await fetchWithToken('upload/delete-image', {}, 'DELETE')).json();

        if (resp.ok) {
            dispatch(updateImageUrlAction(null));

            await Swal.fire({
                titleText: 'Imagen eliminada',
                text: 'Imagen eliminada con éxito.',
                icon: 'success',
                confirmButtonText: 'Cerrar',
            });
            return true;
        }

        await Swal.fire({
            titleText: 'Error',
            text: 'Error al eliminar la imagen, pruebe de nuevo.',
            icon: 'error',
            confirmButtonText: 'Cerrar',
        });

        return null;
    };
};

export const clearSettings = (): { type: SettingsTypes } => ({
    type: SettingsTypes.ClearSettings,
});

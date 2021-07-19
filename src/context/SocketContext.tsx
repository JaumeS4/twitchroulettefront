import { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSocket from '../hooks/useSocket';
import { RootState, SocketStateType } from '../types/state.types';
import {
    deleteAllUsers,
    deleteUserAction,
    incrementColorIndexAction,
    resetColorIndexAction,
    setActiveWinnerAction,
    setDefaultRouletteActiveAction,
    setLoadingManualUsers,
    setLoadingWaitingUsers,
    setManualModeAction,
    setResultAction,
    setSpinningAction,
    setSubModeAction,
    setUserAction,
    setWinnerObjectAction,
} from '../actions/roulette';

import {
    updateBasicSettingsAction,
    updateColorsAction,
    updateDefaultUsersAction,
    updateImageSettingsAction,
    updateImageUrlAction,
    updateSongBoolAction,
    updateSongUrlAction,
} from '../actions/settings';
import { ISettingsBasic, ISettingsImage } from '../interfaces/settings';
import { IResult } from '../interfaces/roulette';
import { setViewedNews } from '../actions/auth';

export const SocketContext = createContext<SocketStateType>(null);

export const SocketProvider: React.FC = ({ children }) => {
    const { socket, connectSocket, disconnectSocket } = useSocket(
        `${process.env.REACT_APP_SOCKET_URL}`,
    );
    const { logged, rouletteToken } = useSelector((state: RootState) => state.auth);
    const { defaultRouletteActive, colorIndex } = useSelector((state: RootState) => state.roulette);
    const { colors } = useSelector((state: RootState) => state.settings);

    const dispatch = useDispatch();

    useEffect(() => {
        if (logged || rouletteToken) connectSocket(rouletteToken);

        if (!logged && !rouletteToken) disconnectSocket();
    }, [logged, rouletteToken, connectSocket]);

    useEffect(() => {
        socket?.on('spin-roulette-state', () => {
            dispatch(setSpinningAction(true));
        });

        socket?.on('remove-user-state', (uid: string) => dispatch(deleteUserAction(uid)));

        socket?.on('remove-all-users-state', () => dispatch(deleteAllUsers()));

        socket?.on('update-loading-manual-users', (bool: boolean) =>
            dispatch(setLoadingManualUsers(bool)),
        );

        socket?.on('update-loading-waiting-users', (bool: boolean) =>
            dispatch(setLoadingWaitingUsers(bool)),
        );

        socket?.on('update-default-roulette-active', (bool: boolean) =>
            dispatch(setDefaultRouletteActiveAction(bool)),
        );

        socket?.on('increment-color-index', () => dispatch(incrementColorIndexAction()));

        socket?.on('reset-color-index', () => dispatch(resetColorIndexAction()));

        socket?.on('set-winner', ({ text, fillStyle }: { text: string; fillStyle: string }) => {
            dispatch(setActiveWinnerAction(true));
            dispatch(setWinnerObjectAction({ text, fillStyle }));
        });

        socket?.on('hide-winner', () => {
            dispatch(setActiveWinnerAction(false));
            dispatch(setSpinningAction(false));
        });

        socket?.on('set-result', (result: IResult) => dispatch(setResultAction(result)));

        socket?.on('update-sub-mode', (bool: boolean) => dispatch(setSubModeAction(bool)));

        socket?.on('update-manual-mode', (bool: boolean) => dispatch(setManualModeAction(bool)));

        socket?.on('update-song', (bool: boolean) => dispatch(updateSongBoolAction(bool)));

        socket?.on('update-basic-settings', (values: ISettingsBasic) =>
            dispatch(updateBasicSettingsAction(values)),
        );

        socket?.on('update-image-settings', (values: ISettingsImage) =>
            dispatch(updateImageSettingsAction(values)),
        );

        socket?.on('update-default-users', (users: Array<string>) =>
            dispatch(updateDefaultUsersAction(users)),
        );

        socket?.on('update-colors', (colorsArr: Array<string>) =>
            dispatch(updateColorsAction(colorsArr)),
        );

        socket?.on('update-image-url', (imageUrl: string | null) =>
            dispatch(updateImageUrlAction(imageUrl)),
        );
        socket?.on('update-song-url', (songUrl: string | null) =>
            dispatch(updateSongUrlAction(songUrl)),
        );

        socket?.on('viewed-news', (bool: boolean) => dispatch(setViewedNews(bool)));

        return () => {
            socket?.off('spin-roulette-state');
            socket?.off('remove-user-state');
            socket?.off('remove-all-users-state');
            socket?.off('update-loading-manual-users');
            socket?.off('update-loading-waiting-users');
            socket?.off('update-default-roulette-active');
            socket?.off('increment-color-index');
            socket?.off('reset-color-index');
            socket?.off('set-winner');
            socket?.off('hide-winner');
            socket?.off('set-result');
            socket?.off('update-sub-mode');
            socket?.off('update-manual-mode');
            socket?.off('update-song');
            socket?.off('update-basic-settings');
            socket?.off('update-image-settings');
            socket?.off('update-default-users');
            socket?.off('update-colors');
            socket?.off('update-image-url');
            socket?.off('update-song-url');
            socket?.off('viewed-news');
        };
    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on(
            'add-user-state',
            ({ name, uid, fromMod }: { name: string; uid: string; fromMod: boolean }) => {
                dispatch(setUserAction({ name, uid, fromMod }));

                if (defaultRouletteActive) dispatch(setDefaultRouletteActiveAction(false));
                dispatch(incrementColorIndexAction());
                if (colorIndex >= colors.length - 1) dispatch(resetColorIndexAction());
            },
        );

        return () => {
            socket?.off('add-user-state');
        };
    }, [socket, defaultRouletteActive, colors, colorIndex, dispatch]);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

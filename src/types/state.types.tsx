// TODO: Change this type
import { IResult, IUser } from '../interfaces/roulette';

export type RootState = {
    auth: AuthStateType;
    settings: SettingsStateType;
    ui: UiStateType;
    roulette: RouletteStateType;
};

export type RouletteStateType = {
    users: IUser[];
    results: IResult[];
    defaultRouletteActive: boolean;
    colorIndex: number;
    spinning: boolean;
    loadingManualUsers: boolean;
    loadingWaitingUsers: boolean;
    activeWinner: boolean;
    winnerObject: {
        text: string;
        fillStyle: string;
    };
    subMode: boolean;
    followMode: boolean;
    manualMode: boolean;
};

export type AuthStateType = {
    logged: boolean;
    checking: boolean;
    verified: boolean;
    twitchId: string;
    twitchName: string;
    twitchProfileImageUrl: string;
    rouletteToken: string;
    viewedNews: boolean;
};

export type SettingsStateType = {
    rouletteDuration: number;
    rouletteLaps: number;
    rouletteWinnerDuration: number;
    song: boolean;
    defaultUsers: Array<string>;
    colors: Array<string>;
    songUrl: string | null;
    imageUrl: string | null;
    imageWidth: number;
    imageHeight: number;
    imageBackgroundSize: number;
    radioRoulette: number;
    marginTextRoulette: number;
};

export type UiStateType = {
    loadingRouletteChecking: boolean;
    errorRouletteChecking: boolean | null;
};

export type SocketStateType = any;

export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

export interface ISettings {
    rouletteDuration: number;
    rouletteLaps: number;
    song: boolean;
    defaultUsers: Array<string>;
    colors: Array<string>;
    songUrl: null | string;
    imageUrl: null | string;
}

export interface ISettingsBasic {
    rouletteDuration: number;
    rouletteLaps: number;
    rouletteWinnerDuration: number;
}

export interface ISettingsUser {
    uid: string;
    name: string;
}

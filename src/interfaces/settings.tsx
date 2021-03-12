export interface ISettings {
    rouletteDuration: number;
    rouletteLaps: number;
    song: boolean;
    defaultUsers: Array<string>;
    colors: Array<string>;
    songUrl: null | string;
    imageUrl: null | string;
    imageHeight: number;
    imageWidth: number;
    imageBackgroundSize: number;
    radioRoulette: number;
}

export interface ISettingsBasic {
    rouletteDuration: number;
    rouletteLaps: number;
    rouletteWinnerDuration: number;
    radioRoulette: number;
    marginTextRoulette: number;
}

export interface ISettingsImage {
    imageHeight: number;
    imageWidth: number;
    imageBackgroundSize: number;
}

export interface ISettingsUser {
    uid: string;
    name: string;
}

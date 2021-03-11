export interface IUser {
    name: string;
    uid: string;
    fromMod: boolean;
}

export interface IResult {
    winner: string;
    uid: string;
}

export interface IRoulette {
    users: Array<IUser>;
    results: Array<IResult>;
    subMode: boolean;
    followMode: boolean;
    winnerObject: IWinnerObject;
    activeWinner: boolean;
    spinning: boolean;
    defaultRouletteActive: boolean;
    colorIndex: number;
}

export interface IRouletteBasic {
    users: Array<IUser>;
    subMode: boolean;
    followMode: boolean;
    colorIndex: number;
}

export interface IWinnerObject {
    text: string;
    fillStyle: string;
}

declare interface Window {
    alertPrize: () => void;
}

declare type ResultType = {
    result: string;
    index: number;
};

declare type UserType = {
    name: string;
    uid: string;
};

declare type RouletteStateType = {
    spinning: boolean;
    activeWinner: boolean;
    winnerObject: {
        text: string;
        fillStyle: string;
    };
    results: ResultType[];
    users: UserType[];
    colorIndex: number;
    defaultRouletteActive: boolean;
    defaultUsers: UserType[];
    colors: string[];
};

declare type SocketStateType = any;

declare type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

enum RouletteTypes {
    SetWheel = 'SET_WHEEL_ROULETTE',
    SetSpinning = 'SET_SPINNING_ROULETTE',
    SetActiveWinner = 'SET_ACTIVE_WINNER_ROULETTE',
    SetWinnerObject = 'SET_WINNER_OBJECT_ROULETTE',
    SetResult = 'SET_RESULT_ROULETTE',
    SetUser = 'SET_USER_ROULETTE',
    DeleteUser = 'DELETE_USER_ROULETTE',
    DeleteAllUsers = 'DELETE_ALL_USERS_ROULETTE',
    IncrementColorIndex = 'INCREMENT_COLOR_INDEX_ROULETTE',
    ResetColorIndex = 'RESET_COLOR_INDEX_ROULETTE',
    SetDefaultRouletteActive = 'SET_DEFAULT_ROULETTE_ACTIVE_ROULETTE',
}

declare type RoulettePayload = {
    [RouletteTypes.SetWheel]: {
        any;
    };
    [RouletteTypes.SetSpinning]: boolean;
    [RouletteTypes.SetActiveWinner]: boolean;
    [RouletteTypes.SetWinnerObject]: {
        text: string;
        fillStyle: string;
    };
    [RouletteTypes.SetResult]: {
        result: string;
    };
    [RouletteTypes.SetUser]: UserType;
    [RouletteTypes.DeleteUser]: string;
    [RouletteTypes.DeleteAllUsers];
    [RouletteTypes.IncrementColorIndex];
    [RouletteTypes.ResetColorIndex];
    [RouletteTypes.SetDefaultRouletteActive]: boolean;
};

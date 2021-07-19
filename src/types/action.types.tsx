export enum AuthTypes {
    Login = 'LOGIN',
    CheckingFinish = 'CHECKING_FINISH',
    Logout = 'LOGOUT',
    SetRouletteToken = 'SET_ROULETTE_TOKEN',
    VerifyAccount = 'VERIFY_ACCOUNT',
    SetViewedNews = 'SET_VIEWED_NEWS',
}

export enum SettingsTypes {
    SetInitialSettings = 'SET_INITIAL_SETTINGS',
    ClearSettings = 'CLEAR_SETTINGS',
    UpdateBasicSettings = 'UPDATE_BASIC_SETTINGS',
    UpdateSongUrl = 'UPDATE_SONG_URL',
    UpdateImageSettings = 'UPDATE_IMAGE_SETTINGS',
    UpdateSongBool = 'UPDATE_SONG_BOOL',
    UpdateImageUrl = 'UPDATE_IMAGE_URL',
    UpdateDefaultUsers = 'UPDATE_DEFAULT_USERS',
    UpdateColors = 'UPDATE_COLORS',
}

export enum UiTypes {
    FinishLoadingRouletteChecking = 'FINISH_LOADING_ROULETTE_CHECKING',
    SetErrorRouletteChecking = 'SET_ERROR_ROULETTE_CHECKING',
}

export enum RouletteTypes {
    SetInitialRoulette = 'SET_INITIAL_ROULETTE',
    SetLoadingManualUsers = 'SET_LOADING_MANUAL_USERS_ROULETTE',
    SetLoadingWaitingUsers = 'SET_LOADING_WAITING_USERS_ROULETTE',
    SetUser = 'SET_USER_ROULETTE',
    DeleteUser = 'DELETE_USER_ROULETTE',
    DeleteAllUsers = 'DELETE_ALL_USERS_ROULETTE',
    SetResult = 'SET_RESULT_ROULETTE',
    ClearResults = 'CLEAR_RESULTS_ROULETTE',
    SetWinnerObject = 'SET_WINNER_OBJECT_ROULETTE',
    SetActiveWinner = 'SET_ACTIVE_WINNER_ROULETTE',
    SetSpinning = 'SET_SPINNING_ROULETTE',
    SetDefaultRouletteActive = 'SET_DEFAULT_ROULETTE_ACTIVE_ROULETTE',
    IncrementColorIndex = 'INCREMENT_COLOR_INDEX_ROULETTE',
    ResetColorIndex = 'RESET_COLOR_INDEX_ROULETTE',
    SetSubMode = 'SET_SUB_MODE_ROULETTE',
    SetFollowMode = 'SET_FOLLOW_MODE_ROULETTE',
    SetManualMode = 'SET_MANUAL_MODE_ROULETTE',
}

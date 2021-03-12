import { ActionMap, SettingsStateType } from '../types/state.types';
import { SettingsPayload } from '../types/payload.types';
import { SettingsTypes } from '../types/action.types';

export type SettingsActions = ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

const initialState = {
    rouletteDuration: 6,
    rouletteLaps: 3,
    rouletteWinnerDuration: 3,
    song: false,
    defaultUsers: [],
    colors: [],
    songUrl: '',
    imageUrl: '',
    imageWidth: 170,
    imageHeight: 170,
    imageBackgroundSize: 180,
    radioRoulette: 40,
    marginTextRoulette: 0,
};

const settingsReducer = (
    state: SettingsStateType = initialState,
    action: SettingsActions,
): SettingsStateType => {
    switch (action.type) {
        case SettingsTypes.SetInitialSettings:
            return {
                ...state,
                ...action.payload,
            };

        case SettingsTypes.ClearSettings:
            return initialState;

        case SettingsTypes.UpdateBasicSettings:
            return {
                ...state,
                ...action.payload,
            };

        case SettingsTypes.UpdateImageSettings:
            return {
                ...state,
                ...action.payload,
            };

        case SettingsTypes.UpdateImageUrl:
            return {
                ...state,
                imageUrl: action.payload,
            };

        case SettingsTypes.UpdateSongUrl:
            return {
                ...state,
                songUrl: action.payload,
            };

        case SettingsTypes.UpdateSongBool:
            return {
                ...state,
                song: action.payload,
            };

        case SettingsTypes.UpdateDefaultUsers:
            return {
                ...state,
                defaultUsers: action.payload,
            };

        case SettingsTypes.UpdateColors:
            return {
                ...state,
                colors: action.payload,
            };

        default:
            return state;
    }
};

export default settingsReducer;

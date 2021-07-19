import { ActionMap, AuthStateType } from '../types/state.types';
import { AuthPayload } from '../types/payload.types';
import { AuthTypes } from '../types/action.types';

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

const initialState = {
    logged: false,
    checking: true,
    verified: false,
    viewedNews: true,
    userId: '',
    twitchId: '',
    twitchName: '',
    twitchProfileImageUrl: '',
    rouletteToken: '',
};

const authReducer = (state: AuthStateType = initialState, action: AuthActions): AuthStateType => {
    switch (action.type) {
        case AuthTypes.Login:
            return {
                ...state,
                ...action.payload,
                checking: false,
                logged: true,
            };

        case AuthTypes.CheckingFinish:
            return {
                ...state,
                checking: false,
            };

        case AuthTypes.Logout:
            return {
                logged: false,
                checking: false,
                verified: false,
                viewedNews: true,
                twitchId: '',
                twitchName: '',
                twitchProfileImageUrl: '',
                rouletteToken: '',
            };

        case AuthTypes.SetRouletteToken:
            return {
                ...state,
                rouletteToken: action.payload,
            };

        case AuthTypes.VerifyAccount:
            return {
                ...state,
                verified: true,
            };

        case AuthTypes.SetViewedNews:
            return {
                ...state,
                viewedNews: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;

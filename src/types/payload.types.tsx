import { AuthTypes, RouletteTypes, SettingsTypes, UiTypes } from './action.types';
import { ISettings, ISettingsBasic } from '../interfaces/settings';
import { IRouletteBasic, IUser } from '../interfaces/roulette';

export type RoulettePayload = {
    [RouletteTypes.SetInitialRoulette]: IRouletteBasic;
    [RouletteTypes.SetUser]: IUser;
    [RouletteTypes.DeleteUser]: string;
    [RouletteTypes.DeleteAllUsers]: void;
    [RouletteTypes.SetResult]: {
        winner: string;
        uid: string;
    };
    [RouletteTypes.ClearResults]: void;
    [RouletteTypes.SetWinnerObject]: {
        text: string;
        fillStyle: string;
    };
    [RouletteTypes.SetActiveWinner]: boolean;
    [RouletteTypes.SetSpinning]: boolean;
    [RouletteTypes.SetDefaultRouletteActive]: boolean;
    [RouletteTypes.IncrementColorIndex]: void;
    [RouletteTypes.ResetColorIndex]: void;
    [RouletteTypes.SetSubMode]: boolean;
};

export type AuthPayload = {
    [AuthTypes.Login]: {
        userId: string;
        twitchId: string;
        twitchName: string;
        twitchProfileImageUrl: string;
        rouletteToken: string;
    };
    [AuthTypes.CheckingFinish]: void;
    [AuthTypes.Logout]: void;
    [AuthTypes.SetRouletteToken]: string;
    [AuthTypes.VerifyAccount]: void;
};

export type SettingsPayload = {
    [SettingsTypes.SetInitialSettings]: ISettings;
    [SettingsTypes.ClearSettings]: void;
    [SettingsTypes.UpdateBasicSettings]: ISettingsBasic;
    [SettingsTypes.UpdateImageUrl]: string;
    [SettingsTypes.UpdateSongUrl]: string;
    [SettingsTypes.UpdateSongBool]: boolean;
    [SettingsTypes.UpdateDefaultUsers]: Array<string>;
    [SettingsTypes.UpdateColors]: Array<string>;
};

export type UiPayload = {
    [UiTypes.FinishLoadingRouletteChecking]: boolean;
    [UiTypes.SetErrorRouletteChecking]: void;
};

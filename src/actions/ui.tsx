import { UiTypes } from '../types/action.types';
import {
    IFinishLoadingRouletteCheckingActionResponse,
    ISetErrorRouletteCheckingActionResponse,
} from '../interfaces/uiActions';

export const finishLoadingRouletteCheckingAction = (): IFinishLoadingRouletteCheckingActionResponse => ({
    type: UiTypes.FinishLoadingRouletteChecking,
});

export const setErrorRouletteCheckingAction = (): ISetErrorRouletteCheckingActionResponse => ({
    type: UiTypes.SetErrorRouletteChecking,
});

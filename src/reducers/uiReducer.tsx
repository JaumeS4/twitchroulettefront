import { ActionMap, UiStateType } from '../types/state.types';
import { UiPayload } from '../types/payload.types';
import { UiTypes } from '../types/action.types';

export type UiActions = ActionMap<UiPayload>[keyof ActionMap<UiPayload>];

const initialState = {
    loadingRouletteChecking: true,
    errorRouletteChecking: null,
};

const uiReducer = (state: UiStateType = initialState, action: UiActions): UiStateType => {
    switch (action.type) {
        case UiTypes.FinishLoadingRouletteChecking:
            return {
                ...state,
                loadingRouletteChecking: false,
            };

        case UiTypes.SetErrorRouletteChecking:
            return {
                ...state,
                errorRouletteChecking: true,
            };

        default:
            return state;
    }
};

export default uiReducer;

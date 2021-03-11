import { ActionMap, RouletteStateType } from '../types/state.types';
import { RoulettePayload } from '../types/payload.types';
import { RouletteTypes } from '../types/action.types';

export type NewRouletteActions = ActionMap<RoulettePayload>[keyof ActionMap<RoulettePayload>];

const initialState = {
    users: [],
    results: [],
    winnerObject: {
        text: '',
        fillStyle: '',
    },
    activeWinner: false,
    spinning: false,
    defaultRouletteActive: true,
    colorIndex: 0,
    subMode: false,
    followMode: true,
};

const rouletteReducer = (
    state: RouletteStateType = initialState,
    action: NewRouletteActions,
): RouletteStateType => {
    switch (action.type) {
        case RouletteTypes.SetInitialRoulette:
            return {
                ...state,
                ...action.payload,
            };

        case RouletteTypes.SetSpinning:
            return {
                ...state,
                spinning: action.payload,
            };

        case RouletteTypes.SetActiveWinner:
            return {
                ...state,
                activeWinner: action.payload,
            };

        case RouletteTypes.SetWinnerObject:
            return {
                ...state,
                winnerObject: {
                    text: action.payload.text,
                    fillStyle: action.payload.fillStyle,
                },
            };

        case RouletteTypes.SetUser:
            return {
                ...state,
                users: [
                    ...state.users,
                    {
                        name: action.payload.name,
                        uid: action.payload.uid,
                        fromMod: action.payload.fromMod,
                    },
                ],
            };

        case RouletteTypes.SetResult:
            return {
                ...state,
                results: [
                    ...state.results,
                    { winner: action.payload.winner, uid: action.payload.uid },
                ],
            };

        case RouletteTypes.ClearResults:
            return {
                ...state,
                results: [],
            };

        case RouletteTypes.DeleteUser:
            return {
                ...state,
                users: state.users.filter((user) => user.uid !== action.payload),
            };

        case RouletteTypes.DeleteAllUsers:
            return {
                ...state,
                users: [],
            };

        case RouletteTypes.IncrementColorIndex:
            return {
                ...state,
                colorIndex: state.colorIndex + 1,
            };

        case RouletteTypes.ResetColorIndex:
            return {
                ...state,
                colorIndex: 0,
            };

        case RouletteTypes.SetDefaultRouletteActive:
            return {
                ...state,
                defaultRouletteActive: action.payload,
            };

        case RouletteTypes.SetSubMode:
            return {
                ...state,
                subMode: action.payload,
            };

        default:
            return state;
    }
};

export default rouletteReducer;

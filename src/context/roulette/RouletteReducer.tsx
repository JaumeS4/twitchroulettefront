import RouletteTypes from '../../types';

export type RouletteActions = ActionMap<RoulettePayload>[keyof ActionMap<RoulettePayload>];

const rouletteReducer = (state: RouletteStateType, action: RouletteActions): RouletteStateType => {
    switch (action.type) {
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

        case RouletteTypes.SetResult:
            return {
                ...state,
                results: [
                    ...state.results,
                    { result: action.payload.result, index: state.results.length + 1 },
                ],
            };

        case RouletteTypes.SetUser:
            return {
                ...state,
                users: [...state.users, { name: action.payload.name, uid: action.payload.uid }],
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

        default:
            return state;
    }
};

export default rouletteReducer;

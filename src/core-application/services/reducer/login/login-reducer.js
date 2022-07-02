
import { loginInitialState } from "core-application/services/reducer/login/initial-state";

export const loginReducer = (state, { name, type, payload }) => {
    switch (type) {
        case "updateLoginState":
            return {
                ...state,
                [name]: payload
            };
        case "revertLoginState":
            return { ...loginInitialState };
        default:
            return state;
    }
};

import { configInitialState } from "core-application/services/reducer/config/initial-state.js";
export const configReducer = (state, { name, type, payload }) => {
    switch (type) {
        case "updateConfigState":
            return {
                ...state,
                [name]: payload,
            };
        case "revertConfigState":
            return { ...configInitialState };
        default:
            return state;
    }
};
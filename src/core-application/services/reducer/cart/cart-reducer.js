

export const cartReducer = (state, { name, type, payload, id }) => {
    switch (type) {
        case "updateCartState":
            return [
                ...state,
                payload
            ];
        case "removeFromCartState":
            return [...state.filter((item) => item.id !== id)];
        case "revertCartState":
            return [];
        default:
            return state;
    }
};
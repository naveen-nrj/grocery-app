import { loginReducer } from "core-application/services/reducer/login/login-reducer";
import { loginInitialState } from "core-application/services/reducer/login/initial-state";
import { cartReducer } from "core-application/services/reducer/cart/cart-reducer";
import { cartInitialState } from "core-application/services/reducer/cart/initial-state";
import { configInitialState } from "core-application/services/reducer/config/initial-state";
import { configReducer } from "core-application/services/reducer/config/config-reducer";

export const initialState = {
    login: loginInitialState,
    cart: cartInitialState,
    config: configInitialState
};
// Global merged reducers of the application
export const RootReducer = (
    {
        login,
        cart,
        config
    },
    action
) => ({
    login: loginReducer(login, action),
    cart: cartReducer(cart, action),
    config: configReducer(config, action),

});

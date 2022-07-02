import React, { createContext, useContext, useReducer } from "react";

// Create store context
export const StateContext = createContext();
// Provider Component with initial state and reducers
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
// Use as Consumer for FC with hooks
export const useStateValue = () => useContext(StateContext);

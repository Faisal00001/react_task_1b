// GlobalProvider.js
import React, { useReducer } from "react";

// Create global context
export const GlobalContext = React.createContext();

// Define initial state for global context
const initialState = {
    globalMessage: "", // Holds the message to be displayed
    isOpen: true,
    path: "",
};

// Define reducer function for global context
const reducer = (state, action) => {
    switch (action.type) {
        case "SNACKBAR":
            // Update global message
            return {
                ...state,
                globalMessage: action.payload.message,
            };
        case "SETPATH":
            // Update path
            return {
                ...state,
                path: action.payload.path,
            };
        case "OPEN_SIDEBAR":
            // Update sidebar status
            return {
                ...state,
                isOpen: action.payload.isOpen,
            };
        default:
            return state;
    }
};

// Function to show toast message
export const showToast = (dispatch, message, timeout = 3000) => {
    // Dispatch action to set global message
    dispatch({
        type: "SNACKBAR",
        payload: {
            message,
        },
    });

    // Clear message after timeout
    setTimeout(() => {
        dispatch({
            type: "SNACKBAR",
            payload: {
                message: "",
            },
        });
    }, timeout);
};

// Define global provider component
const GlobalProvider = ({ children }) => {
    // Use reducer to manage state
    const [state, dispatch] = useReducer(reducer, initialState);

    // Provide global state and dispatch function to children
    return (
        <GlobalContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;

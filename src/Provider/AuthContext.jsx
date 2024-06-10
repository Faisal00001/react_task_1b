import React, { useReducer } from "react";
import MkdSDK from "../utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    role: null,
};

const reducer = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            //TODO
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
    const role = localStorage.getItem("role");
    if (errorMessage === "TOKEN_EXPIRED") {
        dispatch({
            type: "Logout",
        });
        window.location.href = "/" + role + "/login";
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    React.useEffect(() => {
        //TODO
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        const role = localStorage.getItem("role");

        if (token && user && role) {

            // Check if token is still valid using SDK or any other method
            sdk.check(role).then((response) => {
                console.log(response)
                if (response === true) {

                    dispatch({
                        type: "LOGIN",
                        payload: {
                            user,
                            token,
                            role,
                        },
                    });
                } else {
                    // If token is expired or invalid, log the user out
                    dispatch({ type: "LOGOUT" });
                    // Redirect to login page
                    window.location.href = "/" + role + "/login";
                }
            }).catch((error) => {
                console.error("Error checking token:", error);
                // Handle error or log out user if unable to check token
                dispatch({ type: "LOGOUT" });
                // Redirect to login page
                window.location.href = "/" + role + "/login";
            });
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

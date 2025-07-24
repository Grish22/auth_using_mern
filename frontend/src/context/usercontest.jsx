import React from "react";
import { useContext } from "react";
import { createContext } from "react";
export const UserContext = createContext({
    user: null,
    isLoggedIn: false,
    setUserfunc: () => {},
    setIsLoggedInfunc: () => {},
});
export const UserProvider = UserContext.Provider;
export default function UseContext() {
    return useContext(UserContext);
}

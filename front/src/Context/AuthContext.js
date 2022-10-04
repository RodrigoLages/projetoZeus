import { createContext, useState } from "react";

const Context = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    return (
        <Context.Provider value={{ token, setToken }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };
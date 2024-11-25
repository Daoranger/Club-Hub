import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState("");

    return (
        <UserContext.Provider value={{ user: userName, setUser: setUserName }}>
          {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider }
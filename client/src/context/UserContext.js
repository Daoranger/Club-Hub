import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userID, setUserID] = useState("");
    const [userName, setUserName] = useState("");

    return (
        <UserContext.Provider value={{
          userID: userID, setUserID: setUserID,
          userName: userName, setUserName: setUserName
          }}>
          {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider }
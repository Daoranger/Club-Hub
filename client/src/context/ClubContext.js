import { createContext, useState, useContext } from "react";

const ClubContext = createContext(null);

const ClubProvider = ({ children }) => {
  const [clubID, setClubID] = useState("");
  const [clubName, setClubName] = useState("");

  return (
    <ClubContext.Provider
      value={{
        clubID: clubID,
        setClubID: setClubID,
        clubName: clubName,
        setClubName: setClubName,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

function useClubContext() {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error("useClubContext must be used within a ClubProvider");
  }
  return context;
}

export { ClubProvider, useClubContext };

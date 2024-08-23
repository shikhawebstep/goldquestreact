import React, { createContext, useContext, useState } from "react";

// Create the context
const ClientManagementContext = createContext();

// Custom hook to use the ClientManagementContext
export const useClient = () => useContext(ClientManagementContext);

// Provider component
export const ClientProvider = ({ children }) => {
  const [clientData, setClientData] = useState([]);
  return (
    <ClientManagementContext.Provider value={{ clientData, setClientData ,}}>
      {children}
    </ClientManagementContext.Provider>
  );
};

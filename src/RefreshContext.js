import React, { createContext, useContext } from 'react';

const RefreshContext = createContext();

export const useRefresh = () => {
    return useContext(RefreshContext);
};

export const RefreshProvider = ({ children }) => {
    const refreshPage = () => {
        window.location.reload();
        alert('refreshed')
    };

    return (
        <RefreshContext.Provider value={refreshPage}>
            {children}
        </RefreshContext.Provider>
    );
};

import React, { createContext, useState, useContext } from 'react';

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);

    const editPackage = (pkg) => {
        setSelectedPackage(pkg);
    };

    

    return (
        <PackageContext.Provider value={{ selectedPackage, editPackage }}>
            {children}
        </PackageContext.Provider>
    );
};

export const usePackage = () => useContext(PackageContext);

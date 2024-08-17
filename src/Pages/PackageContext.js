import React, { createContext, useState, useContext } from 'react';

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [packageList, setPackageList] = useState([]); // Store package list

    const editPackage = (pkg) => {
        setSelectedPackage(pkg);
    };

    const updatePackageList = (newList) => {
        setPackageList(newList);
    };

    return (
        <PackageContext.Provider value={{ selectedPackage, editPackage, packageList, updatePackageList }}>
            {children}
        </PackageContext.Provider>
    );
};

export const usePackage = () => useContext(PackageContext);

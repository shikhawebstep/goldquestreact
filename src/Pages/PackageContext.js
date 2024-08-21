import React, { createContext, useState, useContext } from 'react';

const PackageContext = createContext();

export const usePackage = () => useContext(PackageContext);

export const PackageProvider = ({ children }) => {
    const [packageList, setPackageList] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const updatePackageList = (updatedPackages) => {
        setPackageList(updatedPackages);
    };

    const editPackage = (pkg) => {
        setSelectedPackage(pkg);
    };

    const clearSelectedPackage = () => {
        setSelectedPackage(null);
    };

    return (
        <PackageContext.Provider
            value={{
                packageList,
                selectedPackage,
                updatePackageList,
                editPackage,
                clearSelectedPackage
            }}
        >
            {children}
        </PackageContext.Provider>
    );
};

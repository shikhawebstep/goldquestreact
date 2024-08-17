import React, { createContext, useState, useContext } from 'react';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
    const [selectedService, setSelectedService] = useState(null);// Store Service list
    const [ServiceList, setServiceList] = useState([]); // Store package list

    const editService = (pkg) => {
        setSelectedService(pkg);
    };

    const updateServiceList = (newList) => {
        setServiceList(newList);
    };

    return (
        <ServiceContext.Provider value={{ selectedService, editService, ServiceList, updateServiceList }}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useService = () => useContext(ServiceContext);

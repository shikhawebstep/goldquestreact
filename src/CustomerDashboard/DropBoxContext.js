import React, { createContext, useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import { useApi } from '../ApiContext';

const DropBoxContext = createContext();

export const DropBoxProvider = ({ children }) => {
    const API_URL = useApi();
    const [services, setServices] = useState([]);
    const [uniquePackages, setUniquePackages] = useState([]);
    const [listData, setListData] = useState([]);
    const [selectedDropBox, setSelectedDropBox] = useState(null);

    const getLocalStorageItem = (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    };

    const branch_id = getLocalStorageItem("branch")?.id;
    const storedBranchData = getLocalStorageItem("branch")?.customer_id;
    const _token = localStorage.getItem("branch_token");

    const handleEditDrop = (pkg) => {
        setSelectedDropBox(pkg);
    };
   console.log(storedBranchData)
    const fetchServices = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/branch/customer-info?customer_id=${storedBranchData}&branch_id=${branch_id}&branch_token=${_token}`, {
                method: "GET",
                redirect: "follow"
            });

            if (!response.ok) {
                const errorData = await response.json();
                Swal.fire('Error!', `An error occurred: ${errorData.message}`, 'error');
                return;
            }

            const data = await response.json();

            if (data.customers.length > 0) {
                const customer = data.customers[0];
                const parsedServices = customer.services ? JSON.parse(customer.services) : [];
                setServices(parsedServices);

                const packageSet = new Set();
                const uniquePackagesList = [];

                parsedServices.forEach(service => {
                    Object.keys(service.packages).forEach(packageId => {
                        if (!packageSet.has(packageId)) {
                            packageSet.add(packageId);
                            uniquePackagesList.push({ id: packageId, name: service.packages[packageId] });
                        }
                    });
                });

                setUniquePackages(uniquePackagesList);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            Swal.fire('Error!', 'An unexpected error occurred.', 'error');
        }
    }, [branch_id, _token, storedBranchData]);

 
    const fetchClient = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/branch/candidate-application/list?branch_id=${branch_id}&_token=${_token}`, {
                method: "GET",
                redirect: "follow"
            });

            if (!response.ok) {
                const errorData = await response.json();
                Swal.fire('Error!', `An error occurred: ${errorData.message}`, 'error');
                return;
            }

            const data = await response.json();
            const newToken = data?._token || data?.token;
            if (newToken) {
                localStorage.setItem("_token", newToken);
            }
            setListData(data.candidateApplications || []);
        } catch (error) {
            Swal.fire('Error!', 'An unexpected error occurred.', 'error');
        }
    }, [branch_id, _token]);

    const fetchClientDrop = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/branch/client-application/list?branch_id=${branch_id}&_token=${_token}`, {
                method: "GET",
                redirect: "follow"
            });

            if (!response.ok) {
                const errorData = await response.json();
                Swal.fire('Error!', `An error occurred: ${errorData.message}`, 'error');
                return;
            }

            const data = await response.json();
            const newToken = data?._token || data?.token;
            if (newToken) {
                localStorage.setItem("_token", newToken);
            }
            setListData(data.clientApplications || []);
        } catch (error) {
            Swal.fire('Error!', 'An unexpected error occurred.', 'error');
        }
    }, [branch_id, _token]);
    useEffect(() => {
        fetchServices();
        fetchClientDrop();
        fetchClient();

    }, [fetchServices,fetchClientDrop,fetchClient]);

    return (
        <DropBoxContext.Provider value={{ services, fetchClient, fetchClientDrop, uniquePackages, handleEditDrop, setServices, listData, setListData, selectedDropBox, setSelectedDropBox, setUniquePackages }}>
            {children}
        </DropBoxContext.Provider>
    );
};

export default DropBoxContext;

import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const DropBoxContext = createContext();

export const DropBoxProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [uniquePackages, setUniquePackages] = useState([]);

    const branchData = localStorage.getItem("branch");
    const branch_id = branchData ? JSON.parse(branchData)?.id : null;
    const storedBranchData = branchData ? JSON.parse(branchData)?.customer_id : null;

    const _token = localStorage.getItem("branch_token");
    const [selectedDropBox, setSelectedDropBox] = useState(null);
    const handleEditDrop = (pkg) => {
        setSelectedDropBox(pkg);
    };
 
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`https://goldquestreact.onrender.com/branch/customer-info?customer_id=${storedBranchData}&branch_id=${branch_id}&branch_token=${_token}`, {
                    method: "GET",
                    redirect: "follow"
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    Swal.fire(
                        'Error!',
                        `An error occurred: ${errorData.message}`,
                        'error'
                    );
                    return;
                }

                const data = await response.json();
                console.log('Fetched Data:', data); 

                if (data.customers.length > 0) {
                    const customer = data.customers[0];
                    const parsedServices = customer.services ? JSON.parse(customer.services) : [];
                    console.log('Parsed Services:', parsedServices); 
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

                    console.log('Unique Packages:', uniquePackagesList); 
                    setUniquePackages(uniquePackagesList);
                }
            } catch (error) {
                console.error('Fetch Error:', error); 
                Swal.fire(
                    'Error!',
                    'An unexpected error occurred.',
                    'error'
                );
            }
        };
        if (storedBranchData !== null && storedBranchData !== undefined) {
            fetchServices();
        }
        
    }, [branch_id, _token, storedBranchData]);

    return (
        <DropBoxContext.Provider value={{ services, uniquePackages, handleEditDrop, setServices, selectedDropBox, setSelectedDropBox, setUniquePackages }}>
            {children}
        </DropBoxContext.Provider>
    );
};

export default DropBoxContext;

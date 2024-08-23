import React, { useEffect, useState, useContext, useCallback } from 'react';
import PaginationContext from './PaginationContext';
import Pagination from './Pagination';
import Multiselect from 'multiselect-react-dropdown';

const ClientManagementData = () => {
    const [selectedValue, setSelectedValue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState([]);
    const [packageList, setPackageList] = useState([]);
    const [mergedData, setMergedData] = useState([]);
    const [paginated, setPaginated] = useState([]);
    const [error, setError] = useState(null);
    const { setTotalResults, currentItem, showPerPage } = useContext(PaginationContext);

    const fetchServices = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
            const storedToken = localStorage.getItem("_token");
            const queryParams = new URLSearchParams({
                admin_id: admin_id || '',
                _token: storedToken || ''
            }).toString();
            const res = await fetch(`https://goldquestreact.onrender.com/service/list?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Network response was not ok: ${res.status} ${errorText}`);
            }
            const result = await res.json();
            console.log('Fetched services:', result); // Log the response
            if (!result || !Array.isArray(result.services)) {
                throw new Error('Invalid response format');
            }
            const processedServices = (result.services || []).map((item, index) => ({
                ...item,
                index: index + 1,
                service_name: item.title,
                service_id: item.id,
            }));
            setService(processedServices);
        } catch (error) {
            console.error("Error fetching services:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);


    const fetchPackage = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
            const storedToken = localStorage.getItem("_token");
            if (!storedToken) {
                throw new Error('No token found in local storage');
            }

            const queryParams = new URLSearchParams({
                admin_id: admin_id || '',
                _token: storedToken || '',
            }).toString();
            const res = await fetch(`https://goldquestreact.onrender.com/package/list?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Network response was not ok: ${res.status} ${errorText}`);
            }

            const result = await res.json();

            const processedPackages = (result.packages || []).map((item) => ({
                ...item,
                service_id: item.id, 
            }));
            console.log('Fetched packages', result.packages);
            setPackageList(processedPackages);
        } catch (error) {
            console.error("Error fetching packages:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const mergeServiceWithPackage = useCallback(() => {
        const merged = service.map(serviceItem => {
            if (!serviceItem || !serviceItem.id) {
                console.error('Service item is missing or undefined:', serviceItem);
                return serviceItem;
            }

            const relatedPackages = packageList.filter(pkg => {
                return pkg.id === serviceItem.id;
            });
            console.log(relatedPackages);
            console.log(`Service: ${serviceItem.service_name}`, 'Related Packages:', relatedPackages);

            return {
                ...serviceItem,
                packages: relatedPackages
            };
        });

        setMergedData(merged);
        console.log('Merged Data:', merged);
    }, [service, packageList]);


    useEffect(() => {
        fetchServices();
        fetchPackage();
    }, [fetchServices, fetchPackage]);

    useEffect(() => {
        if (service.length > 0 && packageList.length > 0) {
            mergeServiceWithPackage();
        }
    }, [service, packageList, mergeServiceWithPackage]);

    useEffect(() => {
        setTotalResults(mergedData.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(mergedData.slice(startIndex, endIndex));
    }, [currentItem, showPerPage, mergedData, setTotalResults]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const onSelect = (selectedList, selectedItem) => {
        console.log('Selected:', selectedList, selectedItem);
        setSelectedValue(selectedList);
    };

    const onRemove = (selectedList, removedItem) => {
        console.log('Removed:', selectedList, removedItem);
        setSelectedValue(selectedList);
    };

    return (
        <div className="overflow-x-auto py-6 px-4 bg-white mt-10 md:w-9/12 m-auto">
            <table className="min-w-full">
                <thead>
                    <tr className='bg-green-500'>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Service Name</th>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Price</th>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Select Package</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((item, index) => (
                        <tr key={index}>
                            <td className="py-3 px-4 border-l border-r border-b whitespace-nowrap">
                                <input type="checkbox" className='me-2' />
                                {item.title}
                            </td>
                            <td className="py-3 px-4 border-r border-b whitespace-nowrap">
                                <input type="number" name="" id="" className='outline-none' />
                            </td>
                            <td className="py-3 px-4 border-r border-b whitespace-nowrap uppercase text-left">
                                <Multiselect
                                    options={item.packages.map(pkg => ({ name: pkg.title, id: pkg.id }))}
                                    selectedValues={selectedValue}
                                    onSelect={onSelect}
                                    onRemove={onRemove}
                                    displayValue="name"
                                    displayId="id"
                                />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
}

export default ClientManagementData;

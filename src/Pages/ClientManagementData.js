import React, { useEffect, useState, useContext, useCallback } from 'react';
import PaginationContext from './PaginationContext';
import Pagination from './Pagination';
import Multiselect from 'multiselect-react-dropdown';
import { useClient } from './ClientManagementContext';

const ClientManagementData = () => {
    const { setClientData, validationsErrors, setValidationsErrors } = useClient();
    const [service, setService] = useState([]);
    const [packageList, setPackageList] = useState([]);
    const [paginated, setPaginated] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPackages, setSelectedPackages] = useState({});
    const [priceData, setPriceData] = useState({});
    const { setTotalResults, currentItem, showPerPage } = useContext(PaginationContext);

    const fetchServices = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
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
            if (!result || !Array.isArray(result.services)) {
                throw new Error('Invalid response format');
            }
            const processedServices = (result.services || []).map((item) => ({
                ...item,
                service_name: item.title,
                service_id: item.id,
                service_title: item.title,
                price: '', // Initialize price
                selectedPackages: [] // Initialize selected packages
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
            setPackageList(processedPackages);
        } catch (error) {
            console.error("Error fetching packages:", error);
            setError(error.message);
        }
    }, []);

    useEffect(() => {
        fetchServices();
        fetchPackage();
    }, [fetchServices, fetchPackage]);

    const validateServices = () => {
        const errors = {};
        service.forEach((item, index) => {
            const selectedPackageCount = (selectedPackages[index] || []).length;
            const enteredPrice = priceData[index]?.price;

            if (selectedPackageCount > 0 && !enteredPrice) {
                errors[index] = errors[index] || {};
                errors[index].price = 'Please enter a price if a package is selected';
            }

            if (enteredPrice && selectedPackageCount === 0) {
                errors[index] = errors[index] || {};
                errors[index].packages = 'Please select at least one package if a price is entered';
            }
        });
        setValidationsErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        const updatedServiceData = service.map((item, index) => {
            const packages = (selectedPackages[index] || []).reduce((acc, pkgId) => {
                const pkg = packageList.find(p => p.id === pkgId);
                if (pkg) {
                    acc[pkg.id] = pkg.title;
                }
                return acc;
            }, {});

            return {
                serviceId: item.service_id,
                serviceTitle: item.title,
                price: priceData[index]?.price || '',
                packages: packages,
            };
        });

        setClientData(updatedServiceData);
        setValidationsErrors(validateServices);
        setTotalResults(updatedServiceData.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(updatedServiceData.slice(startIndex, endIndex));
    }, [currentItem, showPerPage, service, selectedPackages, priceData, setTotalResults, setClientData, packageList]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handlePackageSelect = (selectedList, rowIndex) => {
        const updatedPackages = selectedList.map(item => item.id);
        setSelectedPackages(prev => ({
            ...prev,
            [rowIndex]: updatedPackages,
        }));

        setService(prevService => {
            const updatedService = [...prevService];
            updatedService[rowIndex].selectedPackages = updatedPackages;
            return updatedService;
        });
    };

    const handlePackageRemove = (selectedList, rowIndex) => {
        const updatedPackages = selectedList.map(item => item.id);
        setSelectedPackages(prev => ({
            ...prev,
            [rowIndex]: updatedPackages,
        }));

        setService(prevService => {
            const updatedService = [...prevService];
            updatedService[rowIndex].selectedPackages = updatedPackages;
            return updatedService;
        });
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setPriceData(prev => ({
            ...prev,
            [index]: {
                ...prev[index],
                [name]: value
            }
        }));
        setService(prevService => {
            const updatedService = [...prevService];
            updatedService[index].price = value;
            return updatedService;
        });
    };

    return (
        <div className="overflow-x-auto py-6 px-0 bg-white mt-10 m-auto">
            <table className="min-w-full">
                <thead>
                    <tr className='bg-green-500'>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Service Name</th>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Price</th>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Select Package</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.length > 0 ? (
                        paginated.map((item, index) => (
                            <tr key={index}>
                                <td className="py-3 px-4 border-l border-r border-b whitespace-nowrap">
                                    <input type="checkbox" className='me-2' />
                                    {item.serviceTitle}
                                </td>
                                <td className="py-3 px-4 border-r border-b whitespace-nowrap">
                                    <input
                                        type="number"
                                        name="price"
                                        value={priceData[index]?.price || ''}
                                        onChange={(e) => handleChange(e, index)}
                                        className='outline-none'
                                    />
                                    {validationsErrors[index]?.price && <span className="text-red-500">{validationsErrors[index].price}</span>}
                                </td>
                                <td className="py-3 px-4 border-r border-b whitespace-nowrap uppercase text-left">
                                    <Multiselect
                                        options={packageList.map(pkg => ({ name: pkg.title, id: pkg.id }))}
                                        selectedValues={packageList
                                            .filter(pkg => (selectedPackages[index] || []).includes(pkg.id))
                                            .map(pkg => ({ name: pkg.title, id: pkg.id }))}
                                        onSelect={(selectedList) => handlePackageSelect(selectedList, index)}
                                        onRemove={(selectedList) => handlePackageRemove(selectedList, index)}
                                        displayValue="name"
                                        className='text-left'
                                    />
                                    {validationsErrors[index]?.packages && <span className="text-red-500">{validationsErrors[index].packages}</span>}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className='flex items-center mt-5 justify-center w-full text-center'>No Data Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {paginated.length > 0 && <Pagination />}
        </div>
    );
};

export default ClientManagementData;

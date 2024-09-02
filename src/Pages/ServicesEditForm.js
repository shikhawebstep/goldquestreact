import React, { useState, useEffect, useCallback } from 'react';
import Multiselect from 'multiselect-react-dropdown';

const ServicesEditForm = () => {
    const [serviceList, setServiceList] = useState([]);
    const [packageList, setPackageList] = useState([]);
    const [priceData, setPriceData] = useState([]);
    const [selectedPackages, setSelectedPackages] = useState([]);

    // Fetch data function
    const fetchData = useCallback(async () => {
        try {
            const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
            const storedToken = localStorage.getItem("_token");
            if (!storedToken) {
                throw new Error('No token found in local storage');
            }
            const queryParams = new URLSearchParams({
                admin_id: admin_id || '',
                _token: storedToken || '',
            }).toString();

            // Fetch services
            const serviceRes = await fetch(`https://goldquestreact.onrender.com/service/list?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!serviceRes.ok) {
                const errorText = await serviceRes.text();
                throw new Error(`Network response for services was not ok: ${serviceRes.status} ${errorText}`);
            }
            const serviceResult = await serviceRes.json();
            if (!serviceResult || !Array.isArray(serviceResult.services)) {
                throw new Error('Invalid service response format');
            }
            const processedServices = (serviceResult.services || []).map((item) => ({
                ...item,
                service_name: item.title,
                service_id: item.id,
                service_title: item.title,
                price: '', // Initialize price
                selectedPackages: [] // Initialize selected packages
            }));
            setServiceList(processedServices);

            // Fetch packages
            const packageRes = await fetch(`https://goldquestreact.onrender.com/package/list?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!packageRes.ok) {
                const errorText = await packageRes.text();
                throw new Error(`Network response for packages was not ok: ${packageRes.status} ${errorText}`);
            }
            const packageResult = await packageRes.json();
            const processedPackages = (packageResult.packages || []).map((item) => ({
                ...item,
                service_id: item.id,
            }));
            setPackageList(processedPackages);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handle price change
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setPriceData(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
            return updated;
        });
    };

    // Handle package selection
    const handlePackageSelect = (selectedList, index) => {
        const selectedIds = selectedList.map(pkg => pkg.id);
        setSelectedPackages(prev => {
            const updated = [...prev];
            updated[index] = selectedIds;
            return updated;
        });
    };

    // Handle package removal
    const handlePackageRemove = (selectedList, index) => {
        const selectedIds = selectedList.map(pkg => pkg.id);
        setSelectedPackages(prev => {
            const updated = [...prev];
            updated[index] = selectedIds;
            return updated;
        });
    };

    return (
        <>   <h2 className='text-2xl mb-3'>Services:</h2>
            <table className='min-w-full'>
                <thead>
                    <tr className='bg-green-500'>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Service Name</th>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Price</th>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Select Package</th>
                    </tr>
                </thead>    <tbody>
                    {serviceList.map((item, index) => (
                        <tr  key={item.service_id}>
                            <td className='py-3 px-4 border-l border-r border-b whitespace-nowrap'>
                                <div className="flex mb-3">
                                    <input type="checkbox" className='me-2' id={item.id} />
                                    {item.title}
                                </div>
                            </td>
                            <td className='py-3 px-4 border-l border-r border-b whitespace-nowrap'>
                                <div className="mb-3 flex items-center gap-2">
                                    <label htmlFor="">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={priceData[index]?.price || ''}
                                        onChange={(e) => handleChange(e, index)}
                                        className="border w-full rounded-md p-2 mt-2 outline-none"
                                    />
                                </div>
                            </td>
                            <td className='py-3 px-4 border-l border-r border-b whitespace-nowrap'>

                                <Multiselect
                                    options={packageList.map((pkg) => ({ name: pkg.title, id: pkg.id }))}
                                    selectedValues={packageList
                                        .filter(pkg => (selectedPackages[index] || []).includes(pkg.id))
                                        .map(pkg => ({ name: pkg.title, id: pkg.id }))}
                                    onSelect={(selectedList) => handlePackageSelect(selectedList, index)}
                                    onRemove={(selectedList) => handlePackageRemove(selectedList, index)}
                                    displayValue="name"
                                    className='text-left'
                                />
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ServicesEditForm;

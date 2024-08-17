import React, { useEffect, useState, useContext, useCallback } from 'react';
import PaginationContext from './PaginationContext';
import Pagination from './Pagination';
import { useService } from './ServiceContext';

const ServiceList = () => {
    const { setTotalResults, currentItem, showPerPage } = useContext(PaginationContext);

    const [data, setData] = useState([]);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginated, setPaginated] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { editService } = useService();
    const fetchData = useCallback(async () => {
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
                throw new Error('Network response was not ok');
            }

            const result = await res.json();
            console.log('Fetched services data:', result);

            const processedData = (result.services || []).map((item, index) => ({
                ...item,
                index: index + 1,
                title: item.title,
                description: item.description,
                id: item.id,
                package_id: item.package_id
            }));

            setData(processedData);
            setTotalResults(processedData.length);
            setTotalPages(Math.ceil(processedData.length / showPerPage));
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    }, [setTotalResults, showPerPage]);

    const fetchPackageData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
            const storedToken = localStorage.getItem("_token");

            const queryParams = new URLSearchParams({
                admin_id: admin_id || '',
                _token: storedToken || ''
            }).toString();

            const res = await fetch(`https://goldquestreact.onrender.com/package/list?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await res.json();
            console.log('Fetched packages data:', result);
            setPackages(result.packages || []);
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        fetchPackageData();
    }, [fetchData, fetchPackageData]);

    useEffect(() => {
        console.log('Packages data:', packages);

        const startIndex = (currentPage - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        const paginatedData = data.slice(startIndex, endIndex).map(service => {
            console.log('service.package_id:', service.package_id);
            const servicePackage = packages.find(pkg => String(pkg.id) === String(service.package_id));
            console.log('servicePackage:', servicePackage);
            return {
                ...service,
                packageTitle: servicePackage ? servicePackage.title : 'N/A'
            };
        });
        setPaginated(paginatedData);
    }, [currentPage, showPerPage, data, packages]);
    const handleEditService = ((service) => {
        editService(service);
        console.log('editing service:', service);
    })
    return (
        <div className='overflow-auto'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <table className="min-w-full">
                <thead>
                    <tr className='bg-green-500'>
                        <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">SL</th>
                        <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Service Name</th>
                        <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Service Description</th>
                        <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Package</th>
                        <th className="py-2 px-4 text-white border-r border-b text-center uppercase whitespace-nowrap">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((item) => (
                        <tr key={item.index}>
                            <td className="py-2 px-4 border-l border-r border-b whitespace-nowrap">{item.index}</td>
                            <td className="py-2 px-4 border-r border-b whitespace-nowrap">{item.title}</td>
                            <td className="py-2 px-4 border-r border-b whitespace-nowrap">{item.description}</td>
                            <td className="py-2 px-4 border-r border-b whitespace-nowrap">{item.packageTitle}</td>
                            <td className="py-2 px-4 border-r border-b whitespace-nowrap text-center">
                                <button className='bg-green-500 rounded-md hover:bg-green-200 p-2 text-white' onClick={(() => { handleEditService(item) })}>Edit</button>
                                <button className='bg-red-600 rounded-md p-2 text-white ms-2'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default ServiceList;

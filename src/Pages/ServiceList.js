import React, { useEffect, useState, useContext, useCallback } from 'react';
import PaginationContext from './PaginationContext';

const ServiceList = () => {
    const { setTotalResults, currentItem, showPerPage } = useContext(PaginationContext);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginated, setPaginated] = useState([]);

    const fetchData = useCallback(() => {
        setLoading(true);
        setError(null);
        const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
        const storedToken = localStorage.getItem("_token");
        const queryParams = new URLSearchParams({
            admin_id: admin_id || '',
            _token: storedToken || ''
        }).toString();

        fetch(`https://goldquestreact.onrender.com/service/list?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }).then((data) => {
            console.log('fetched data:', data);
            setData(data.services || []);
            setTotalResults(data.services.length);
        }).catch((error) => {
            console.error('Fetch error:', error);
            setError('Failed to load data');
        }).finally(() => {
            setLoading(false);
        });
    }, [setTotalResults]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(data.slice(startIndex, endIndex));
    }, [currentItem, showPerPage, data]);

    return (
        <div className="overflow-x-auto py-4 px-4">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-green-500'>
                            <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Services Name</th>
                            <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Services Description </th>
                            <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Package</th>
                            <th className="py-2 px-4 text-white border-r border-b text-center uppercase whitespace-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-l border-r border-b whitespace-nowrap">{item.title}</td>
                                <td className="py-2 px-4 border-r border-b whitespace-nowrap">{item.description
                                }</td>
                                <td className="py-2 px-4 border-r border-b whitespace-nowrap">{item.package_id
                                }</td>
                                <td className="py-2 px-4 border-r border-b whitespace-nowrap text-center">
                                    <button className='bg-green-500 rounded-md hover:bg-green-200 p-2 text-white'>Edit</button>
                                    <button className='bg-red-600 rounded-md p-2 text-white ms-2'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ServiceList;

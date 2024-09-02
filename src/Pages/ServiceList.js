import React, { useEffect, useState, useContext, useCallback } from 'react';
import PaginationContext from './PaginationContext';
import Pagination from './Pagination';
import { useService } from './ServiceContext';
import Swal from 'sweetalert2';

const ServiceList = () => {
    const { setTotalResults, showPerPage } = useContext(PaginationContext);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginated, setPaginated] = useState([]);
    const [currentPage] = useState(1);
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

            const result = await res.json();

            if (!res.ok || !result.status) {
                // Display the error message only once
                Swal.fire({
                    title: 'Error!',
                    text: result.message || 'An error occurred',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                setError(result.message || 'An error occurred');
                return;
            }

            const newToken = result._token || result.token;
            if (newToken) {
                localStorage.setItem('_token', newToken);
            }

            const processedData = (result.services || []).map((item, index) => ({
                ...item,
                index: index + 1,
                title: item.title,
                description: item.description,
                id: item.id,
            }));

            setData(processedData);
            setTotalResults(processedData.length);
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    }, [setTotalResults]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const start = (currentPage - 1) * showPerPage;
        const end = start + showPerPage;
        setPaginated(data.slice(start, end));
    }, [data, currentPage, showPerPage]);

    const handleEditService = (service) => {
        editService(service);
        console.log('Editing service:', service);
    };

    const handleDelete = (serviceId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
                const storedToken = localStorage.getItem("_token");

                if (!admin_id || !storedToken) {
                    console.error("Admin ID or token is missing.");
                    return;
                }

                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                fetch(`https://goldquestreact.onrender.com/service/delete?id=${serviceId}&admin_id=${admin_id}&_token=${storedToken}`, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            return response.text().then(text => {
                                const errorData = JSON.parse(text);
                                Swal.fire(
                                    'Error!',
                                    `An error occurred: ${errorData.message}`,
                                    'error'
                                );
                                throw new Error(text);
                            });
                        }
                        return response.json();
                    })
                    .then(result => {
                        const newToken = result._token || result.token;
                        if (newToken) {
                            localStorage.setItem("_token", newToken);
                        }
                        console.log('Service deleted:', result);
                        fetchData();
                        Swal.fire(
                            'Deleted!',
                            'Your service has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
            }
        });
    };

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
                        <th className="py-2 px-4 text-white border-r border-b text-center uppercase whitespace-nowrap">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.length > 0 ?
                        (paginated.map((item, index) => (
                            <tr key={item.index}>
                                <td className="py-2 px-4 border-l border-r border-b whitespace-nowrap">{item.index}</td>
                                <td className="py-2 px-4 border-r border-b whitespace-nowrap">{item.title}</td>
                                <td className="py-2 px-4 border-r border-b whitespace-nowrap">{item.description}</td>
                                <td className="py-2 px-4 border-r border-b whitespace-nowrap text-center">
                                    <button
                                        disabled={loading}
                                        className='bg-green-500 rounded-md hover:bg-green-200 p-2 text-white'
                                        onClick={() => handleEditService(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        disabled={loading}
                                        className='bg-red-600 rounded-md p-2 text-white ms-2'
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-6 px-4 border-l border-r text-center border-b whitespace-nowrap">
                                    No data available
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            {paginated.length > 0 && <Pagination />}
        </div>
    );
};

export default ServiceList;

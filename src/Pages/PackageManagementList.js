import React, { useContext, useEffect, useState, useCallback } from 'react';
import PaginationContext from './PaginationContext';
import Pagination from './Pagination';
import { usePackage } from './PackageContext';
import Swal from 'sweetalert2';

const PackageManagementList = ({ refreshTrigger }) => {
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);
    const { editPackage } = usePackage();
    const [paginatedData, setPaginatedData] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(() => {
        setLoading(true);
        setError(null); // Reset error state

        const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
        const storedToken = localStorage.getItem("_token");

        const queryParams = new URLSearchParams({
            admin_id: admin_id || '',
            _token: storedToken || ''
        }).toString();

        fetch(`https://goldquestreact.onrender.com/package/list?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched data:', data);
                setData(data.packages || []);
                setTotalResults(data.totalResults || 0);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setError('Failed to load data');
            })
            .finally(() => setLoading(false));
    }, [setTotalResults]);

    useEffect(() => {
        fetchData();
    }, [fetchData, refreshTrigger]);

    useEffect(() => {
        if (Array.isArray(data)) {
            const startIndex = (currentItem - 1) * showPerPage;
            const endIndex = startIndex + showPerPage;
            setPaginatedData(data.slice(startIndex, endIndex));
        }
    }, [data, currentItem, showPerPage]);

    const handleEdit = (pkg) => {
        editPackage(pkg);
        console.log('Editing package:', pkg);
    };

    const handleDelete = (packageId) => {
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

                fetch(`https://goldquestreact.onrender.com/package/delete?id=${packageId}&admin_id=${admin_id}&_token=${storedToken}`, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            return response.text().then(text => {
                                console.error('Server error:', text);
                                throw new Error(text);
                            });
                        }
                        return response.json();
                    })
                    .then(result => {
                        console.log('Package deleted:', result);
                        fetchData(); // Refresh data after deletion
                        Swal.fire(
                            'Deleted!',
                            'Your package has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                        Swal.fire(
                            'Error!',
                            `An error occurred: ${error.message}`,
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <>
            <div className="overflow-x-auto py-4 px-4">
                {error && <div className="text-red-500 text-center">{error}</div>}
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-green-500'>
                            <th className="py-2 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Sl</th>
                            <th className="py-2 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Package Name</th>
                            <th className="py-2 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Description</th>
                            <th className="py-2 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={item.id}>
                                <td className="py-2 px-4 border-b border-r border-l whitespace-nowrap">{(currentItem - 1) * showPerPage + index + 1}</td>
                                <td className="py-2 px-4 border-b border-r border-l whitespace-nowrap">{item.title}</td>
                                <td className="py-2 px-4 border-b border-r whitespace-nowrap">{item.description}</td>
                                <td className="py-2 px-4 border-b border-r whitespace-nowrap">
                                    <button className='bg-green-500 hover:bg-green-200 rounded-md p-2 me-2 text-white' onClick={() => handleEdit(item)}>Edit</button>
                                    <button className='bg-red-600 rounded-md p-2 text-white' onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {loading && <div className="text-center">Loading...</div>}
            <Pagination />
        </>
    );
};

export default PackageManagementList;

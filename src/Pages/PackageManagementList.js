import React, { useContext, useEffect, useState } from 'react';
import PaginationContext from './PaginationContext';
import Pagination from './Pagination';
import { usePackage } from './PackageContext';
import Swal from 'sweetalert2';
import SearchBar from './SearchBar';

const PackageManagementList = ({ refreshTrigger }) => {
    const { currentItem, showPerPage } = useContext(PaginationContext);

    const { editPackage,data,loading,fetchData } = usePackage();
    const [paginatedData, setPaginatedData] = useState([]);

    const [error, setError] = useState(null);

  

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
                        const newToken = result._token || result.token; // Use result.token if result._token is not available
                        if (newToken) {
                            localStorage.setItem("_token", newToken); // Replace the old token with the new one
                        }
                        setError({});
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

                    });
            }
        });
    };

    return (
        <>
            <div className="overflow-x-auto py-4 px-4">
                {error && <div className="text-red-500 text-center">{error}</div>}
                <SearchBar />
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
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="py-2 px-4 border-b border-r border-l whitespace-nowrap">
                                        {(currentItem - 1) * showPerPage + index + 1}
                                    </td>
                                    <td className="py-2 px-4 border-b border-r border-l whitespace-nowrap">
                                        {item.title}
                                    </td>
                                    <td className="py-2 px-4 border-b border-r whitespace-nowrap">
                                        {item.description}
                                    </td>
                                    <td className="py-2 px-4 border-b border-r whitespace-nowrap">
                                        <button
                                            className='bg-green-500 hover:bg-green-200 rounded-md p-2 me-2 text-white'
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='bg-red-600 rounded-md p-2 text-white'
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-6 px-4 text-center border-b border-r border-l">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
            {loading && <div className="text-center">Loading...</div>}
            {paginatedData.length > 0 ? (<Pagination />) : ('')}

        </>
    );
};

export default PackageManagementList;

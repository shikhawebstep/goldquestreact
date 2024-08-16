// PackageManagementList.js
import React, { useContext, useEffect, useState } from 'react';
import PaginationContext from './PaginationContext';
import Pagination from './Pagination';
import { usePackage } from './PackageContext'; // Import the custom hook

const PackageManagementList = () => {
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);
    const { editPackage } = usePackage(); // Access the context
    const [paginatedData, setPaginatedData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
        const storedToken = localStorage.getItem("_token");

        const queryParams = new URLSearchParams({
            admin_id: admin_id,
            _token: storedToken
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
            });
    }, [setTotalResults]);

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

    return (
        <>
            <div className="overflow-x-auto py-4 px-4">
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
                                <td className='hidden'>{item.id}</td>
                                <td className="py-2 px-4 border-b border-r whitespace-nowrap">{item.description}</td>
                                <td className="py-2 px-4 border-b border-r whitespace-nowrap">
                                <button className='bg-green-500 hover:bg-green-200 rounded-md p-2 me-2 text-white' onClick={() => handleEdit(item)}>Edit</button>

                                    <button className='bg-red-600 rounded-md p-2 text-white'>{item.Delete || 'Delete'}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination />
        </>
    );
}

export default PackageManagementList;

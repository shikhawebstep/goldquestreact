import React, { useContext, useEffect, useState } from 'react';
import PaginationContext from '../Pages/PaginationContext';
import Pagination from '../Pages/Pagination';
import Swal from 'sweetalert2';
import DropBoxContext from './DropBoxContext';
import { useApi } from '../ApiContext';

const CandidateList = () => {
    const { handleEditDrop, listData, fetchClient } = useContext(DropBoxContext);
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);
    const [paginated, setPaginated] = useState([]);
    const API_URL = useApi();

    useEffect(() => {
        fetchClient();
    }, [fetchClient]);

    useEffect(() => {
        setTotalResults(listData.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(listData.slice(startIndex, endIndex));
    }, [currentItem, setTotalResults, listData, showPerPage]);

    const handleEdit = (client) => {
        handleEditDrop(client);
        fetchClient();
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const branchId = JSON.parse(localStorage.getItem("branch"))?.id;
                const token = localStorage.getItem("branch_token");

                if (!branchId || !token) {
                    console.error("Branch ID or token is missing.");
                    return;
                }

                const requestOptions = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                fetch(`${API_URL}/branch/candidate-application/delete?id=${id}&branch_id=${branchId}&_token=${token}`, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            return response.text().then(text => {
                                const errorData = JSON.parse(text);
                                Swal.fire('Error!', `An error occurred: ${errorData.message}`, 'error');
                                throw new Error(text);
                            });
                        }
                        return response.json();
                    })
                    .then(result => {
                        const newToken = result._token || result.token;
                        if (newToken) {
                            localStorage.setItem("branch_token", newToken);
                        }
                        fetchClient();
                        Swal.fire('Deleted!', 'Your service has been deleted.', 'success');
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
            }
        });
    };

    return (
        <>
            <div className="overflow-x-auto py-6 px-4 bg-white shadow-md rounded-md md:m-10 m-3">
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-green-500'>
                            <th className="py-3 text-left border-r border-l text-white px-4 border-b whitespace-nowrap uppercase">SL NO.</th>
                            <th className="py-3 text-left border-r text-white px-4 border-b whitespace-nowrap uppercase">Name of the applicant</th>
                            <th className="py-3 text-left border-r text-white px-4 border-b whitespace-nowrap uppercase">Email Id</th>
                            <th className="py-3 text-left border-r text-white px-4 border-b whitespace-nowrap uppercase">Mobile Number</th>
                            <th className="py-3 text-left border-r text-white px-4 border-b whitespace-nowrap uppercase">Services</th>
                            <th className="py-3 text-left border-r text-white px-4 border-b whitespace-nowrap uppercase">Packages</th>
                            <th className="py-3 text-left border-r text-white px-4 border-b whitespace-nowrap uppercase">Docs</th>
                            <th className="py-3 text-left border-r text-white px-4 border-b whitespace-nowrap uppercase">Date/Time</th>
                            <th className="py-3 text-center px-4 text-white border-r border-b whitespace-nowrap uppercase">Action</th>
                        </tr>
                    </thead>
                    {paginated.length > 0 ? (
                        <tbody>
                            {paginated.map((report, index) => (
                                <tr key={report.id || index}>
                                    <td className="py-3 px-4 border-l border-b border-r whitespace-nowrap capitalize">{index + 1}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap capitalize">{report.name}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap capitalize">{report.email}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap capitalize">{report.mobile_number}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap capitalize">
                                        {report.services} <button className="block text-blue-600">{report.more}</button>
                                    </td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap capitalize">{report.package}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap capitalize">
                                        <button className="bg-green-600 text-white p-2 rounded-md hover:bg-green-200">{report.doc}</button>
                                    </td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap capitalize">{report.created_at}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap capitalize text-center">
                                        <button className="bg-green-600 text-white p-3 rounded-md hover:bg-green-200" onClick={() => handleEdit(report)}>Edit</button>
                                        <button className="bg-red-600 text-white p-3 ms-3 rounded-md hover:bg-red-200" onClick={() => handleDelete(report.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={9} className="py-3 px-4 text-center">No data found</td>
                            </tr>
                        </tbody>
                    )}
                    
                </table>
            </div>
            <Pagination />
        </>
    );
};

export default CandidateList;

import React, { useCallback, useContext, useEffect, useState } from 'react';
import PaginationContext from '../Pages/PaginationContext';
import Pagination from '../Pages/Pagination';
import Swal from 'sweetalert2';
import DropBoxContext from './DropBoxContext';

const DropBoxList = () => {
    const { handleEditDrop } = useContext(DropBoxContext)
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);
    const [listData, setListData] = useState([]);
    const [paginated, setPaginated] = useState([]);

    const fetchClient = useCallback(() => {
        const branch_id = JSON.parse(localStorage.getItem("branch"))?.id;
        const _token = localStorage.getItem("branch_token");

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`https://goldquestreact.onrender.com/branch/client-application/list?branch_id=${branch_id}&_token=${_token}`, requestOptions)
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    Swal.fire(
                        'Error!',
                        `An error occurred: ${errorData.message}`,
                        'error'
                    );
                    return;
                }
                return response.json();
            })
            .then((data) => {
                const newToken = data?._token || data?.token;
                if (newToken) {
                    localStorage.setItem("_token", newToken);
                }
                setListData(data.clientApplications || []);
            })
            .catch((error) => {
                Swal.fire(
                    'Error!',
                    'An unexpected error occurred.',
                    'error'
                );
            });
    }, []);

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
                const branch_id = JSON.parse(localStorage.getItem("branch"))?.id;
                const _token = localStorage.getItem("branch_token");
                const storedBranchData = JSON.parse(localStorage.getItem("branch"))?.customer_id;

                if (!branch_id || !_token) {
                    console.error("Admin ID or token is missing.");
                    return;
                }
                const requestOptions = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                fetch(`https://goldquestreact.onrender.com/branch/client-application/delete?id=${id}&branch_id=${branch_id}&_token=${_token}`, requestOptions)
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
                            localStorage.setItem("branch_token", newToken);
                        }
                        console.log('Client deleted:', result);
                        fetchClient();
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
        <>

            <div className="overflow-x-auto py-6 px-4 bg-white shadow-md rounded-md md:m-10 m-3">

                <table className="min-w-full">
                    <thead>
                        <tr className="bg-green-500">
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">SL NO.</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Photo</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Application Id	</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Employee Name</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Application Date/time</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Location</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Batch Number</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Sub Client</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Documents</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Services</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Packages</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Spoc Case Name</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Employee Id</th>
                            <th className="py-3 text-center text-white px-4 border-b whitespace-nowrap uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length > 0 ?

                            (paginated.map((report, index) => (
                                <tr key={index} id={report}>
                                    <td className="py-3 px-4 border-b border-r text-center border-l whitespace-nowrap">{index + 1}</td>
                                    <td className="py-3 px-4 border-b border-r text-center whitespace-nowrap"><img src={report.attach_documents} alt={report.photo} />
                                    </td>
                                    <td className="py-3 px-4 border-b border-r text-center whitespace-nowrap">{report.application_id}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.name}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.created_at}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.location}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.batch_number}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.sub_client}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap"><img src={report.attach_documents} alt={report.attach_documents} /></td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center">{report.services} <button className='block text-blue-600 text-center'>{report.more}</button></td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.package}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center">{report.spoc}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.employee_id}</td>
                                    <td className="py-3 px-4 border-b whitespace-nowrap border-r">
                                        <button className="bg-green-600 text-white p-3  rounded-md hover:bg-green-200" onClick={() => handleEdit(report)}>Edit</button>
                                        <button className="bg-red-600 text-white p-3  ms-2 rounded-md hover:bg-red-200" onClick={() => handleDelete(report.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))) : (<p className='text-center p-5 w-full whitespace-nowrap flex justify-center'>No Data Available</p>)
                        }

                    </tbody>
                </table>
            </div>
            <Pagination />
        </>
    )
}

export default DropBoxList
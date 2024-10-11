import React, { useContext, useEffect, useState } from 'react';
import PaginationContext from '../Pages/PaginationContext';
import Pagination from '../Pages/Pagination';
import DropBoxContext from './DropBoxContext';
import { useApi } from '../ApiContext';
const ReportCaseTable = () => {
    const API_URL = useApi();
    const { fetchClientDrop, listData } = useContext(DropBoxContext);
    const [serviceTitle, setServiceTitle] = useState([]);
    useEffect(() => {
        fetchClientDrop();
    }, [fetchClientDrop]);
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);
    const [expandedRows, setExpandedRows] = useState([]);
    const [paginated, setPaginated] = useState([]);
    useEffect(() => {
        setTotalResults(listData.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(listData.slice(startIndex, endIndex));
    }, [currentItem, setTotalResults, listData, showPerPage]);

    const handleToggle = (index, services, branch_id, id) => {
        const servicesArray = services.split(',').map(Number);
        const storedToken = localStorage.getItem("branch_token");

        const newExpandedRows = expandedRows.includes(index)
            ? expandedRows.filter((row) => row !== index)
            : [...expandedRows, index];

        setExpandedRows(newExpandedRows);

        const fetchPromises = servicesArray.map(serviceId => {
            const url = `${API_URL}/branch/annexure-by-service?service_id=${serviceId}&application_id=${id}&branch_id=${branch_id}&_token=${storedToken}`;
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            return fetch(url, requestOptions)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                });
        });

        Promise.all(fetchPromises)
            .then(results => {

                const serviceHeading = {};
                
                results.forEach(serviceTitle => {
                    if (typeof serviceTitle === 'object' && serviceTitle !== null) {
                        const hasHeading = serviceTitle.hasOwnProperty('heading');
                        const hasAnnexureData = serviceTitle.annexureData && typeof serviceTitle.annexureData === 'object';
                
                        const entry = {
                            heading: hasHeading ? serviceTitle.heading || '' : '',
                            status: hasAnnexureData ? serviceTitle.annexureData.status || '' : ''
                        };
                
                        if (!serviceHeading[id]) {
                            serviceHeading[id] = [];
                        }
                        serviceHeading[id].push(entry);
                    }
                });
                
                setServiceTitle(serviceHeading);
                
            })

            .catch(error => {

                console.error('Error fetching service info:', error);
            });
    };





    return (
        <>
            <div className="overflow-x-auto my-14 mx-4 bg-white shadow-md rounded-md">
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-green-500'>
                            <th className="py-3 px-4 border-b text-left border-r uppercase whitespace-nowrap text-white">SL NO</th>
                            <th className="py-3 px-4 border-b text-left border-r uppercase whitespace-nowrap text-white">Application ID</th>
                            <th className="py-3 px-4 border-b text-left border-r uppercase whitespace-nowrap text-white">NAME OF THE APPLICANT</th>
                            <th className="py-3 px-4 border-b text-left border-r uppercase whitespace-nowrap text-white">APPLICANT EMPLOYEE ID</th>
                            <th className="py-3 px-4 border-b text-left border-r uppercase whitespace-nowrap text-white">Initiation Date</th>
                            <th className="py-3 px-4 border-b text-left border-r uppercase whitespace-nowrap text-white">Report Date</th>
                            <th className="py-3 px-4 border-b text-center uppercase whitespace-nowrap text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">
                                        <input type="checkbox" name="" id="" className='me-2' />{index + 1}
                                    </td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.application_id}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.name}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.employee_id}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.created_at}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.report_date}</td>
                                    <td className="py-3 px-4 border-b border-r text-center whitespace-nowrap">
                                        <button
                                            className="bg-green-500 hover:bg-green-400 rounded-md p-2 px-3 text-white"
                                            onClick={() => handleToggle(index, item.services, item.branch_id, item.id)}
                                        >
                                            {expandedRows.includes(index) ? "Hide Details" : "View More"}
                                        </button>
                                    </td>
                                </tr>
                                {expandedRows.includes(index) && (
                                    <tr className='w-full'>
                                        <td colSpan="9" className="p-0 w-full">
                                            <div className='collapseMenu overflow-auto w-full max-w-[1500px]'>
                                                <table className="min-w-full max-w-full bg-gray-100 overflow-auto">
                                                    <thead>
                                                        <tr className=''>
                                                        {serviceTitle[item.id] && serviceTitle[item.id].map((service, serviceIndex) => {
                                                                return (
                                                                    <>
                                                                        <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">{service.heading || 'N/A'}</th>

                                                                    </>
                                                                )
                                                            })}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>

                                                            {serviceTitle[item.id] && serviceTitle[item.id].map((service, serviceIndex) => {
                                                                return (
                                                                    <>
                                                                        <td className="py-3 px-4 border-b whitespace-nowrap text-center">{service.status || 'N/A'}</td>
                                                                    </>
                                                                )
                                                            })}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination />
        </>
    );
};

export default ReportCaseTable;
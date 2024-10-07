import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useApi } from '../ApiContext';
import Swal from 'sweetalert2';
import { BranchContextExel } from './BranchContextExel';
import { useNavigate } from 'react-router-dom';

const ExelTrackerStatus = () => {
    const Navigate = useNavigate();
    const [services, setServices] = useState([])
    const { branch_id, setApplicationId, setServiceId, service_id } = useContext(BranchContextExel);
    const [applicationData, setApplicationData] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const API_URL = useApi();
    const [, setLoading] = useState(false);
    const [, setError] = useState(null);
    const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
    const storedToken = localStorage.getItem("_token");

    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    const fetchApplications = useCallback(() => {
        setLoading(true);
        fetch(`${API_URL}/client-master-tracker/applications-by-branch?branch_id=${branch_id}&admin_id=${admin_id}&_token=${storedToken}`, requestOptions)
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
            .then((data) => {
                const newToken = data._token || data.token;
                if (newToken) {
                    localStorage.setItem("_token", newToken);
                }
                setApplicationData(data.customers || []);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setError('Failed to load data');
            })
            .finally(() => setLoading(false));
    }, [API_URL, branch_id, admin_id, storedToken]);



    useEffect(() => {
        fetchApplications();

    }, [fetchApplications]);


    const handleToggle = useCallback((index, services, id) => {
        const ths = document.querySelectorAll(`tr.service-table-${id} th.service-th-${id}`);
    
        if (ths.length) {
            ths.forEach(th => th.remove());
        } else {
        }
    
        const servicesArray = services ? services.split(',').map(Number) : [];
    
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        Promise.all(
            servicesArray.map(serviceId => {
                const url = `https://goldquestreact.onrender.com/client-master-tracker/report-form-json-by-service-id?service_id=${serviceId}&admin_id=${admin_id}&_token=${storedToken}`;
    
                return fetch(url, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(result => {
                        const newService = result.reportFormJson.json;
                        
                        // Check if the service already exists in the state
                        setServices(prevServices => {
                            // If it doesn't exist, append it
                            if (!prevServices.some(service => JSON.stringify(service) === JSON.stringify(newService))) {
                                return [...prevServices, newService];
                            }
                            return prevServices; // Return existing state if it already exists
                        });
                        const newToken = result._token || result.token;
                        if (newToken) {
                            localStorage.setItem("_token", newToken);
                        }
    
                        return result;
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
            })
        ).then(results => {
            console.log(results);
            
        });
    
        // Update expanded rows state
        const newExpandedRows = expandedRows.includes(index)
            ? expandedRows.filter((row) => row !== index)
            : [...expandedRows, index];
    
        setExpandedRows(newExpandedRows);
    }, [expandedRows, service_id, admin_id, storedToken]);
    

    const generateReport = (id, services) => {
        Navigate('/candidate');
        setApplicationId(id);
        setServiceId(services)
    };


    const annexureValues = useCallback((application_id, db_name) => {
        const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
        const storedToken = localStorage.getItem("_token");

        if (!admin_id || !storedToken || !application_id) {
            console.error("Missing required parameters");
            return;
        }

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const url = `https://goldquestreact.onrender.com/client-master-tracker/annexure-data?application_id=${application_id}&db_table=${db_name}&admin_id=${admin_id}&_token=${storedToken}`;

        return fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                if (result && result.annexureData) {
                    console.log(result.annexureData);
                    return result.annexureData;
                } else {
                    console.error("No annexure data found in the response.");
                    return false;
                }
            })
            .catch((error) => console.error("Fetch error: ", error));
    }, []);

    return (
        <>
            <div>
                <div className="overflow-x-auto my-14 mx-4 bg-white shadow-md rounded-md">

                    <table className="min-w-full">
                        <thead>
                            <tr className='bg-green-500'>
                                <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">SL NO</th>
                                <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">Application ID</th>
                                <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">NAME OF THE APPLICANT</th>
                                <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">APPLICANT EMPLOYEE ID</th>
                                <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">Initiation Date</th>
                                <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">Download Status</th>
                                <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">Overall Status</th>
                                <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">Report Data</th>
                                <th className="py-3 px-4 border-b text-center uppercase whitespace-nowrap text-white">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicationData.map((item, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">
                                            <input type="checkbox" name="" id="" className='me-2' />{index + 1}
                                        </td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.application_id}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.name}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.employee_id}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.created_at}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.d_status}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.overall_status}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize"><button className="bg-green-400 rounded-md text-white p-3" onClick={() => generateReport(item.id, item.services)}>Generate Report</button></td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">
                                            <button
                                                className="bg-green-500 hover:bg-green-400 rounded-md p-3 text-white"
                                                onClick={() => handleToggle(index, item.services, item.id)}
                                            >
                                                {expandedRows.includes(index) ? "Hide Details" : "View More"}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedRows.includes(index) && (
                                        <tr className='w-full' key={index}>
                                            <td colSpan="9" className="p-0 w-full">
                                                <div className='collapseMenu overflow-auto w-full max-w-[1500px]'>
                                                    <table className="min-w-full max-w-full bg-gray-100 overflow-auto">
                                                        <thead>
                                                            <tr className={`service-table-${item.id}`}>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">TAT Day</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Batch No</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Subclient</th>
                                                                {services.map((serviceItem, index) => {
                                                                    const jsonArr = JSON.parse(serviceItem);
                                                                    return (
                                                                        <>
                                                                            <th className={`service-th-${item.id}`} key={index}>{jsonArr.heading || 'N/A'}</th>
                                                                        </>
                                                                    )
                                                                })}
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.tatday}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.batch_number}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.sub_client}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.services}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.EMPLOYMENT2}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.location}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_3}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_4}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_5}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_6}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_7}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_8}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize"><button className="bg-red-500 hover:bg-red-400 text-white rounded-md p-3" >Delete</button></td>
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
                </div></div>

        </>
    );
};

export default ExelTrackerStatus;
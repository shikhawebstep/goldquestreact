import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useApi } from '../ApiContext';
import Swal from 'sweetalert2';
import { BranchContextExel } from './BranchContextExel';
import { useNavigate } from 'react-router-dom';

const ExelTrackerStatus = () => {
    const [annexureData, setAnnexureData] = useState([]);
    const [annexureDataThs, setAnnexureDataThs] = useState([]);
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const { branch_id, setApplicationId, setServiceId } = useContext(BranchContextExel);
    const [applicationData, setApplicationData] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = useApi();
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
                        throw new Error(errorData.message);
                    });
                }
                return response.json();
            })
            .then(data => {
                const newToken = data._token || data.token;
                if (newToken) {
                    localStorage.setItem("_token", newToken);
                }
                setApplicationData(data.customers || []);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError('Failed to load data');
            })
            .finally(() => setLoading(false));
    }, [API_URL, branch_id, admin_id, storedToken]);






    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const handleToggle = useCallback((index, services, id) => {
        if (!admin_id || !storedToken || !id) {
            console.error("Missing required parameters");
            return;
        }

        const newExpandedRows = expandedRows.includes(index)
            ? expandedRows.filter((row) => row !== index)
            : [...expandedRows, index];

        setExpandedRows(newExpandedRows);

        if (newExpandedRows.includes(index) && services) {
            const servicesArray = services.split(',').map(Number);

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
                            const parsedData = JSON.parse(newService);
                            const parsedDb = parsedData.db_table;

                            setServices(prevServices => {
                                if (!prevServices.some(service => JSON.stringify(service) === JSON.stringify(newService))) {
                                    return [...prevServices, newService];
                                }
                                return prevServices;
                            });

                            const newToken = result._token || result.token;
                            if (newToken) {
                                localStorage.setItem("_token", newToken);
                            }

                            return parsedDb;
                        })
                        .catch(error => {
                            console.error('Fetch error:', error);
                        });
                })
            ).then(parsedDbs => {
                const uniqueDbNames = [...new Set(parsedDbs.filter(Boolean))];
                let annexureStatusArr = [];
                const annexureFetches = uniqueDbNames.map(db_name => {
                    const url = `https://goldquestreact.onrender.com/client-master-tracker/annexure-data?application_id=${id}&db_table=${db_name}&admin_id=${admin_id}&_token=${storedToken}`;

                    return fetch(url, requestOptions)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(result => {
                            if (result && result.annexureData) {
                                if (result.annexureData && result.annexureData.status) {
                                    annexureStatusArr.push({ db_name, status: result.annexureData.status });
                                } else {
                                    annexureStatusArr.push({ db_name, status: 'N/A' });
                                }
                                setAnnexureData(prevData => ({ ...prevData, [id]: result.annexureData }));

                                if (result.message === 'Annexure Data not found') {
                                    annexureStatusArr.push({ db_name, status: 'N/A' });
                                } else {
                                    return result;
                                }
                            } else {
                                if (result.message === 'Annexure Data not found') {
                                    annexureStatusArr.push({ db_name, status: 'N/A' });
                                } else {
                                    return result;
                                }
                            }
                        })

                        .catch(error => console.error("Fetch error: ", error));
                });
                return Promise.all(annexureFetches).then(() => {
                    setAnnexureDataThs(annexureStatusArr);
                });
                // return Promise.all(annexureFetches);
            })
                .catch(error => console.error("Error during service fetch or annexure fetch: ", error));
        }
    }, [expandedRows, admin_id, storedToken, requestOptions]);

    const generateReport = (id, services) => {
        navigate('/candidate');
        setApplicationId(id);
        setServiceId(services);
    };
    let serviceDbArr = [];

    return (
        <>
            <div>
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
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
                                <React.Fragment key={item.id}>
                                    <tr>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">
                                            <input type="checkbox" className='me-2' />{index + 1}
                                        </td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.application_id}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.name}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.employee_id}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.created_at}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.d_status}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.overall_status}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">
                                            <button className="bg-green-400 rounded-md text-white p-3" onClick={() => generateReport(item.id, item.services)}>Generate Report</button>
                                        </td>
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
                                        <tr>
                                            <td colSpan="9" className="p-0">
                                                <div className='collapseMenu overflow-auto w-full max-w-[1500px]'>
                                                    <table className="min-w-full max-w-full bg-gray-100">
                                                        <thead>
                                                            <tr className={`service-table-${item.id}`}>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">TAT Day</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Batch No</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Subclient</th>
                                                                {
                                                                    (() => {
                                                                        console.log('services', services);
                                                                        return services.map((serviceItem, index) => {
                                                                            let jsonArr;

                                                                            // Attempt to parse the serviceItem
                                                                            try {
                                                                                jsonArr = JSON.parse(serviceItem);
                                                                            } catch (error) {
                                                                                console.error('Error parsing serviceItem:', error);
                                                                                jsonArr = null; // Set to null if parsing fails
                                                                            }

                                                                            // If jsonArr is valid and has a db_table, push it to the array
                                                                            if (jsonArr && jsonArr.db_table) {
                                                                                serviceDbArr.push(jsonArr.db_table);
                                                                            }

                                                                            // Render the heading or 'N/A' if not present
                                                                            return (
                                                                                <th className={`service-th-${item.id}`} key={index}>
                                                                                    {jsonArr && jsonArr.heading ? jsonArr.heading : 'N/A'}
                                                                                </th>
                                                                            );
                                                                        });
                                                                    })() // Immediately Invoked Function Expression
                                                                }
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.tatday}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.batch_number}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.sub_client}</td>
                                                                {(() => {
                                                                    console.log('serviceDbArr', serviceDbArr);
                                                                    console.log('annexureDataThs', annexureDataThs);

                                                                    return (
                                                                        serviceDbArr.length > 0 ? (
                                                                            serviceDbArr.map((service, index) => {
                                                                                // Get the corresponding annexure data for the current index
                                                                                const annexureDBTable = annexureDataThs[index]?.db_name || 'N/A'; // Use 'N/A' if undefined
                                                                                const annexureStatus = annexureDataThs[index]?.status || 'N/A'; // Use 'N/A' if undefined

                                                                                // Check if annexureDBTable matches the current service
                                                                                return (
                                                                                    <td className={`service-th-${item.id}`} key={index}>
                                                                                        {annexureDBTable === service ? (
                                                                                            annexureStatus !== null && annexureStatus !== '' ? annexureStatus : 'N/A'
                                                                                        ) : (
                                                                                            'N/A' // Default if there is no match
                                                                                        )}
                                                                                    </td>
                                                                                );
                                                                            })
                                                                        ) : (
                                                                            <td className={`service-th-${item.id}`}>N/A</td> // Handle case where there are no services
                                                                        )
                                                                    );

                                                                })()}
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">
                                                                    <button className="bg-red-500 hover:bg-red-400 text-white rounded-md p-3">Delete</button>
                                                                </td>
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
            </div>
        </>
    );
};

export default ExelTrackerStatus;

import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useApi } from '../ApiContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { BranchContextExel } from './BranchContextExel';
import { useNavigate } from 'react-router-dom';

const ExelTrackerStatus = () => {
    const [parentCustomer, setParentCustomer] = useState([]);
    const [pdfData, setPdfData] = useState([]);
    const [serviceTitleValue, setServiceTitleValue] = useState([]);
    const [cmtAllData, setCmtAllData] = useState([]);
    const printRef = React.useRef();
    const [dbHeadingsStatus, setDBHeadingsStatus] = useState({});
    const [applicationData, setApplicationData] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { branch_id, setApplicationId, setServiceId } = useContext(BranchContextExel);
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

        const newExpandedRow = expandedRows === index ? null : index;
        setExpandedRows(newExpandedRow);

        if (newExpandedRow === index && services) {
            const servicesArray = services.split(',').map(Number);

            Promise.all(
                servicesArray.map(serviceId => {
                    const url = `${API_URL}/client-master-tracker/report-form-json-by-service-id?service_id=${serviceId}&admin_id=${admin_id}&_token=${storedToken}`;

                    return fetch(url, requestOptions)
                        .then(response => {
                            if (!response.ok) throw new Error('Network response was not ok');
                            return response.json();
                        })
                        .then(result => {
                            const newService = result.reportFormJson.json;
                            const parsedData = JSON.parse(newService);
                            const parsedDb = parsedData.db_table;
                            const newToken = result._token || result.token;
                            if (newToken) localStorage.setItem("_token", newToken);
                            return parsedDb;
                        })
                        .catch(error => console.error('Fetch error:', error));
                })
            ).then(parsedDbs => {
                const uniqueDbNames = [...new Set(parsedDbs.filter(Boolean))];
                const annexureFetches = uniqueDbNames.map(db_name => {
                    const url = `${API_URL}/client-master-tracker/annexure-data?application_id=${id}&db_table=${db_name}&admin_id=${admin_id}&_token=${storedToken}`;

                    return fetch(url, requestOptions)
                        .then(response => {
                            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                            return response.json();
                        })
                        .then(result => ({
                            db_table: db_name,
                            status: result?.annexureData?.status || 'N/A'



                        }))
                        .catch(error => console.error("Fetch error: ", error));
                });

                return Promise.all(annexureFetches).then(annexureStatusArr => {
                    setDBHeadingsStatus(prev => ({ ...prev, [id]: annexureStatusArr }));
                });
            })
                .catch(error => console.error("Error during service fetch or annexure fetch: ", error));
        }
    }, [expandedRows, admin_id, storedToken, API_URL, requestOptions]);

    const generateReport = (id, services) => {
        navigate('/candidate');
        setApplicationId(id);
        setServiceId(services);
    };


    const handleDownloadPdf = async (id, branch_id) => {
        alert(`${id} - ${branch_id}`);

        if (!id || !branch_id) {
            return ('Something is missing');
        }

        const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
        const storedToken = localStorage.getItem("_token");

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://goldquestreact.onrender.com/client-master-tracker/application-by-id?application_id=${id}&branch_id=${branch_id}&admin_id=${admin_id}&_token=${storedToken}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                const errorData = JSON.parse(errorText);
                Swal.fire('Loading!', `An error occurred: ${errorData.message}`, 'error');
                throw new Error(errorText);
            }

            const data = await response.json();
            const applications = data.application;

            const serviceIdsArr = applications?.services?.split(',') || [];
            let serviceTitleValue = [];
            // Prepare an array of promises for the service fetches
            const serviceFetchPromises = serviceIdsArr.map((serviceId) => {
                const requestServicesOptions = {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json' // Optional, may not be needed for GET
                    },
                    redirect: "follow"
                };

                const serviceInfoUrl = `https://goldquestreact.onrender.com/service/service-info?id=${serviceId}&admin_id=${admin_id}&_token=${storedToken}`;
                const applicationServiceUrl = `https://goldquestreact.onrender.com/client-master-tracker/application-service?service_id=${serviceId}&application_id=${id}&admin_id=${admin_id}&_token=${storedToken}`;

                return Promise.all([
                    fetch(serviceInfoUrl, requestServicesOptions).then((serviceResponse) => {
                        if (!serviceResponse.ok) {
                            throw new Error(`HTTP error! status: ${serviceResponse.status}`);
                        }
                        return serviceResponse.json(); // Assuming the response is JSON
                    }),
                    fetch(applicationServiceUrl, requestServicesOptions).then((serviceResponse) => {
                        if (!serviceResponse.ok) {
                            throw new Error(`HTTP error! status: ${serviceResponse.status}`);
                        }
                        return serviceResponse.json(); // Assuming the response is JSON
                    })
                ])
                    .then(([serviceData, applicationData]) => {
                        serviceTitleValue.push({
                            title: serviceData.service.title ? serviceData.service.title : "N/A",
                            status: applicationData.annexureData.status ? applicationData.annexureData.status : "N/A",
                            info_source: applicationData.annexureData.info_source ? applicationData.annexureData.info_source : "N/A",
                            verified_at: applicationData.annexureData.verified_at ? applicationData.annexureData.verified_at : "N/A",
                            color_status: applicationData.annexureData.color_status ? applicationData.annexureData.color_status : "N/A"
                        });
                        // Process serviceData if needed
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
            setServiceTitleValue(serviceTitleValue);

            // Wait for all service fetches to complete
            const allServiceData = await Promise.all(serviceFetchPromises);

            setPdfData(applications);
            const cmtData = data.CMTData;
            setCmtAllData(cmtData);

            // Create the PDF
            const element = printRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('portrait', 'pt', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            let imgHeight = (canvasHeight * pdfWidth) / canvasWidth;
            let heightLeft = imgHeight;
            let position = 0;

            // Define margin for spacing
            const margin = 20; // Adjust as needed

            // Add first page
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= (pdfHeight + margin); // Adjust height left to include margin

            // Add remaining pages
            while (heightLeft > 0) {
                position = heightLeft - imgHeight - margin; // Adjust position for spacing
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= (pdfHeight + margin); // Adjust height left to include margin
            }

            // Save the PDF
            pdf.save('table.pdf');

        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to load client data');
        } finally {
            setLoading(false);
        }
    };


    const fetchCustomers = () => {
        const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
        const storedToken = localStorage.getItem("_token");

        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json' // Optional, may not be needed for GET
            },
            redirect: "follow"
        };

        fetch(`https://goldquestreact.onrender.com/client-master-tracker/customer-info?customer_id=${applicationData[0]?.customer_id}&admin_id=${admin_id}&_token=${storedToken}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Assuming the response is JSON
            }).then((data) => {
                setParentCustomer(data.customers)
            })

            .catch((error) => console.error('Error fetching customers:', error));
    };
    // console.log(serviceTitleValue);
    useEffect(() => {

        fetchCustomers();
    }, [fetchCustomers])

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
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize"><button className="bg-green-500 hover:bg-green-400 rounded-md p-3 text-white" onClick={() => handleDownloadPdf(item.id, item.branch_id)}>Download Report</button></td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.overall_status}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">
                                            <button className="bg-green-400 rounded-md text-white p-3" onClick={() => generateReport(item.id, item.services)}>Generate Report</button>
                                        </td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">
                                            <button
                                                className="bg-green-500 hover:bg-green-400 rounded-md p-3 text-white"
                                                onClick={() => handleToggle(index, item.services, item.id)}
                                            >
                                                {expandedRows === index ? "Hide Details" : "View More"}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedRows === index && (
                                        <tr>
                                            <td colSpan="9" className="p-0">
                                                <div className='collapseMenu overflow-auto w-full max-w-[1500px]'>
                                                    <table className="min-w-full max-w-full bg-gray-100">
                                                        <thead>
                                                            <tr>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">TAT Day</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Batch No</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Subclient</th>
                                                                {dbHeadingsStatus[item.id]?.map((value, index) => (
                                                                    <th key={index} className="service-th text-center">{value?.db_table || 'N/A'}</th>
                                                                ))}

                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.tatday}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.batch_number}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.sub_client}</td>
                                                                {dbHeadingsStatus[item.id]?.map((value, index) => (
                                                                    <td key={index} className="service-th text-right">{value?.status || 'N/A'}</td>
                                                                ))}

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
            <div ref={printRef} style={{ padding: '70px', backgroundColor: '#fff', marginBottom: '20px', width: '100%', margin: '0 auto' }}>
                <img src="https://i0.wp.com/goldquestglobal.in/wp-content/uploads/2024/03/goldquestglobal.png?w=771&ssl=1" alt="" style={{ width: '200px' }} />

                <h1 style={{ textAlign: 'center', paddingBottom: '20px', fontWeight: '700', fontSize: '30px' }}>CONFIDENTIAL BACKGROUND VERIFICATION REPORT</h1>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>

                        <tr>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Name of the Candidate               </th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{pdfData?.name || ' N/A'}</td>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>Client Name</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{parentCustomer[0]?.name || ' N/A'}</td>
                        </tr>
                        <tr>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>Application ID</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{pdfData?.application_id || ' N/A'}</td>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>Report Status</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> {cmtAllData?.report_status || ' N/A'}</td>
                        </tr>
                        <tr>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Date of Birth</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> {cmtAllData?.dob
                                ? new Date(cmtAllData.dob).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                : 'N/A'}</td>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>Application Received</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>  {pdfData?.updated_at
                                ? new Date(pdfData.updated_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                : 'N/A'}</td>
                        </tr>
                        <tr>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Candidate Employee ID</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{pdfData?.employee_id || ' N/A'}</td>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>Insuff Cleared/Reopened</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap', border: '1px solid #ccc' }}>{pdfData?.application_id || ' N/A'}</td>
                        </tr>
                        <tr>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Report Type</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{cmtAllData?.report_type || ' N/A'}</td>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>  Final Report Date</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> {cmtAllData?.report_date
                                ? new Date(cmtAllData.report_date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                : 'N/A'}</td>

                        </tr>
                        <tr>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Verification Purpose</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{pdfData?.overall_status || ' N/A'}</td>
                            <th style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>  Overall Report Status</th>
                            <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{pdfData?.status || ' N/A'}</td>

                        </tr>

                    </thead>

                </table>
                <br />
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    border: '1px solid #000',
                                    padding: '12px', fontSize: '17px',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    backgroundColor: '#22c55e',
                                    color: '#fff',
                                    borderBottom: '0px',
                                }}
                            >
                                REPORT COMPONENTS
                            </th>
                            <th
                                style={{
                                    border: '1px solid #000',
                                    padding: '12px', fontSize: '17px',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    backgroundColor: '#22c55e',
                                    color: '#fff',
                                    borderBottom: '0px',
                                }}
                            >
                                INFORMATION SOURCE
                            </th>
                            <th
                                colSpan={2}
                                style={{
                                    border: '1px solid #000',
                                    borderBottom: '0px',
                                    padding: '12px', fontSize: '17px',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    backgroundColor: '#22c55e',
                                    color: '#fff',
                                }}
                            >
                                COMPONENT STATUS
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={2} style={{
                                padding: '12px', fontSize: '17px',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                backgroundColor: '#22c55e',
                                color: '#fff',
                            }}></th>
                            <th style={{
                                border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'center',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                backgroundColor: '#22c55e',
                                color: '#fff',
                            }}>Completed Date</th>
                            <th style={{
                                border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'center',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                backgroundColor: '#22c55e',
                                color: '#fff',
                            }}>Verification Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            serviceTitleValue.map(item => (
                                <tr key={item.title}> {/* Use a unique key for each row */}
                                    <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>
                                        {item.title}
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>
                                        {item.info_source} {/* You can replace this with the actual name if available */}
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'center' }}>
                                        {item.verified_at
                                            ? new Date(item.verified_at).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })
                                            : 'N/A'}
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '12px', fontSize: '17px', textAlign: 'center' }}>
                                        {item.status.replace(/[_-]/g, ' ')}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>


                <h2 style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}> End of summary report</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', border: '1px solid #000' }}>
                    <thead>
                        <tr>
                            <th style={{ borderLeft: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%" }}>COMPONENT STATUS </th>
                            <th style={{ borderLeft: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%", gap: '15px' }}> <div style={{ height: '30px', width: '20px', backgroundColor: 'green' }}></div>REPORT COMPONENTS</th>
                            <th style={{ borderLeft: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%", gap: '15px' }}> <div style={{ height: '30px', width: '20px', backgroundColor: 'red' }}></div>INFORMATION SOURCE</th>
                            <th style={{ borderLeft: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%", gap: '15px' }}> <div style={{ height: '30px', width: '20px', backgroundColor: 'orange' }}></div>COMPONENT STATUS  </th>
                            <th style={{ borderLeft: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%", gap: '15px' }}> <div style={{ height: '30px', width: '20px', backgroundColor: 'pink' }}></div>COMPONENT STATUS  </th>
                            <th style={{ borderLeft: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%", gap: '15px' }}> <div style={{ height: '30px', width: '20px', backgroundColor: 'yellow' }}></div>COMPONENT STATUS  </th>
                        </tr>
                    </thead>
                </table>
                <h3 style={{ padding: '10px', border: '1px solid #000', backgroundColor: '#22c55e', width: '100%', color: '#fff', marginTop: '30px', textAlign: 'center', fontWeight: 'bold' }}>POLICE VERIFICATION</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', borderTop: '0px', padding: '20px' }}>
                    <tbody>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '20px', backgroundColor: '#ccc' }}>
                            <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}> Application Details</h3>
                            <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>Report Details</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '20px' }}>

                            <div>


                                <tr>
                                    <th style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Reference number </th>
                                    <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{pdfData?.application_id || ' N/A'}</td>

                                </tr>
                                <tr>
                                    <th style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>Client Name</th>
                                    <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{parentCustomer[0]?.name || ' N/A'}</td></tr>
                                <tr>
                                    <th style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Date of birth</th>
                                    <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> {cmtAllData?.dob
                                        ? new Date(cmtAllData.dob).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                        : 'N/A'}</td>

                                </tr>
                                <tr>
                                    <th style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>Father name</th>
                                    <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{cmtAllData?.father_name || ' N/A'}</td></tr>
                                <tr>
                                    <th style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Address1</th>
                                    <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{cmtAllData?.address || ' N/A'}</td>
                                </tr>
                            </div>

                            <div>

                                <tr>
                                    <th style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Reference number </th>
                                    <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{pdfData?.application_id || ' N/A'}</td>

                                </tr>
                                <tr>
                                    <th style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>Client Name</th>
                                    <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{parentCustomer[0]?.name || ' N/A'}</td></tr>
                                <tr>
                                    <th style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Date of birth</th>
                                    <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{cmtAllData?.dob
                                        ? new Date(cmtAllData.dob).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                        : 'N/A'}</td>

                                </tr>
                                <tr>
                                    <th style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>Father name</th>
                                    <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{cmtAllData?.father_name || ' N/A'}</td></tr>
                                <tr>
                                    <th style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}> Address1</th>
                                    <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', whiteSpace: 'nowrap' }}>{cmtAllData?.address || ' N/A'}</td>
                                </tr>
                            </div>
                        </div>


                    </tbody>

                </table>
                <p style={{ border: "1px solid #000", borderTop: '0px', padding: '10px' }}><b>Remarks</b>: The following applicant details are verbally verified by Mr. Prashant Vishwas, (Head Constable), and the notary
                    report duly stamped and signed by Mr.Harsh Shukla (Advocate)with comment on criminal record not found, Hence
                    closing the check as GREEN and the same is furnished as annexure.</p>
                <b> Annexure - 1 (A) </b>

                <div style={{ textAlign: 'center', }}>
                    <h5 style={{ textTransform: 'uppercase' }}>Lorem, ipsum dolor.</h5>
                    <h5 style={{ textTransform: 'uppercase' }}>Lorem ipsum dolor sit amet consectetur.</h5>
                    <h5 style={{ textTransform: 'uppercase' }}>Lorem ipsum dolor sit.</h5>
                    <hr />
                </div>
                <h5 style={{ textAlign: 'center', fontWeight: '700', marginTop: '30px', marginBottom: '10px', textDecoration: 'underline' }}>POLICE VERIFICATION REPORT</h5>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>APPLICATION ID</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{pdfData?.name || ' N/A'}</td>
                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>FATHER NAME</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{cmtAllData?.father_name || ' N/A'}</td>

                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>DATE OF BIRTH</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{cmtAllData?.dob
                                ? new Date(cmtAllData.dob).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                : 'N/A'}</td>

                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>ADDRESS OF THE APPLICANT</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{cmtAllData?.address || ' N/A'}</td>

                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE POLICE STATION OFFICER </th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{pdfData?.name || ' N/A'}</td>

                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE  STATION HOUSE OFFICER </th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{pdfData?.name || ' N/A'}</td>

                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>POLICE STATION CONTACT NUMBER</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{pdfData?.name || ' N/A'}</td>

                        </tr>

                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>VERIFICATION STATUS</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{cmtAllData?.final_verification_status || ' N/A'}</td>

                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>VERIFIED DATE</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}> {cmtAllData?.updated_at
                                ? new Date(cmtAllData.updated_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                : 'N/A'}</td>

                        </tr>   <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>VERIFIER NAME AND DESIGNATION</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{pdfData?.name || ' N/A'}</td>

                        </tr>


                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <h4 style={{ textAlign: 'center' }}>Executive Summary</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>

                    <thead>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>CIVIL COURT VERIFICATION</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{pdfData?.name || ' N/A'}</td>
                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>SESSIONS COURT VERIFICATION</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{pdfData?.name || ' N/A'}</td>

                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>MAGISTRATE COURT VERIFICATION</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{pdfData?.name || ' N/A'}</td>

                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>HIGH COURT VERIFICATION</th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{pdfData?.name || ' N/A'}</td>

                        </tr>
                        <tr>
                            <th style={{ width: '35%', border: "1px solid #000", padding: '12px', fontSize: '17px', textAlign: 'left', borderRight: '1px solid #000', }}>SUPREME COURT OF INDIA VERIFICATION </th>
                            <td style={{ padding: '12px', fontSize: '17px', textAlign: 'left', border: '1px solid #000' }}>{pdfData?.name || ' N/A'}</td>

                        </tr>
                    </thead>
                </table>

                <h4 style={{ textTransform: 'uppercase', textAlign: 'left', fontSize: "24px", marginTop: '20px', fontWeight: 'bold', paddingBottom: '10px' }}>conclusion</h4>
                <p style={{ fontSize: '16px', fontWeight: '400', paddingBottom: '15px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit facere enim quidem dolorem alias animi sapiente at quisquam quam eveniet dolor, quo quos officiis, deserunt cupiditate minus necessitatibus, omnis blanditiis!</p>
                <h4 style={{ textTransform: 'uppercase', textAlign: 'left', fontSize: "24px", fontWeight: 'bold', paddingBottom: '10px' }}>conclusion</h4>
                <p style={{ fontSize: '16px', fontWeight: '400', paddingBottom: '15px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit facere enim quidem dolorem alias animi sapiente at quisquam quam eveniet dolor, quo quos officiis, deserunt cupiditate minus necessitatibus, omnis blanditiis!</p>
                <h4 style={{ textTransform: 'uppercase', textAlign: 'left', fontSize: "24px", fontWeight: 'bold', paddingBottom: '10px' }}>conclusion</h4>
                <p style={{ fontSize: '16px', fontWeight: '400', paddingBottom: '15px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit facere enim quidem dolorem alias animi sapiente at quisquam quam eveniet dolor, quo quos officiis, deserunt cupiditate minus necessitatibus, omnis blanditiis!</p>

                <div>
                    <button style={{ backgroundColor: 'green', color: "#fff", padding: '13px', width: '100%', borderRadius: '10px', marginBottom: '15px' }}>Disclaimer</button>
                    <p>This report is confidential and is meant for the exclusive use of the Client. This report has been prepared solely for the
                        purpose set out pursuant to our letter of engagement (LoE)/Agreement signed with you and is not to be used for any
                        other purpose. The Client recognizes that we are not the source of the data gathered and our reports are based on the
                        information purpose. The Client recognizes that we are not the source of the data gathered and our reports are based on
                        the information responsible for employment decisions based on the information provided in this report. </p>
                    <button style={{ border: '1px solid #000', padding: '13px', width: '100%', borderRadius: '10px', marginTop: '15px' }}>End of detail report</button>
                </div>
            </div>


        </>



    );
};

export default ExelTrackerStatus;

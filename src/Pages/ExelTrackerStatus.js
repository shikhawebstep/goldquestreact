import React, { useCallback, useEffect, useState ,useContext} from 'react'
import { useApi } from '../ApiContext';
import Swal from 'sweetalert2';
import { BranchContextExel } from './BranchContextExel';

const ExelTrackerStatus = () => {
    const { branch_id } = useContext(BranchContextExel);
    const [applicationData, setApplicationData] = useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const API_URL = useApi();
    const [loading, setLoading] = useState(false);
    const [, setError] = useState(null);
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
   
    const fetchApplications = useCallback(() => {
        const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
        const storedToken = localStorage.getItem("_token");
        setLoading(true)
        fetch(`${API_URL}/client-master-tracker/applications-by-branch?branch_id=${branch_id}&admin_id=${admin_id}&_token=${storedToken}`, requestOptions)
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
            }).then((data) => {
                const newToken = data._token || data.token;
                if (newToken) {
                    localStorage.setItem("_token", newToken);
                }
                setApplicationData(data.customers || [])
            }).catch((error) => {
                console.error('Fetch error:', error);
                setError('Failed to load data');
            })
            .finally(() => setLoading(false));

    }, []);
    useEffect(() => {
        fetchApplications();
    }, [fetchApplications])

    const handleToggle = (index) => {
        const newExpandedRows = expandedRows.includes(index)
            ? expandedRows.filter((row) => row !== index)
            : [...expandedRows, index];
        setExpandedRows(newExpandedRows);
    };

    const deleteItem = () => {

    }
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
                                <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">Report Date</th>
                                <th className="py-3 px-4 border-b text-center uppercase whitespace-nowrap text-white">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicationData.map((item, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">
                                            <input type="checkbox" name="" id="" className='me-2' />{index+1}
                                        </td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.id}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.name}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.employee_id}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.created_at}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.d_status}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.overall_status}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">{item.report_date}</td>
                                        <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap capitalize">
                                            <button
                                                className="bg-green-500 hover:bg-green-400 rounded-md p-3 text-white"
                                                onClick={() => handleToggle(index)}
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
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">TAT Day</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Batch No</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Subclient</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Employment 1</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Employment 2</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Location Name </th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">EX-EMPLOYMENT-2</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">PREVIOUS EMPLOYMENT-3	</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">PREVIOUS EMPLOYMENT-4</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">PREVIOUS EMPLOYMENT-5</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">PREVIOUS EMPLOYMENT-6</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">PREVIOUS EMPLOYMENT-7</th>
                                                                <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.tatday}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.batch_number}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.sub_client}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.EMPLOYMENT1}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.EMPLOYMENT2}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.location}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_3}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_4}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_5}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_6}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_7}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.prev_emp_8}</td>
                                                                <td className="py-3 px-4 border-b whitespace-nowrap capitalize"><button className="bg-red-500 hover:bg-red-400 text-white rounded-md p-3 " onClick={deleteItem}>Delete</button></td>

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
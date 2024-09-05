import React,{useState} from 'react'
import Header from '../Dashboard/Header';
const ExelTrackerStatus = () => {
    const [expandedRows, setExpandedRows] = useState([]);

    const statusData = [
        {
            sl: "1",
            id: "GQ-NLT-9",
            applicant_name: "Neelakumar M",
            applicant_id: "	NA",
            iniation_date: "29-07-2024",
            d_status: "	NOT READY",
            overall_status: "WIP",
            report_date: "22-06-2024",
            tatday: "3",
            batchno: "EQC-31",
            subclient: "S mahajan",
            locationname: "sdfgh",
            EMPLOYMENT1: "23",
            EMPLOYMENT2: "45yhy",
            prev_emp_2:"null",
            prev_emp_3:"null",
            prev_emp_4:"null",
            prev_emp_5:"null",
            prev_emp_6:"null",
            prev_emp_7:"null",
            prev_emp_8:"null",


        },
        {
            sl: "2",
            id: "GQ-NLT-8",
            applicant_name: "Kumaresan S",
            applicant_id: " NA",
            iniation_date: "29-07-2024",
            d_status: "	NOT READY",
            overall_status: "INSUFF",
            report_date: "22-06-2024",
            tatday: "3",
            batchno: "EQC-31",
            subclient: "S mahajan",
            locationname: "sdfgh",
            EMPLOYMENT1: "23",
            EMPLOYMENT2: "45yhy",
            prev_emp_2:"null",
            prev_emp_3:"null",
            prev_emp_4:"null",
            prev_emp_5:"null",
            prev_emp_6:"null",
            prev_emp_7:"null",
            prev_emp_8:"null",

        },
        {
            sl: "3",
            id: "GQ-NLT-7",
            applicant_name: "Dhamothar P",
            applicant_id: " NA",
            iniation_date: "29-07-2024",
            d_status: "	NOT READY",
            overall_status: "WIP",
            report_date: "22-06-2024",
            tatday: "3",
            batchno: "EQC-31",
            subclient: "S mahajan",
            locationname: "sdfgh",
            EMPLOYMENT1: "23",
            EMPLOYMENT2: "45yhy",
            prev_emp_2:"null",
            prev_emp_3:"null",
            prev_emp_4:"null",
            prev_emp_5:"null",
            prev_emp_6:"null",
            prev_emp_7:"null",
            prev_emp_8:"null",

        },
        {
            sl: "4",
            id: "GQ-NLT-7",
            applicant_name: "Dhamothar P",
            applicant_id: " NA",
            iniation_date: "29-07-2024",
            d_status: "	NOT READY",
            overall_status: "WIP",
            report_date: "22-06-2024",
            tatday: "3",
            batchno: "EQC-31",
            subclient: "S mahajan",
            locationname: "sdfgh",
            EMPLOYMENT1: "23",
            EMPLOYMENT2: "45yhy",
            prev_emp_2:"null",
            prev_emp_3:"null",
            prev_emp_4:"null",
            prev_emp_5:"null",
            prev_emp_6:"null",
            prev_emp_7:"null",
            prev_emp_8:"null",

        },
        {
            sl: "5",
            id: "GQ-NLT-7",
            applicant_name: "Dhamothar P",
            applicant_id: " NA",
            iniation_date: "29-07-2024",
            d_status: "	NOT READY",
            overall_status: "WIP",
            report_date: "22-06-2024",
            tatday: "3",
            batchno: "EQC-31",
            subclient: "S mahajan",
            locationname: "sdfgh",
            EMPLOYMENT1: "23",
            EMPLOYMENT2: "45yhy",
            prev_emp_2:"null",
            prev_emp_3:"null",
            prev_emp_4:"null",
            prev_emp_5:"null",
            prev_emp_6:"null",
            prev_emp_7:"null",
            prev_emp_8:"null",

        },
        {
            sl: "6",
            id: "GQ-NLT-7",
            applicant_name: "Dhamothar P",
            applicant_id: " NA",
            iniation_date: "29-07-2024",
            d_status: "	NOT READY",
            overall_status: "WIP",
            report_date: "22-06-2024",
            tatday: "3",
            batchno: "EQC-31",
            subclient: "S mahajan",
            locationname: "sdfgh",
            EMPLOYMENT1: "23",
            EMPLOYMENT2: "45yhy",
            prev_emp_2:"null",
            prev_emp_3:"null",
            prev_emp_4:"null",
            prev_emp_5:"null",
            prev_emp_6:"null",
            prev_emp_7:"null",
            prev_emp_8:"null",

        },

    ];
    const handleToggle = (index) => {
        const newExpandedRows = expandedRows.includes(index)
            ? expandedRows.filter((row) => row !== index)
            : [...expandedRows, index];
        setExpandedRows(newExpandedRows);
    };

    const deleteItem=()=>{
        
    }
    return (
        <>
       <div><Header />
       <div className="overflow-x-auto my-14 mx-4 bg-white shadow-md rounded-md">
            
       <table className="min-w-full">
           <thead>
               <tr className='bg-green-500'>
                   <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">SL NO</th>
                   <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">Application ID</th>
                   <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">NAME OF THE APPLICANT</th>
                   <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">APPLICANT EMPLOYEE ID</th>
                   <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">Initiation Date</th>
                   <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">DOWNLOAD STATUS</th>
                   <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">Overall Status</th>
                   <th className="py-3 px-4 border-b text-left border-r-2 uppercase whitespace-nowrap text-white">Report Date</th>
                   <th className="py-3 px-4 border-b text-center uppercase whitespace-nowrap text-white">Action</th>
               </tr>
           </thead>
           <tbody>
               {statusData.map((item, index) => (
                   <React.Fragment key={index}>
                       <tr>
                           <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap">
                               <input type="checkbox" name="" id="" className='me-2' />{item.sl}
                           </td>
                           <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap">{item.id}</td>
                           <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap">{item.applicant_name}</td>
                           <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap">{item.applicant_id}</td>
                           <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap">{item.iniation_date}</td>
                           <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap">{item.d_status}</td>
                           <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap">{item.overall_status}</td>
                           <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap">{item.report_date}</td>
                           <td className="py-3 px-4 border-b border-r-2 whitespace-nowrap">
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
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">TAT Day</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">Batch No</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">Subclient</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">Employment 1</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">Employment 2</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">Location Name </th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">EX-EMPLOYMENT-2</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">PREVIOUS EMPLOYMENT-3	</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">PREVIOUS EMPLOYMENT-4</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">PREVIOUS EMPLOYMENT-5</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">PREVIOUS EMPLOYMENT-6</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">PREVIOUS EMPLOYMENT-7</th>
                                                   <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap ">Action</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                               <tr>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.tatday}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.batchno}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.subclient}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.EMPLOYMENT1}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.EMPLOYMENT2}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.prev_emp_2}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.prev_emp_3}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.prev_emp_4}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.prev_emp_5}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.prev_emp_6}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.prev_emp_7}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap">{item.prev_emp_8}</td>
                                                   <td className="py-3 px-4 border-b whitespace-nowrap"><button className="bg-red-500 hover:bg-red-400 text-white rounded-md p-3 " onClick={deleteItem}>Delete</button></td>

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
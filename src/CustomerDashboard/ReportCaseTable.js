import React, { useContext, useEffect, useState } from 'react';
import PaginationContext from '../Pages/PaginationContext';
import Pagination from '../Pages/Pagination';
import { useMemo } from 'react';

const ReportCaseTable = () => {
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);

    const [expandedRows, setExpandedRows] = useState([]);

    const ReportData =useMemo(()=> [
        { sl: "1",id: "GQ-NLT-9", applicant_name: "Neelakumar M", applicant_id: "	NA", iniation_date: "29-07-2024", report_date: "22-06-2024",let_em: "NIL",ex_em: "NIL", prev_emp_3:"null",prev_emp_4:"null",prev_emp_5:"null", per_add:"WIP",cur_add:"NIL",post_garduation:"WIP",graduation:"NIL",twelth:"NIL",tenth:"NIL",diploama:"NIL", nat_identity:"COMPLETED GREEN",nat_identity2:"NIL", overall_status:"WIP" },
        { sl: "1",id: "GQ-NLT-9", applicant_name: "Neelakumar M", applicant_id: "	NA", iniation_date: "29-07-2024", report_date: "22-06-2024",let_em: "NIL",ex_em: "NIL", prev_emp_3:"null",prev_emp_4:"null",prev_emp_5:"null", per_add:"WIP",cur_add:"NIL",post_garduation:"WIP",graduation:"NIL",twelth:"NIL",tenth:"NIL",diploama:"NIL", nat_identity:"COMPLETED GREEN",nat_identity2:"NIL", overall_status:"WIP" },
        { sl: "1",id: "GQ-NLT-9", applicant_name: "Neelakumar M", applicant_id: "	NA", iniation_date: "29-07-2024", report_date: "22-06-2024",let_em: "NIL",ex_em: "NIL", prev_emp_3:"null",prev_emp_4:"null",prev_emp_5:"null", per_add:"WIP",cur_add:"NIL",post_garduation:"WIP",graduation:"NIL",twelth:"NIL",tenth:"NIL",diploama:"NIL", nat_identity:"COMPLETED GREEN",nat_identity2:"NIL", overall_status:"WIP" },
       
    ],[]);
    const [paginated, setPaginated] = useState([]);

    useEffect(() => {
        setTotalResults(ReportData.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(ReportData.slice(startIndex, endIndex));
    }, [currentItem, setTotalResults,ReportData,showPerPage]);

    const handleToggle = (index) => {
        const newExpandedRows = expandedRows.includes(index)
            ? expandedRows.filter((row) => row !== index)
            : [...expandedRows, index];
        setExpandedRows(newExpandedRows);
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
                                        <input type="checkbox" name="" id="" className='me-2' />{item.sl}
                                    </td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.id}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.applicant_name}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.applicant_id}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.iniation_date}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.report_date}</td>
                                    <td className="py-3 px-4 border-b border-r text-center whitespace-nowrap">
                                        <button
                                            className="bg-green-500 hover:bg-green-400 rounded-md p-2 px-3 text-white"
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
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">LATEST EMPLOYMENT-1</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">EX-EMPLOYMENT-2</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">PREVIOUS EMPLOYMENT-3</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">PREVIOUS EMPLOYMENT-4</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">PREVIOUS EMPLOYMENT-5</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">PERMANENT ADDRESS</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">CURRENT ADDRESS</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">POST GRADUATION	</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">GRADUATION</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">12TH-STD</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">10TH-STD</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">DIPLOMA / ITI</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">NATIONAL IDENTITY-1</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">NATIONAL IDENTITY-2</th>
                                                            <th className="py-3 px-4 border-b text-center text-sm uppercase whitespace-nowrap ">Overall Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.let_em}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.ex_em}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.prev_emp_3}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.prev_emp_4}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.prev_emp_5}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.per_add}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.cur_add}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.post_garduation}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.graduation}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.twelth}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.tenth}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.diploama}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.nat_identity}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.nat_identity2}</td>
                                                            <td className="py-3 px-4 border-b whitespace-nowrap text-center">{item.overall_status}</td>
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
            <Pagination/>
        </>
    );
};

export default ReportCaseTable;
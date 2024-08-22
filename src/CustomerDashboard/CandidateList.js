import React, { useContext, useEffect, useMemo, useState } from 'react';
import PaginationContext from '../Pages/PaginationContext';
import Pagination from "../Pages/Pagination";
const CandidateList = () => {
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);
    const reports = useMemo(()=> [
        {
            num: "01",
            applicantName: "Imran Umarsab Kerehittal",
            emailid: "demo@gmail.com",
            mobile_num: "6754328657",
            services: "latest employeement",
            doc: "Docs view",
            app_date: "23/-06/2024 12:34 pm",
            more: "view more",
            rbgv: "_RBGV",
            specialbgv: "SBGV",
            spoc: "soujnya",
            link: "-link-",
            edit: "edit",
        },
    
     
       
    ],[]);
    const [paginated, setPaginated] = useState([]);

    useEffect(() => {
        setTotalResults(reports.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(reports.slice(startIndex, endIndex));
    }, [currentItem, setTotalResults,reports,showPerPage]);
    return (
        <>
            <div className="overflow-x-auto py-6 px-4 bg-white shadow-md rounded-md md:m-10 m-3">
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-green-500'>
                            <th className="py-3 text-left border-r border-l text-white  px-4 border-b whitespace-nowrap uppercase">SL NO.</th>
                            <th className="py-3 text-left border-r text-white  px-4 border-b whitespace-nowrap uppercase">Name of the applicant</th>
                            <th className="py-3 text-left border-r text-white  px-4 border-b whitespace-nowrap uppercase">Email Id</th>
                            <th className="py-3 text-left border-r text-white  px-4 border-b whitespace-nowrap uppercase">Mobile Number</th>
                            <th className="py-3 text-left border-r text-white  px-4 border-b whitespace-nowrap uppercase">Services</th>
                            <th className="py-3 text-left border-r text-white  px-4 border-b whitespace-nowrap uppercase">Regular Bgv</th>
                            <th className="py-3 text-left border-r text-white  px-4 border-b whitespace-nowrap uppercase">Special Bgv</th>
                            <th className="py-3 text-left border-r text-white  px-4 border-b whitespace-nowrap uppercase">Docs</th>
                            <th className="py-3 text-left border-r text-white  px-4 border-b whitespace-nowrap uppercase">Date/Time</th>
                            <th className="py-3 text-center px-4 text-white border-r border-b whitespace-nowrap uppercase">Action</th>
                            <th className="py-3 text-left border-r text-white  px-4 border-b whitespace-nowrap uppercase">Address Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((report, index) => (
                            <tr key={index}>
                                <td className="py-3 px-4 border-l border-b border-r whitespace-nowrap">{report.num}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.applicantName}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.emailid}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.mobile_num}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">
                                    {report.services} <button className="block text-blue-600">{report.more}</button>
                                </td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.rbgv}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.specialbgv}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">
                                    <button className="bg-green-600 text-white p-2  rounded-md hover:bg-green-200">{report.doc}</button>
                                </td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.app_date}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center">
                                    <button className="bg-green-600 text-white p-3  rounded-md hover:bg-green-200">{report.edit}</button>
                                </td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center">{report.link}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination/>
        </>
    );
};

export default CandidateList;

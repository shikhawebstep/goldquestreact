import React, { useContext, useEffect, useState } from 'react';
import PaginationContext from '../Pages/PaginationContext';
import Pagination from '../Pages/Pagination';
const DropBoxList = () => {
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);
    const reports = [
        {
            num: '01',
            photo: "26-06-2024",
            applicationId: "GQ-MANYATA-461",
            applicantName: "Imran Umarsab Kerehittal Shek",
            app_date:"23/-06/2024 12:34 pm",
            location:"4",
            batchno:"345678",
            subclient:'46667',
            doc:"Docs view",
            services:"latest employeement",
            more:"view more",
            rbgv:"_RBGV",
            specialbgv:"SBGV",
            spoc: "soujnya",
            id: "55666",
            edit:"edit",
            delete:"delete",
        },
        {
            num: '02',
            photo: "26-06-2024",
            applicationId: "GQ-MANYATA-462",
            applicantName: "Imran Umarsab Kerehittal Shek",
            app_date:"23/-06/2024 12:34 pm",
            location:"4",
            batchno:"345678",
            subclient:'46667',
            doc:"Docs view",
            services:"latest employeement",
            more:"view more",
            rbgv:"_RBGV",
            specialbgv:"SBGV",
            spoc: "soujnya",
            id: "55666",
            edit:"edit",
            delete:"delete",
        },
        {
            num: '03',
            photo: "26-06-2024",
            applicationId: "GQ-MANYATA-463",
            applicantName: "Imran Umarsab Kerehittal Shek",
            app_date:"23/-06/2024 12:34 pm",
            location:"4",
            batchno:"345678",
            subclient:'46667',
            doc:"Docs view",
            services:"latest employeement",
            more:"view more",
            rbgv:"_RBGV",
            specialbgv:"SBGV",
            spoc: "soujnya",
            id: "55666",
            edit:"edit",
            delete:"delete",
        },
        {
            num: '04',
            photo: "26-06-2024",
            applicationId: "GQ-MANYATA-464",
            applicantName: "Imran Umarsab Kerehittal Shek",
            app_date:"23/-06/2024 12:34 pm",
            location:"4",
            batchno:"345678",
            subclient:'46667',
            doc:"Docs view",
            services:"latest employeement",
            more:"view more",
            rbgv:"_RBGV",
            specialbgv:"SBGV",
            spoc: "soujnya",
            id: "55666",
            edit:"edit",
            delete:"delete",
        },
        {
            num: '05',
            photo: "26-06-2024",
            applicationId: "GQ-MANYATA-465",
            applicantName: "Imran Umarsab Kerehittal Shek",
            app_date:"23/-06/2024 12:34 pm",
            location:"4",
            batchno:"345678",
            subclient:'46667',
            doc:"Docs view",
            services:"latest employeement",
            more:"view more",
            rbgv:"_RBGV",
            specialbgv:"SBGV",
            spoc: "soujnya",
            id: "55666",
            edit:"edit",
            delete:"delete",
        },
        {
            num: '06',
            photo: "26-06-2024",
            applicationId: "GQ-MANYATA-466",
            applicantName: "Imran Umarsab Kerehittal Shek",
            app_date:"23/-06/2024 12:34 pm",
            location:"4",
            batchno:"345678",
            subclient:'46667',
            doc:"Docs view",
            services:"latest employeement",
            more:"view more",
            rbgv:"_RBGV",
            specialbgv:"SBGV",
            spoc: "soujnya",
            id: "55666",
            edit:"edit",
            delete:"delete",
        }
    ];
    const [paginated, setPaginated] = useState([]);

    useEffect(() => {
        setTotalResults(reports.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(reports.slice(startIndex, endIndex));
    }, [currentItem, setTotalResults]);
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
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Regular Bgv</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Special Bgv</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Spoc Case Name</th>
                            <th className="py-3 text-left text-white border-r px-4 border-b whitespace-nowrap uppercase">Employee Id</th>
                            <th className="py-3 text-center text-white px-4 border-b whitespace-nowrap uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((report, index) => (
                            <tr key={index}>
                                <td className="py-3 px-4 border-b border-r text-center border-l whitespace-nowrap">{report.num}</td>
                                <td className="py-3 px-4 border-b border-r text-center whitespace-nowrap">{report.photo}</td>
                                <td className="py-3 px-4 border-b border-r text-center whitespace-nowrap">{report.applicationId}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.applicantName}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.app_date}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.location}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.batchno}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.subclient}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap"><button className="bg-green-600 text-white p-2  rounded-md hover:bg-green-200">{report.doc}</button></td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center">{report.services} <button className='block text-blue-600 text-center'>{report.more}</button></td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.rbgv}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.specialbgv}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center">{report.spoc}</td>
                                <td className="py-3 px-4 border-b border-r whitespace-nowrap">{report.id}</td>
                                <td className="py-3 px-4 border-b whitespace-nowrap border-r">
                                <button className="bg-green-600 text-white p-3  rounded-md hover:bg-green-200">{report.edit}</button>
                                    <button className="bg-red-600 text-white p-3  ms-2 rounded-md hover:bg-red-200">{report.delete}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination/>
        </>
    )
}

export default DropBoxList
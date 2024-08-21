import React, { useContext, useEffect, useState } from 'react';
import PaginationContext from './PaginationContext';
import SearchBar from './SearchBar'
import Pagination from './Pagination'
const ClientManagementList = () => {
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);
    const listData = [
        { SL: "01", c_code: "NA_2423", company_name: "Antraweb Technologies Pvt Ltd", client_spoc: 'Manjunath', service_agr: "14",contact_person: "Check In", role:"na",mobile:786865885,client_standard:"client standard",services:"service_2",r_bgv:"",s_bgv:""  },
        { SL: "02", c_code: "NA_2423", company_name: "Waterwala Labs Pvt Ltd", client_spoc: 'Raj Kumar', service_agr: "124",contact_person: "Check In", role:"na",mobile:786865885,client_standard:"client standard",services:"service_2",r_bgv:"",s_bgv:""  },
    ];
    const [paginated, setPaginated] = useState([]);

    useEffect(() => {
        setTotalResults(listData.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(listData.slice(startIndex, endIndex));
    }, [currentItem, setTotalResults]);


    return (
        <>
            <div className="bg-white m-4 md:m-24 shadow-md rounded-md p-3">
                <SearchBar />
                <div className="overflow-x-auto py-6 px-4">
                    <table className="min-w-full">
                        <thead>
                            <tr className='bg-green-500'>
                                <th className="py-3 px-4 border-b border-r border-l text-white text-left uppercase whitespace-nowrap">SL</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Client Code</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Company Name</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Name of Client Spoc</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Date of Service Agreement</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Contact Person</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Role</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Mobile</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Client Standard Procedure </th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Services</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Regular BGV</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Special BGV </th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-3 px-4 border-b border-l border-r text-left whitespace-nowrap"><input type="checkbox" name="" className='me-2' id="" />{item.SL}</td>
                                    <td className="py-3 px-4 border-b border-r text-center whitespace-nowrap">{item.c_code}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap">{item.company_name}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center">{item.client_spoc}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center text-bold cursor-pointer">{item.service_agr}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center text-bold cursor-pointer">{item.contact_person}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center text-bold cursor-pointer">{item.role}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center text-bold cursor-pointer">{item.mobile}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center text-bold cursor-pointer">{item.client_standard}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center text-bold cursor-pointer">{item.services}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center text-bold cursor-pointer">{item.r_bgv}</td>
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center text-bold cursor-pointer">{item.s_bgv}</td>
                                    <td className="py-3 px-4 border-b border-r text-center whitespace-nowrap">
                                    <button className='bg-red-600 hover:bg-red-200 rounded-md p-2 text-white mx-2'>Block</button>
                                    <button className='bg-green-600 hover:bg-red-200 rounded-md p-2 px-5 text-white'>edit</button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        </>
    )
}

export default ClientManagementList
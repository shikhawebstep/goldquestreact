import React, { useContext, useEffect, useMemo, useState } from 'react';
import PaginationContext from './PaginationContext';
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import { Link } from 'react-router-dom';
import { useApi } from '../ApiContext'; // use the custom hook

const ClientMasterTrackerList = () => {
    const API_BASE_URL = useApi();
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);
    const LoginData =useMemo(()=> [
        { SL: "01", c_code: "NA_2423", company_name: "Antraweb Technologies Pvt Ltd", client_spoc: 'Manjunath', active_case: "14",check_in: "Check In",  },
        { SL: "02", c_code: "NA_2423", company_name: "Waterwala Labs Pvt Ltd", client_spoc: 'Raj Kumar', active_case: "124",check_in: "Check In",  },
    ],[]);
    const [paginated, setPaginated] = useState([]);

    useEffect(() => {
        setTotalResults(LoginData.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(LoginData.slice(startIndex, endIndex));
    }, [currentItem, setTotalResults,LoginData,showPerPage]);
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
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Client Spoc</th>
                                <th className="py-3 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Active Cases</th>
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
                                    <td className="py-3 px-4 border-b border-r whitespace-nowrap text-center text-bold cursor-pointer">{item.active_case}</td>
                                    <td className="py-3 px-4 border-b border-r text-center whitespace-nowrap"><Link to='/trackerstatus'>
                                    <button className='bg-green-600 hover:bg-green-200 rounded-md p-2 text-white'>{item.check_in}</button></Link>
                                    <button className='bg-red-600 hover:bg-red-200 rounded-md p-2 text-white mx-2'>Delete</button>
                                    <button className='bg-green-600 hover:bg-red-200 rounded-md p-2 px-5 text-white'>Exel</button> </td>
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

export default ClientMasterTrackerList
import React, { useEffect, useState, useContext } from 'react';
import PaginationContext from './PaginationContext';
import Pagination from './Pagination';

const ClientManagementData = () => {
    const { setTotalResults, currentItem ,showPerPage} = useContext(PaginationContext);
    const Services = [
        { service_name: "LATEST EMPLOYMENT-3", },
        { service_name: "LATEST EMPLOYMENT-1", },
        { service_name: "LATEST EMPLOYMENT-1", },
        { service_name: "LATEST EMPLOYMENT-1", },
        { service_name: "LATEST EMPLOYMENT-3", },
        { service_name: "LATEST EMPLOYMENT-1", },
        { service_name: "LATEST EMPLOYMENT-1", },
        { service_name: "LATEST EMPLOYMENT-1", },
        
      
    ];

    const [paginated, setPaginated] = useState([]);

    useEffect(() => {
        setTotalResults(Services.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(Services.slice(startIndex, endIndex));
    }, [currentItem, setTotalResults]);

    return (
        <div className="overflow-x-auto py-6 px-4 bg-white mt-10 md:w-9/12 m-auto">
            <table className="min-w-full">
                <thead>
                    <tr className='bg-green-500'>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Services Name</th>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Price</th>
                        <th className="py-3 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Select Page</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((item, index) => (
                        <tr key={index}>
                            <td className="py-3 px-4 border-l border-r border-b whitespace-nowrap"><input type="checkbox" name="" id="" className='me-2'/>{item.service_name}</td>
                            <td className="py-3 px-4 border-r border-b whitespace-nowrap"></td>
                            <td className="py-3 px-4 border-r border-b whitespace-nowrap uppercase text-left">
                            <input type="checkbox" name="" id="" className='me-2'/>Regular BGV
                            <input type="checkbox" name="" id=""  className='me-2 ms-10'/>special BGV
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination/>
        </div>
    );
}

export default ClientManagementData;

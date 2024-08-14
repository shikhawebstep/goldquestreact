import React, { useEffect, useState, useContext } from 'react';
import PaginationContext from './PaginationContext';

const ServiceList = () => {
    const { setTotalResults, currentItem ,showPerPage} = useContext(PaginationContext);
    const Services = [
        { service_name: "LATEST EMPLOYMENT-3", display_name: "LATEST EMPLOYMENT-3" },
        { service_name: "LATEST EMPLOYMENT-1", display_name: "LATEST EMPLOYMENT-1" },
        { service_name: "LATEST EMPLOYMENT-1", display_name: "LATEST EMPLOYMENT-1" },
        { service_name: "LATEST EMPLOYMENT-1", display_name: "LATEST EMPLOYMENT-1" },
        
      
    ];

    const [paginated, setPaginated] = useState([]);

    useEffect(() => {
        setTotalResults(Services.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(Services.slice(startIndex, endIndex));
    }, [currentItem, setTotalResults,Services,showPerPage]);

    return (
        <div className="overflow-x-auto py-4 px-4">
            <table className="min-w-full">
                <thead>
                    <tr className='bg-green-500'>
                        <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Services Name</th>
                        <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Services Display Name</th>
                        <th className="py-2 px-4 text-white border-r border-b text-center uppercase whitespace-nowrap">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-l border-r border-b whitespace-nowrap">{item.service_name}</td>
                            <td className="py-2 px-4 border-r border-b whitespace-nowrap">{item.display_name}</td>
                            <td className="py-2 px-4 border-r border-b whitespace-nowrap text-center">
                                <button className='bg-green-500 rounded-md hover:bg-green-200 p-2 text-white'>Edit</button>
                                <button className='bg-red-600 rounded-md p-2 text-white ms-2'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceList;

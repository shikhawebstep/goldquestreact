import React, { useContext, useEffect, useState } from 'react';
import PaginationContext from './PaginationContext';
import Pagination from './Pagination';

const PackageManagementList = () => {
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);

    const PackageData = [
        { PackageName: "Package_name24", Services: "NA_2423", Message: "lorem ipsum dummy text! ispum dum loren ", edit: 'Edit', Delete: "Delete" },
        { PackageName: "Package_name12", Services: "NA_44", Message: "lorem ipsum dummy text! ispum dum loren ", edit: 'Edit', Delete: "Delete" },
        { PackageName: "Package_name165", Services: "NA_334", Message: "lorem ipsum dummy text! ispum dum loren ", edit: 'Edit', Delete: "Delete" },
        { PackageName: "Package_name24", Services: "_21234_NA", Message: "lorem ipsum dummy text! ispum dum loren ", edit: 'Edit', Delete: "Delete" },
        { PackageName: "Package_name455", Services: "NA_23435", Message: "lorem ipsum dummy text! ispum dum loren ", edit: 'Edit', Delete: "Delete" },
        { PackageName: "Package_name435", Services: "NA_24325", Message: "lorem ipsum dummy text! ispum dum loren ", edit: 'Edit', Delete: "Delete" }

    ];
    const [paginatedData, setPaginatedData] = useState([]);

    useEffect(() => {
      setTotalResults(PackageData.length);
  
      const startIndex = (currentItem - 1) * showPerPage;
      const endIndex = startIndex + showPerPage;
      setPaginatedData(PackageData.slice(startIndex, endIndex));
    }, [currentItem, showPerPage, PackageData, setTotalResults]);
    return (
        <>
            <div className="overflow-x-auto py-4 px-4">
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-green-500'>
                            <th className="py-2 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Package Name</th>
                            <th className="py-2 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Services</th>
                            <th className="py-2 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Description</th>
                            <th className="py-2 px-4 border-b border-r text-white text-left uppercase whitespace-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b border-r border-l whitespace-nowrap">{item.PackageName}</td>
                                <td className="py-2 px-4 border-b border-r  whitespace-nowrap">{item.Services}</td>
                                <td className="py-2 px-4 border-b border-r  whitespace-nowrap">{item.Message}</td>
                                <td className="py-2 px-4 border-b border-r  whitespace-nowrap"><button className='bg-green-500 hover:bg-green-200 rounded-md p-2 text-white'>{item.edit}</button> <button className='bg-red-600 rounded-md p-2 text-white'>{item.Delete}</button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination/>

        </>
    )
}

export default PackageManagementList
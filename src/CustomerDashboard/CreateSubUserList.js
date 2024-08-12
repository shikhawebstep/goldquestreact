import React, { useContext, useEffect, useState } from 'react';
import PaginationContext from '../Pages/PaginationContext';
import Pagination from '../Pages/Pagination';
const CreateSubUserList = () => {
    const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);

    const userList=[
        {
         sl:0,
         Username:"info@rightpick.co.in"
        },
    ]
    const [paginated, setPaginated] = useState([]);

    useEffect(() => {
        setTotalResults(userList.length);
        const startIndex = (currentItem - 1) * showPerPage;
        const endIndex = startIndex + showPerPage;
        setPaginated(userList.slice(startIndex, endIndex));
    }, [currentItem, setTotalResults,userList]);


    return (
        <>
       
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className='bg-green-500'>
                        <th className="py-3 px-4 border-b  border-r-2 text-white  text-left uppercase whitespace-nowrap">Sl No.</th>
                        <th className="py-3 px-4 border-b text-white  border-r-2 text-left uppercase whitespace-nowrap">username</th>
                        <th className="py-3 px-4 border-b  text-white  text-left uppercase whitespace-nowrap">action</th>

                    </tr>
                </thead>
                <tbody>
                    {paginated.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b text-center border-r-2 whitespace-nowrap">{item.sl}</td>
                            <td className="py-2 px-4 border-b whitespace-nowrap  border-r-2">{item.Username}</td>
                            <td className="py-2 px-4 border-b text-center whitespace-nowrap"><button className='bg-green-500 rounded-md p-3 text-white'>Edit</button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination/>
        </div>
        </>
    )
}

export default CreateSubUserList
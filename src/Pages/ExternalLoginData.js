import React, { useContext, useEffect, useMemo, useState } from 'react';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import PaginationContext from './PaginationContext';

const ExternalLoginData = () => {
  const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);

  const LoginData =useMemo(()=> [
    { SL: "01", c_code: "NA_2423", company_name: "Antraweb Technologies Pvt Ltd", username: 'manisha.poojary@antraweb.com' },
    { SL: "02", c_code: "NA_2423", company_name: "Waterwala Labs Pvt Ltd", username: 'shruti@drinkprime.in' },
  ],[]);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    // Update the total results in context
    setTotalResults(LoginData.length);

    // Calculate the paginated data
    const startIndex = (currentItem - 1) * showPerPage;
    const endIndex = startIndex + showPerPage;
    setPaginatedData(LoginData.slice(startIndex, endIndex));
  }, [currentItem, showPerPage, LoginData, setTotalResults]);

  return (
    <>
      <div className="bg-white m-4 md:m-24 shadow-md rounded-md p-3">
        <SearchBar/>
        <div className="overflow-x-auto py-6 px-4">
          <table className="min-w-full">
            <thead>
              <tr className='bg-green-500'>
                <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">SL</th>
                <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Client Code</th>
                <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Company Name</th>
                <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Username</th>
                <th className="py-2 px-4 text-white border-r border-b text-center uppercase whitespace-nowrap">Login Link</th>
                <th className="py-2 px-4 text-white  border-b  border-r text-left uppercase whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-r border-l whitespace-nowrap text-center">{item.SL}</td>
                  <td className="py-2 px-4 border-b border-r text-center whitespace-nowrap">{item.c_code}</td>
                  <td className="py-2 px-4 border-b border-r whitespace-nowrap">{item.company_name}</td>
                  <td className="py-2 px-4 border-b border-r whitespace-nowrap">{item.username}</td>
                  <td className="py-2 px-4 border-b border-r whitespace-nowrap text-center uppercase text-blue-500 text-bold cursor-pointer">Go</td>
                  <td className="py-2 px-4 border-b border-r whitespace-nowrap text-center">
                    <button className='bg-red-600 hover:bg-red-200 rounded-md p-2  text-white'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination/>
      </div>
    </>
  );
};

export default ExternalLoginData;

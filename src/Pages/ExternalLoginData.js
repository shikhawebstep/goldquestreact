import React, { useContext, useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import PaginationContext from './PaginationContext';

const ExternalLoginData = () => {
  const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);

  const LoginData = [
    { SL: "01", c_code: "NA_2423", company_name: "Antraweb Technologies Pvt Ltd", username: 'manisha.poojary@antraweb.com' },
    { SL: "02", c_code: "NA_2423", company_name: "Waterwala Labs Pvt Ltd", username: 'shruti@drinkprime.in' },
    { SL: "03", c_code: "NA_2423", company_name: "Vyeco Solutions LLP", username: '	hr@vyeco.in' },
    { SL: "04", c_code: "NA_2423", company_name: "JKM Human Resources Pvt Ltd", username: 'pradeep.n@jkmhr.com' },
    { SL: "05", c_code: "NA_2423", company_name: "Ahum Softtech Solutions Pvt Ltd", username: '	info@rightpick.co.in' },
    { SL: "06", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "07", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "08", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "09", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "10", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "11", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "12", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "13", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "01", c_code: "NA_2423", company_name: "Antraweb Technologies Pvt Ltd", username: 'manisha.poojary@antraweb.com' },
    { SL: "02", c_code: "NA_2423", company_name: "Waterwala Labs Pvt Ltd", username: 'shruti@drinkprime.in' },
    { SL: "03", c_code: "NA_2423", company_name: "Vyeco Solutions LLP", username: '	hr@vyeco.in' },
    { SL: "04", c_code: "NA_2423", company_name: "JKM Human Resources Pvt Ltd", username: 'pradeep.n@jkmhr.com' },
    { SL: "05", c_code: "NA_2423", company_name: "Ahum Softtech Solutions Pvt Ltd", username: '	info@rightpick.co.in' },
    { SL: "06", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "07", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "08", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "09", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "10", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "11", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "12", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "13", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "01", c_code: "NA_2423", company_name: "Antraweb Technologies Pvt Ltd", username: 'manisha.poojary@antraweb.com' },
    { SL: "02", c_code: "NA_2423", company_name: "Waterwala Labs Pvt Ltd", username: 'shruti@drinkprime.in' },
    { SL: "03", c_code: "NA_2423", company_name: "Vyeco Solutions LLP", username: '	hr@vyeco.in' },
    { SL: "04", c_code: "NA_2423", company_name: "JKM Human Resources Pvt Ltd", username: 'pradeep.n@jkmhr.com' },
    { SL: "05", c_code: "NA_2423", company_name: "Ahum Softtech Solutions Pvt Ltd", username: '	info@rightpick.co.in' },
    { SL: "06", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "07", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "08", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "09", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "10", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "11", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "12", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "13", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "14", c_code: "NA_2423", company_name: "Antraweb Technologies Pvt Ltd", username: 'manisha.poojary@antraweb.com' },
    { SL: "15", c_code: "NA_2423", company_name: "Waterwala Labs Pvt Ltd", username: 'shruti@drinkprime.in' },
    { SL: "16", c_code: "NA_2423", company_name: "Vyeco Solutions LLP", username: '	hr@vyeco.in' },
    { SL: "17", c_code: "NA_2423", company_name: "JKM Human Resources Pvt Ltd", username: 'pradeep.n@jkmhr.com' },
    { SL: "18", c_code: "NA_2423", company_name: "Ahum Softtech Solutions Pvt Ltd", username: '	info@rightpick.co.in' },
    { SL: "19", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "20", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "21", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "22", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "23", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "24", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "24", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "1", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
      { SL: "01", c_code: "NA_2423", company_name: "Antraweb Technologies Pvt Ltd", username: 'manisha.poojary@antraweb.com' },
    { SL: "02", c_code: "NA_2423", company_name: "Waterwala Labs Pvt Ltd", username: 'shruti@drinkprime.in' },
    { SL: "03", c_code: "NA_2423", company_name: "Vyeco Solutions LLP", username: '	hr@vyeco.in' },
    { SL: "04", c_code: "NA_2423", company_name: "JKM Human Resources Pvt Ltd", username: 'pradeep.n@jkmhr.com' },
    { SL: "05", c_code: "NA_2423", company_name: "Ahum Softtech Solutions Pvt Ltd", username: '	info@rightpick.co.in' },
    { SL: "06", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "07", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "08", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "09", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "10", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "11", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "12", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
    { SL: "13", c_code: "NA_2423", company_name: "PRIMES4TECH INDIA PRIVATE LIMITED", username: 'hr-india@primes4.com' },
  ];
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

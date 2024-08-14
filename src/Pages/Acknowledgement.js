import React, { useContext, useEffect, useState } from 'react';
import PaginationContext from './PaginationContext';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const Acknowledgement = () => {
  const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);
  const Emails = [
    {
      sl: "1",
      clientcode: "GQ-XTSPL",
      companyname: "Xencia Technology Solutions Pvt Ltd",
      app_count: "1",
      rcvd_date: "22/07/2024",
      send_approvals: "send"
    },
    {
      sl: "2",
      clientcode: "GQ-SNSHPL",
      companyname: "Sun N Sand Hotels Pvt Ltd",
      app_count: "7",
      rcvd_date: "22/07/2024",
      send_approvals: "send"
    }
  ];

  const [paginated, setPaginated] = useState([]);

  useEffect(() => {
      setTotalResults(Emails.length);
      const startIndex = (currentItem - 1) * showPerPage;
      const endIndex = startIndex + showPerPage;
      setPaginated(Emails.slice(startIndex, endIndex));
  }, [currentItem, setTotalResults]);
  return (
    <>

      <div className='p-4 md:py-16 '>
        <div className="text-center">
          <h2 className='md:text-4xl text-2xl font-bold pb-8 md:pb-4'>Acknowledgement Emails</h2>
        </div>
       <SearchBar/>
        <div className="overflow-x-auto py-6 px-4 bg-white shadow-md rounded-md md:m-4">
          <table className="min-w-full">
            <thead>
              <tr className='bg-green-500'>
                <th className="py-3 text-left text-white px-4 border-b-2 border-r-2 whitespace-nowrap uppercase text-lg">SL</th>
                <th className="py-3 text-left text-white px-4 border-b-2 border-r-2 whitespace-nowrap uppercase text-lg">Client Code</th>
                <th className="py-3 text-left text-white px-4 border-b-2 border-r-2 whitespace-nowrap uppercase text-lg">Company Name</th>
                <th className="py-3 text-left text-white px-4 border-b-2 border-r-2 whitespace-nowrap uppercase text-lg">Application Count</th>
                <th className="py-3 text-left text-white px-4 border-b-2 border-r-2 whitespace-nowrap uppercase text-lg">Case RCVD Date</th>
                <th className="py-3 text-left text-white px-4 border-b-2 border-r-2 whitespace-nowrap uppercase text-lg">Send Approvals</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((Emails, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 border-b-2 text-center border-r-2 whitespace-nowrap">{Emails.sl}</td>
                  <td className="py-3 px-4 border-b-2 text-center border-r-2 whitespace-nowrap">{Emails.clientcode}</td>
                  <td className="py-3 px-4 border-b-2 text-center border-r-2 whitespace-nowrap">{Emails.companyname}</td>
                  <td className="py-3 px-4 border-b-2 text-center border-r-2 whitespace-nowrap">{Emails.app_count}</td>
                  <td className="py-3 px-4 border-b-2 text-center border-r-2 whitespace-nowrap">{Emails.rcvd_date}</td>
                  <td className="py-3 px-4 border-b-2 text-center border-r-2 whitespace-nowrap">
                    <button className="bg-green-600 text-white py-2 px-7 rounded-md capitalize hover:bg-green-200" type='button'>{Emails.send_approvals}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       <Pagination/>
      </div>
    </>
  )
}

export default Acknowledgement
import React, { useContext, useEffect } from 'react';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import PaginationContext from './PaginationContext';
import { Link } from 'react-router-dom';
import { useData } from './DataContext';

const ExternalLoginData = () => {
  const { currentItem, showPerPage } = useContext(PaginationContext);
  const { listData, fetchData, toggleAccordion, branches, openAccordionId } = useData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const startIndex = (currentItem - 1) * showPerPage;
  const endIndex = startIndex + showPerPage;
  const paginatedData = listData.slice(startIndex, endIndex);

  return (
    <div className="bg-white m-4 md:m-24 shadow-md rounded-md p-3">
      <SearchBar />
      {listData.length === 0 ? (
        <p className='text-center'>Loading...</p>
      ) : (
        <div className="overflow-x-auto py-6 px-4">
          <table className="min-w-full">
            <thead>
              <tr className='bg-green-500 border'>
                <th className="py-3 px-4 border-b text-white text-left uppercase">SL</th>
                <th className="py-3 px-4 border-b text-white text-left uppercase">Client Code</th>
                <th className="py-3 px-4 border-b text-white text-left uppercase">Company Name</th>
                <th className="py-3 px-4 border-b text-white text-left uppercase">Mobile</th>
                <th className="py-3 px-4 border-b text-white text-center uppercase ">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <React.Fragment key={item.main_id}>
                  <tr className='border'>
                    <td className="py-3 px-4 border-b text-left whitespace-nowrap capitalize">
                      <input type="checkbox" className="me-2" />
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 border-b text-center whitespace-nowrap capitalize">{item.client_unique_id}</td>
                    <td className="py-3 px-4 border-b whitespace-nowrap capitalize">{item.name}</td>
                    <td className="py-3 px-4 border-b text-left cursor-pointer">{item.mobile}</td>
                    <td className="py-3 px-4 border-b text-center cursor-pointer">
                      {item.branch_count > 1 && (
                        <button
                          className="bg-green-600 hover:bg-green-200 rounded-md p-2 px-5 text-white"
                          onClick={() => toggleAccordion(item.main_id)}
                        >
                          View Branches
                        </button>
                      )}
                    </td>
                  </tr>

                  {openAccordionId === item.main_id && branches.map(branch => (
                    <tr key={branch.id} className='border'>
                      <td className="py-2 px-4 border-b text-center whitespace-nowrap">{branch.name}</td>
                      <td className="py-2 px-4 border-b whitespace-nowrap">{branch.email}</td>
                      <td className="py-2 px-4 border-b whitespace-nowrap text-center uppercase text-blue-500 font-bold">
                        <Link
                          to={`/customer-login?email=${encodeURIComponent(branch.email)}`}
                          target='_blank'
                          className="hover:underline"
                        >
                          Go
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b whitespace-nowrap text-center">
                        <button className="bg-red-600 hover:bg-red-200 rounded-md p-2 text-white">Delete</button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default ExternalLoginData;

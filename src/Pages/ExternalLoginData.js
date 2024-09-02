import React, { useCallback, useContext, useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import PaginationContext from './PaginationContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ExternalLoginData = () => {
  const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginatedData, setPaginatedData] = useState([]);
  const [messageShown, setMessageShown] = useState(false);

  const fetchBranches = useCallback(() => {
    setLoading(true);
    setError(null);

    const admin_id = JSON.parse(localStorage.getItem('admin'))?.id;
    const storedToken = localStorage.getItem('_token');

    const queryParams = new URLSearchParams({
      admin_id: admin_id || '',
      _token: storedToken || '',
    }).toString();

    fetch(`https://goldquestreact.onrender.com/branch/list?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (!messageShown) {
            Swal.fire({
              title: 'Error!',
              text: `An error occurred: ${res.statusText || 'Unknown error'}`,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
            setMessageShown(true);
          }
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        const newToken = data._token || data.token;
        if (newToken) {
          localStorage.setItem('_token', newToken);
        }
       
        setData(data.branches || []);
        setTotalResults(data.totalResults || 0);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Failed to load data');
      })
      .finally(() => setLoading(false));
  }, [setTotalResults, messageShown]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  useEffect(() => {
    const startIndex = (currentItem - 1) * showPerPage;
    const endIndex = startIndex + showPerPage;
    setPaginatedData(data.slice(startIndex, endIndex));
  }, [currentItem, showPerPage, data]);

  return (
    <div className="bg-white m-4 md:m-24 shadow-md rounded-md p-3">
      <SearchBar />
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="overflow-x-auto py-6 px-4">
          <table className="min-w-full">
            <thead>
              <tr className="bg-green-500">
                <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">SL</th>
                <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Company Name</th>
                <th className="py-2 px-4 text-white border-r border-b text-left uppercase whitespace-nowrap">Username</th>
                <th className="py-2 px-4 text-center text-white border-b border-r uppercase whitespace-nowrap">Login Link</th>
                <th className="py-2 px-4 text-white border-b border-r text-left uppercase whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-r border-l whitespace-nowrap text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b border-r text-center whitespace-nowrap">{item.name}</td>
                  <td className="py-2 px-4 border-b border-r whitespace-nowrap">{item.email}</td>
                  <td className="py-2 px-4 border-b border-r whitespace-nowrap text-center uppercase text-blue-500 font-bold">
                    <Link 
                      to={`/customerlogin?email=${encodeURIComponent(item.email)}`}
                      target='_blank'
                      className="hover:underline"
                    >
                      Go
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b border-r whitespace-nowrap text-center">
                    <button className="bg-red-600 hover:bg-red-200 rounded-md p-2 text-white">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center">
                  No data available
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default ExternalLoginData;

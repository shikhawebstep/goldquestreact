import React, { useContext, useEffect, useMemo, useState } from 'react';
import PaginationContext from './PaginationContext';
import SearchBar from './SearchBar'
import Pagination from './Pagination'

const TatDelay = () => {
  const { currentItem, showPerPage, setTotalResults } = useContext(PaginationContext);

  const tatData =useMemo(()=>
    [
      { sl: "01", tatDays: "12", initiationDate: "NA", applicationId: "GQ-NTIPL-667", employeeName: "Mohammed Zeeshanulla", exceedDays: "-201" },
      { sl: "02", tatDays: "12", initiationDate: "NA", applicationId: "GQ-NTIPL-667", employeeName: "Mohammed Zeeshanulla", exceedDays: "-201" },
      { sl: "03", tatDays: "12", initiationDate: "NA", applicationId: "GQ-NTIPL-667", employeeName: "Mohammed Zeeshanulla", exceedDays: "-201" },
     
    ],[]);
  const [paginated, setPaginated] = useState([]);

  useEffect(() => {
      setTotalResults(tatData.length);
      const startIndex = (currentItem - 1) * showPerPage;
      const endIndex = startIndex + showPerPage;
      setPaginated(tatData.slice(startIndex, endIndex));
  }, [currentItem, setTotalResults,tatData,showPerPage]);
  return (
    <>
    <div className="m-4 md:py-16">
    <div className="text-center">
    <h2 className='md:text-4xl text-2xl font-bold pb-8 md:pb-4'>Tat Delay Notifications</h2>
  </div>
  <SearchBar/>
  <div className="overflow-x-auto py-6 px-4 bg-white shadow-md m-4 rounded-md ">
        <table className="min-w-full table-auto">
          <thead>
            <tr className='bg-green-500'>
              <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap text-white border-r">SL</th>
              <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap text-white border-r">Tat Days</th>
              <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap text-white border-r">Initiation Date</th>
              <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap text-white border-r">Application Id</th>
              <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap text-white border-r">Employee Name</th>
              <th className="py-3 px-4 border-b text-left uppercase whitespace-nowrap text-white ">Exceed Days</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 border-b border-l whitespace-nowrap text-center border-r">{item.sl}</td>
                <td className="py-3 px-4 border-b  whitespace-nowrap text-center border-r">{item.tatDays}</td>
                <td className="py-3 px-4 border-b  whitespace-nowrap text-center border-r">{item.initiationDate}</td>
                <td className="py-3 px-4 border-b  whitespace-nowrap text-center border-r">{item.applicationId}</td>
                <td className="py-3 px-4 border-b  whitespace-nowrap text-left border-r">{item.employeeName}</td>
                <td className="py-3 px-4 border-b  whitespace-nowrap text-center border-r">{item.exceedDays}</td>
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

export default TatDelay
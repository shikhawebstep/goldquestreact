import React from "react";
import ReportsList from "./ReportsList";
import ReportForm from "./ReportForm";
const Reports = () => {
 
  return (
    <>
    <div className=" py-4 md:py-16">
        <h2 className='md:text-4xl text-2xl font-bold pb-8 md:pb-4 text-center'>Report Summary</h2>
    <div className="grid grid-cols-1 md:grid-cols-6 md:p-4 gap-5 md:m-7  m-3">
      <div className="md:col-span-3 bg-white shadow-md rounded-md p-3 md:p-10">
     <ReportForm/>
      </div>
      <div className="md:col-span-3 bg-white shadow-md rounded-md  p-3 ">
      <ReportsList/>
      </div>
      </div>
      </div>
    </>
  )
}

export default Reports
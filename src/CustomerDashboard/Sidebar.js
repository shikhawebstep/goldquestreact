
import React, { useState } from "react";
import { BiSolidPackage } from "react-icons/bi";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { RiLoginCircleFill, RiLockPasswordFill} from "react-icons/ri";
import { FaFileInvoiceDollar,FaDropbox  } from "react-icons/fa";
import { AiFillDropboxCircle } from "react-icons/ai";
import {MdDashboardCustomize} from "react-icons/md";
import { GrServices } from "react-icons/gr";
import DashBoard from './Dashboard'
import EmployeeManagement from './EmployeeManagement'
import AddUser from './AddUser'
import ReportAndCase from './ReportAndCase'
import BulkUpload from './BulkUpload'
import UpdatePassword from '../Pages/UpdatePassword'
import EscalationMatrix from './EscalationMatrix'
import Header from '../Dashboard/Header'
import ClientDropBox from "./ClientDropBox";
import CandidateDropBox from "./CandidateDropBox";
const tabComponents = {
  dashboard: <DashBoard />,
  employee_management: <EmployeeManagement />,
  add_user: <AddUser />,
  report_case: <ReportAndCase />,
  dropbox:<ClientDropBox/>,
  Candidate:<CandidateDropBox/>,
  bulkupload: <BulkUpload />,
  update_password: <UpdatePassword />,
  escalation: <EscalationMatrix />,
};
const tabNames = {
  dashboard: (<><HomeIcon className="h-6 w-6 mr-3 text-gray-600" />DashBoard</>),
  employee_management: (<><UserIcon className="h-6 w-6 mr-3 text-gray-600" />Employee Management</>),
  add_user: (<><BiSolidPackage className="h-6 w-6 mr-3 text-gray-600" />Add User</>),
  report_case: (<><GrServices  className="h-6 w-6 mr-3 text-gray-600" />Report & Case Status</>),
  dropbox: (<><FaDropbox  className="h-6 w-6 mr-3 text-gray-600" />Client DropBox</>),
  Candidate: (<><AiFillDropboxCircle className="h-6 w-6 mr-3 text-gray-600" />Candidate DropBox</>),
  bulkupload: (<><MdDashboardCustomize  className="h-6 w-6 mr-3 text-gray-600" />Bulk Upload</>),
  update_password: (<><RiLockPasswordFill className="h-6 w-6 mr-3 text-gray-600" />Update Password</>),
  escalation: (<><FaFileInvoiceDollar className="h-6 w-6 mr-3 text-gray-600" />Escalation Matrix</>),
  logout: (<><RiLoginCircleFill className="h-6 w-6 mr-3 text-gray-600" />Logout</>),
};
const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row ">
        <div className="w-full md:w-1/5 flex flex-col  bg-white">
          <div className="px-3">
            <div className="flex flex-col  px-3 py-8">
              <h2 className=" w-full text-green-600  text-2xl text-left font-bold pb-6 font-poppins">Customer DashBoard</h2>

              <ul>
                {Object.keys(tabNames).map((tab) => (
                  <li
                    key={tab}
                    className={activeTab === tab ? 'active bg-green-200 rounded-md p-3 flex mb-3' : 'togglelist w-full   flex items-center p-3 cursor-pointer hover:bg-green-200 rounded-md my-2'}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tabNames[tab]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/5 flex flex-col">
          <Header />
          {tabComponents[activeTab]}
        </div>
      </div>

    </>
  );
};

export default Sidebar;

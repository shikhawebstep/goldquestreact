import React, { useContext } from 'react';
import SidebarContext from './SidebarContext';
import { BiSolidPackage } from "react-icons/bi";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { RiLoginCircleFill, RiLockPasswordFill, RiCustomerServiceFill } from "react-icons/ri";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { TiCloudStorage } from "react-icons/ti";
import { TbReportSearch } from "react-icons/tb";
import { VscLinkExternal } from "react-icons/vsc";
import { MdOutlineTrackChanges, MdTrackChanges, MdEmail } from "react-icons/md";
import { IoNotificationsCircle } from "react-icons/io5";
import { GrServices } from "react-icons/gr";

const tabNames = {
  dashboard: (<><HomeIcon className="h-6 w-6 mr-3 text-gray-600" />DashBoard</>),
  profile: (<><UserIcon className="h-6 w-6 mr-3 text-gray-600" />Client Management</>),
  package_management: (<><BiSolidPackage className="h-6 w-6 mr-3 text-gray-600" />Package Management</>),
  service_management: (<><GrServices  className="h-6 w-6 mr-3 text-gray-600" />Service Management</>),
  customer_login: (<><RiCustomerServiceFill  className="h-6 w-6 mr-3 text-gray-600" />Customer Login</>),
  internal_login: (<><TiCloudStorage className="h-6 w-6 mr-3 text-gray-600" />Internal Login</>),
  report: (<><TbReportSearch className="h-6 w-6 mr-3 text-gray-600" />Reports Summary</>),
  external: (<><VscLinkExternal className="h-6 w-6 mr-3 text-gray-600" />External Login Credentials</>),
  client_master: (<><MdOutlineTrackChanges className="h-6 w-6 mr-3 text-gray-600" />Client Master Tracker</>),
  exel_tracker: (<><MdTrackChanges className="h-6 w-6 mr-3 text-gray-600" />Exel Tracker</>),
  tat_delay: (<><IoNotificationsCircle className="h-6 w-6 mr-3 text-gray-600" />Tat Delay Notification</>),
  Acknowledgement: (<><MdEmail className="h-6 w-6 mr-3 text-gray-600" />Acknowledgement Email</>),
  update_password: (<><RiLockPasswordFill className="h-6 w-6 mr-3 text-gray-600" />Update Password</>),
  invoice: (<><FaFileInvoiceDollar className="h-6 w-6 mr-3 text-gray-600" />Invoice</>),
  email_temp: (<><FaFileInvoiceDollar className="h-6 w-6 mr-3 text-gray-600" />Email Template</>),
  logout: (<><RiLoginCircleFill className="h-6 w-6 mr-3 text-gray-600" />Logout</>),
};

const Sidebar = () => {
  const { activeTab, handleTabChange } = useContext(SidebarContext);

  return (
    <div className="w-full md:w-1/5 flex flex-col bg-white">
      <div className="px-3">
        <div className="flex flex-col px-3 py-8">
          <h2 className="w-full text-green-600 text-5xl text-left font-bold pb-6 font-poppins">GoldQuest.</h2>
          <p className="text-gray-400 text-xl mb-7 text-left w-full">Background Verification Tracking System.</p>
          <ul>
            {Object.keys(tabNames).map((tab) => (
              <li
                key={tab}
                className={activeTab === tab ? 'active bg-green-200 rounded-md p-3 flex mb-3' : 'togglelist w-full flex items-center p-3 cursor-pointer hover:bg-green-200 rounded-md my-2'}
                onClick={() => handleTabChange(tab)}
              >
                {tabNames[tab]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useContext } from 'react';
import SidebarContext from '../Sidebar/SidebarContext';
import DashBoard from '../Dashboard/Dashboard';
import ClientManagement from '../Pages/ClientManagement';
import PackageManagement from '../Pages/PackageManagement';
import ServiceMangement from '../Pages/ServiceMangement';
import InternalLogin from '../Pages/InternalLogin';
import Reports from '../Pages/Reports';
import ExternalLogin from './ExternalLoginData';
import ClientMasterTracker from '../Pages/ClientMasterTracker';
import ExelTracker from '../Pages/ExelTracker';
import TatDelay from '../Pages/TatDelay';
import Acknowledgement from '../Pages/Acknowledgement';
import TrackUserHistory from '../Pages/TrackUserHistory';
import UpdatePassword from '../Pages/UpdatePassword';
import Invoice from '../Pages/Invoice';
import Header from '../Dashboard/Header';
import CustomerLogin from "../Pages/CustomerLogin";
import EmailTemplate from "../Pages/EmailTemplate";
import ClientManagementList from './ClientManagementList';
import InactiveClients from './InactiveClients';
const tabComponents = {
  dashboard: <DashBoard />,
  profile: <ClientManagement />,
  package_management: <PackageManagement />,
  service_management: <ServiceMangement />,
  customer_login: <CustomerLogin />,
  internal_login: <InternalLogin />,
  report: <Reports />,
  external: <ExternalLogin />,
  client_master: <ClientMasterTracker />,
  exel_tracker: <ExelTracker />,
  tat_delay: <TatDelay />,
  Acknowledgement: <Acknowledgement />,
  update_password: <UpdatePassword />,
  invoice: <Invoice />,
  email_temp: <EmailTemplate />,
  add_clients:<ClientManagement/>,
  active_clients:<ClientManagementList/>,
  inactive_clients:<InactiveClients/>
};

const MainContent = () => {
  const { activeTab } = useContext(SidebarContext);

  return (
    <div className="w-full md:w-4/5 flex flex-col">
      <Header />
      {tabComponents[activeTab]}
    </div>
  );
};

export default MainContent;

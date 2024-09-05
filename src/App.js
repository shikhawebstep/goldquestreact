import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Render from './Pages/Render';
import ForgotPassword from './Pages/ForgotPassword';
import CustomerLogin from './CustomerDashboard/CustomerLogin';
import PasswordReset from './Pages/PasswordReset';
import SetNewPassword from './Pages/SetNewPassword';
import Login from './Dashboard/Login';
import CustomerDashboard from './CustomerDashboard/CustomerDashboard';
import ExelTrackerData from './Pages/ExelTrackerData';
import { PaginationProvider } from './Pages/PaginationContext';
import Admin from './Middleware/Admin';
import Customer from './Middleware/Customer';
import { PackageProvider } from './Pages/PackageContext';
import { ServiceProvider } from './Pages/ServiceContext';
import { LoaderProvider } from './LoaderContext';
import { ClientProvider } from './Pages/ClientManagementContext';
import { ClientEditProvider } from './Pages/ClientEditContext';
import AddClient from './Pages/AddClient';
import { BranchEditProvider } from './Pages/BranchEditContext';
import { DropBoxProvider } from './CustomerDashboard/DropBoxContext'
import { RefreshProvider } from './RefreshContext';
import { DataProvider } from './Pages/DataContext';
const App = () => {
  return (
    <DataProvider>
    <RefreshProvider>
      <DropBoxProvider>
        <ClientEditProvider>
          <BranchEditProvider>
            <LoaderProvider>
              <PaginationProvider>
                <ClientProvider>
                  <PackageProvider>
                    <ServiceProvider>
                     
                      <Router basename='/demo/Goldquest'>
                        <Routes>
                          <Route path='/' element={<Admin><Render /></Admin>} />
                          <Route path='/customer-login' element={<CustomerLogin />} />
                          <Route path='/admin-login' element={<Login />} />
                          <Route path='forgotpassword' element={<ForgotPassword />} />
                          <Route path='forgotpassword/passwordreset' element={<PasswordReset />} />
                          <Route path='/newpassword' element={<SetNewPassword />} />
                          <Route path='/customer-dashboard' element={<Customer><CustomerDashboard /></Customer>} />
                          <Route path='/trackerstatus' element={<Admin><ExelTrackerData /></Admin>} />
                          <Route path='/addclient' element={<Admin><AddClient /></Admin>} />
                        </Routes>
                      </Router>
                  </ServiceProvider>
                </PackageProvider>
              </ClientProvider>
            </PaginationProvider>
          </LoaderProvider>
        </BranchEditProvider>
      </ClientEditProvider>
    </DropBoxProvider>
    </RefreshProvider >
    </DataProvider>
  );
};

export default App;

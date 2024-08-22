import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; 
import Render from './Pages/Render';
import ForgotPassword from './Pages/ForgotPassword';
import CustomerLogin from './Pages/CustomerLogin';
import PasswordReset from './Pages/PasswordReset';
import SetNewPassword from './Pages/SetNewPassword';
import Login from './Dashboard/Login';
import CustomerDashboard from './CustomerDashboard/CustomerDashboard';
import ExelTrackerStatus from './Pages/ExelTrackerStatus';
import { PaginationProvider } from './Pages/PaginationContext';
import Admin from './Middleware/Admin';
import { PackageProvider } from './Pages/PackageContext';
import { ServiceProvider } from './Pages/ServiceContext';
import { LoaderProvider } from './LoaderContext';

const App = () => {
  return (
    <LoaderProvider>
    <PaginationProvider>
      <PackageProvider>
        <ServiceProvider>
          <Router basename='/demo/Goldquest'>
            <Routes>
              <Route path='/' element={<Admin><Render /></Admin>} />
              <Route path='customerlogin' element={<CustomerLogin />} />
              <Route path='/admin-login' element={<Login />} />
              <Route path='forgotpassword' element={<ForgotPassword />} />
              <Route path='forgotpassword/passwordreset' element={<PasswordReset />} />
              <Route path='/newpassword' element={<SetNewPassword />} />
              <Route path='/customer-login' element={<Login />} />
              <Route path='/customer-dashboard' element={<Admin><CustomerDashboard /></Admin>} />
              <Route path='/trackerstatus' element={<Admin><ExelTrackerStatus /></Admin>} />
            </Routes>
          </Router>
        </ServiceProvider>
      </PackageProvider>
    </PaginationProvider>
    </LoaderProvider>
  );
}

export default App;

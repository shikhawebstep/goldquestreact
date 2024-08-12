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
const App = () => {
  return (
 
<PaginationProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Render />}/>
          <Route path='customerlogin' element={<CustomerLogin />} />
          <Route path='/admin-login' element={<Login />} />
          <Route path='forgotpassword' element={<ForgotPassword />} />
          <Route path='forgotpassword/passwordreset' element={<PasswordReset />} />
          <Route path='/newpassword' element={<SetNewPassword />} />
          <Route path='/customer-login' element={<Login />} />
          <Route path='/customer-dashboard' element={<CustomerDashboard />} />
          <Route path='/trackerstatus' element={<ExelTrackerStatus />} />
      </Routes>
    </Router>
    </PaginationProvider>
  );
}

export default App;

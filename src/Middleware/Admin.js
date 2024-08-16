import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; 

const Admin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedAdminData = localStorage.getItem("admin");
      const storedToken = localStorage.getItem("_token");

      if (!storedAdminData || !storedToken) {
        redirectToLogin();
        return;
      }

      let adminData;
      try {
        adminData = JSON.parse(storedAdminData);
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        redirectToLogin();
        return;
      }

      try {
        const response = await axios.post('https://goldquestreact.onrender.com/admin/verify-admin-login', {
          admin_id: adminData.id,
          _token: storedToken,
        });

        if (response.data.status) {
          setLoading(false);
        } else {
          redirectToLogin();
        }
      } catch (error) {
        console.error('Error validating login:', error);
        redirectToLogin();
      }
    };

    const redirectToLogin = () => {
      navigate('/admin-login', { state: { from: location }, replace: true });
    };

    checkAuthentication();
  }, [navigate, location]);

  if (loading) {
    return <div className='m-auto w-full text-center'>Loading...</div>; 
  }

  return children; 
};

export default Admin;

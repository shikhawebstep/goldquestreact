// src/components/AdminAuth.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios or use fetch

const Admin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedAdminData = localStorage.getItem("admin");
      const storedToken = localStorage.getItem("_token");
      let adminData;

      try {
        adminData = JSON.parse(storedAdminData);
      } catch (e) {
        console.error('Error parsing JSON from localStorage:', e);
        adminData = null;
      }

      if (!adminData || !storedToken) {
        // No admin data or token, redirect to login
        navigate('/admin-login', { state: { from: location }, replace: true });
        return;
      }

      try {
        const response = await axios.post('https://goldquestreact.onrender.com/admin/verify-admin-login', {
          admin_id: adminData.id,
          _token: storedToken
        });
      
        if (response.data.status) {
          setLoading(false);
        } else {
          navigate('/admin-login', { state: { from: location }, replace: true });
        }
      } catch (error) {
        console.error('Error validating login:', error);
        navigate('/admin-login', { state: { from: location }, replace: true });
      }      
    };

    checkAuthentication();
  }, [navigate, location]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking authentication
  }

  return children; // Render children if authenticated
};

export default Admin;
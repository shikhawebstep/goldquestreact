import React from 'react';
import active_client from '../Images/Login.jpeg';
import LoginForm from './LoginForm';
import LoginDes from './LoginDes';

const Login = () => {
  return (
    <div className="bg-cover bg-center flex items-center justify-center md:h-dvh p-4 md:p-14" style={{ backgroundImage: `url(${active_client})` }}>
      <div className="flex flex-col md:flex-row items-center w-full md:w-8/12 bg-slate-50 opacity-90 md:p-6 p-3 rounded-lg shadow-lg">
        <div className="w-full md:w-7/10 flex flex-col p-4">
          <LoginDes />
        </div>
        <div className="w-full md:w-3/10 flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from 'react'
import active_client from '../Images/Login.jpeg';
import CustomerLoginForm from './CustomerLoginForm';
import loginImg from '../Images/customerlogin.png'
const Login = () => {
  return (
    <>
      <div className="bg-cover md:h-lvh bg-center flex items-center justify-center p-4 md:p-14" style={{ backgroundImage: `url(${active_client})` }}>
        <div className="flex flex-col gap-10 md:flex-row items-center w-full md:w-7/12 bg-slate-50 opacity-90 p-6 md:px-16 rounded-lg shadow-lg">
          <div className="w-full md:w-7/10 flex flex-col p-4">
            <CustomerLoginForm />
          </div>
          <div className="w-full md:w-3/10 flex items-center justify-center">
            <img src={loginImg} alt="" className='' />
          </div>
        </div>

      </div>
    </>
  )
}

export default Login

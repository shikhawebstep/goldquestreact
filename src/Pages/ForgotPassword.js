import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div>
      <div className="bg-white md:w-5/12 m-auto shadow-md rounded-sm p-5 translate-y-2/4">
        <h2 className='md:text-4xl text-2xl font-bold pb-8 md:pb-4'>Forgot Password?</h2>
        <p>We'll Send You Reset Instructions.</p>
        <form className='mt-9 mb-9'>
          <div className="mb-4">
            <label htmlFor="email" className='d-block'>Email:</label>
            <input type="email" id="email" className='outline-none p-3 border mt-3 w-full rounded-md'/>
          </div>
          <Link to='/forgotpassword/passwordreset' className='bg-green-400 text-white hover:bg-green-200 p-3 rounded-md w-full inline-block text-center'>
            Reset Password
          </Link>
        </form>
        <span className='flex justify-center items-center gap-4 text-blue-400'>
        <FaArrowLeft />
        <Link to='/customerlogin'>Back to Login</Link>
      </span> 
      </div>
    </div>
  );
}

export default ForgotPassword;

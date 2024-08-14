import React from 'react';
import { PiDotsThreeFill } from "react-icons/pi";
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom';

const SetNewPassword = () => {
    return (
        <div className="bg-white md:w-5/12 m-auto shadow-md rounded-sm p-5 translate-y-2/4 ">
            <div className="text-center">
                <PiDotsThreeFill className='text-8xl w-full text-center' />
                <h2 className='text-3xl font-bold py-4'>Set New Password</h2>
                <p className='text-lg'>Must be at least 8 characters</p>
            </div>
            <form action="">
                <div className="mb-4">
                    <label htmlFor="password" className='d-block'>Password</label>
                    <input type="password" id="password"  className='outline-none p-3 border mt-3 w-full rounded-md' />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirm-password" className='d-block'>Confirm Password</label>
                    <input type="password" id="confirm-password"  className='outline-none p-3 border mt-3 w-full rounded-md' />
                </div>
                <button type="submit" className='bg-green-400 text-white p-3 rounded-md w-full mb-4 hover:bg-green-200'>Reset Password</button>
                <span className='flex justify-center items-center gap-4 text-blue-400'>
                <FaArrowLeft />
                <Link to='/customerlogin'>Back to Login</Link>
              </span> 
            </form>
        </div>
    );
}

export default SetNewPassword;

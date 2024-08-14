import React, { useState } from 'react'
import EmailLogin from './EmailLogin'
import NumberLogin from './NumberLogin'
const CustomerLogin = () => {
    const [ tab,setTab]=useState('email');
    const handleTab=(tabname)=>{
        setTab(tabname);
    }
    return (
        <>
       
            <div className="md:m-4 md:py-16 m-4">
            <div className="text-center mb-6">
            <h2 className='md:text-4xl text-2xl font-bold pb-8 md:pb-4'>Customer Login</h2>
          </div>
                <div className='md:w-7/12 bg-white shadow-md p-4 m-auto rounded-md'>
                        <div className="border rounded-md md:p-3 p-2">
                            <ul className='flex gap-5 items-center justify-between md:justify-start'>
                                <li className={tab==='email'?'bg-green-400 rounded-md p-3 text-white':''} onClick={()=>handleTab('email')}>Login with Email</li>
                                <li className={tab==='otp'?'bg-green-400 rounded-md p-3 text-white':''} onClick={()=>handleTab('otp')}>Login With OTP</li>
                            </ul>
                        </div>
                        {tab==='email'&&(
                            <>
                            <EmailLogin/>
                            </>
                        )}
                            {tab==='otp'&&(
                            <>
                            <NumberLogin/>
                            </>
                        )}
                </div>
            </div>
        </>
    )
}

export default CustomerLogin
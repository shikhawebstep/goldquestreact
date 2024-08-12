import React, { useState } from 'react'

const UpdatePasswordForm = () => {
    const [newPass, setNewPass] = useState({
        pass: '',
        newpass: '',
        c_newpass: '',
    });
    const [passError,sePassError]=useState({});
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPass((prev) => ({
            ...prev, [name]: value,
        }));

    };

    const validate=()=>{
        const NewErr={};
        if(!newPass.pass){NewErr.pass='This is Required'}
        if(!newPass.newpass){NewErr.newpass='This is Required'}
        if(!newPass.c_newpass){NewErr.c_newpass='This is Required'}
        else if(newPass.c_newpass!==newPass.newpass){NewErr.c_newpass='Password does not match'}
        return NewErr;
  
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            console.log(newPass);
            sePassError({});
        }
        else {
            sePassError(errors);
        }

    }
    return (
        <>
            <form action="" className='mt-4' onSubmit={handleSubmit}>
                <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Current Password</label>
                    <input type="password" name="pass" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="prevpassword" placeholder='********' onChange={handleChange} value={newPass.pass} />
                          {passError.pass && <p className='text-red-500'>{passError.pass}</p>}
                    </div>
                <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">New Password</label>
                    <input type="password" name="newpass" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="newpassword" placeholder='********' onChange={handleChange} value={newPass.newPass} />
                    {passError.newpass && <p className='text-red-500'>{passError.newpass}</p>}
                    </div>
                <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirm New Password</label>
                    <input type="password" name="c_newpass" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmnewpassword" placeholder='********' onChange={handleChange} value={newPass.c_newpass} />
                    {passError.c_newpass && <p className='text-red-500'>{passError.c_newpass}</p>}
                    </div>
                <button type="submit" className='bg-green-400 text-white p-3 rounded-md w-full mb-4 hover:bg-green-200'>Update Password</button>

            </form>
        </>
    )
}

export default UpdatePasswordForm
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const EmailLogin = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState('');
  const validations = () => {
    const newErrors = {};
    if (!input.email) {
      newErrors.email = 'This field is Required!'
    }
    if (!input.password) {
      newErrors.password = 'This field is Required!'
    }
    else if (input.password.length <= 8) {
      newErrors.password = 'Password has Maximum 8 Characters*'
    }
    else {

    }
    return newErrors;
  }
  const handelChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev, [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const validateError = validations();
    if (Object.keys(validateError).length === 0) {
      console.log(input);
      setError({});
    }
    else {
      setError(validateError);
    }
  }

  return (
    <>
      <form action="" className='mt-9' onSubmit={handleSubmitForm}>
        <div className="mb-3">
          <label htmlFor="email" className='d-block '>Enter Your Email:</label>
          <input type="email"
            name="email"
            id="EmailId"
            onChange={handelChange}
            className='outline-none p-3 border mt-3 w-full rounded-md' />
          {error.email && <p className='text-red-500'>{error.email}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className='d-block '>Enter Your Password:</label>
          <input type="password"
            name="password"
            id="YourPassword"
            onChange={handelChange}
            className='outline-none p-3 border mt-3 w-full rounded-md' />
          {error.password && <p className='text-red-500'>{error.password}</p>}

        </div>
        <button type="submit" className='bg-green-400 text-white p-3 rounded-md w-full hover:bg-green-200'>Sign In</button>
        <span className='text-center pt-4 flex justify-center text-blue-400 cursor-pointer'><Link to='/forgotpassword'>Forgot Password?</Link></span>
      </form>
    </>
  )
}

export default EmailLogin

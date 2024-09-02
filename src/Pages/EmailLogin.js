import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const EmailLogin = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const emailFromQuery = query.get('email') || '';

  const [input, setInput] = useState({
    email: emailFromQuery,
    password: "",
  });
  const [error, setError] = useState({});

  // Update input state when emailFromQuery changes
  useEffect(() => {
    setInput(prev => ({
      ...prev,
      email: emailFromQuery,
    }));
  }, [emailFromQuery]);

  const validations = () => {
    const newErrors = {};
    if (!input.email) {
      newErrors.email = 'This field is required!';
    }
    if (!input.password) {
      newErrors.password = 'This field is required!';
    } else if (input.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev, [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const validateError = validations();
    if (Object.keys(validateError).length === 0) {
      console.log(input);
      setError({});
    } else {
      setError(validateError);
    }
  };

  return (
    <>
      <form action="" className='mt-9' onSubmit={handleSubmitForm}>
        <div className="mb-3">
          <label htmlFor="email" className='d-block '>Enter Your Email:</label>
          <input type="email"
            name="email"
            id="EmailId"
            onChange={handleChange}
            value={input.email}
            className='outline-none p-3 border mt-3 w-full rounded-md' />
          {error.email && <p className='text-red-500'>{error.email}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className='d-block '>Enter Your Password:</label>
          <input type="password"
            name="password"
            id="YourPassword"
            onChange={handleChange}
            value={input.password}
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

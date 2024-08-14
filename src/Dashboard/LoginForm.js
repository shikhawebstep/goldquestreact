import axios from 'axios';
import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const LoginForm = () => {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const validateError = () => {
    const newErrors = {};
    if (!input.username) newErrors.username = 'This is Required';
    if (!input.password) newErrors.password = 'This is Required';
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateError();
    if (Object.keys(errors).length === 0) {
      console.log(input);

     
      const loginData = {
        username: input.username,
        password: input.password,
      };
      alert(`Username - ${username} // Password - ${password}`);
      return;

      axios.post('https://goldquestreact.onrender.com/admin/login', loginData)
        .then((response) => {
          console.log('Login successful:', response.data);
        })
        .catch((error) => {
          console.error('Login failed:', error);
        });

      setError({});
    } else {
      setError(errors);
    }
  };

  return (
    <div className="bg-transparent md:p-8 p-3 rounded-md shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            value={input.username}
            name="username"
          />
          {error.username && <p className="text-red-500">{error.username}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            placeholder="******************"
          />
          {error.password && <p className="text-red-500">{error.password}</p>}
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-gray-700 text-sm font-bold">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">Remember me</span>
          </label>
          <a href="#" className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-blue-800">
            Forgot Password?
          </a>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="text-center my-4">
        <p className="text-sm">
          Don't have an account? <a href="#" className="text-red-500 hover:text-blue-800">Sign up</a>
        </p>
      </div>
      <div className="flex items-center justify-between my-4">
        <div className="w-1/4 border-t border-gray-300"></div>
        <div className="w-1/2 text-center text-gray-500">or login with</div>
        <div className="w-1/4 border-t border-gray-300"></div>
      </div>
      <div className="flex justify-center gap-4">
        <button className="bg-white border border-blue-500 rounded-sm p-3 w-4/12 text-center">
          <FaGoogle className="h-6 w-6 text-blue-700 m-auto" />
        </button>
        <button className="bg-white border border-blue-500 rounded-sm p-3 w-4/12 text-center">
          <FaFacebook className="h-6 w-6 text-gray-700 m-auto" />
        </button>
        <button className="bg-white border border-blue-500 rounded-sm p-3 w-4/12 text-center">
          <FaApple className="h-6 w-6 text-black-700 m-auto" />
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

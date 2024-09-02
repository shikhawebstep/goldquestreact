import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import customerlogo from '../Images/Logo.png';

const CustomerLoginForm = () => {
    const location = useLocation();
    console.log("Current URL:", location.pathname);
    console.log("Search Params:", location.search);
    const query = new URLSearchParams(location.search);
    const emailFromQuery = query.get('email');
    console.log("Parsed Email:", emailFromQuery);
    

    const [input, setInput] = useState({
        email: emailFromQuery,
        password: "",
    });
    const [error, setError] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Update the email field when emailFromQuery changes
    useEffect(() => {
        setInput(prevInput => ({
            ...prevInput,
            email: 'test@example.com'
        }));
    }, [emailFromQuery]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const validateError = () => {
        const newErrors = {};
        if (!input.email) { newErrors.email = 'This is required'; }
        if (!input.password) { newErrors.password = 'This is required'; }
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateError();
        if (Object.keys(errors).length === 0) {
            console.log(input);
            setError({});
        } else {
            setError(errors);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <form onSubmit={handleSubmit} aria-live="polite">
                <div className="block mb-8 text-center">
                    <img src={customerlogo} alt="Customer Logo" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input 
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        onChange={handleChange}
                        value={input.email}
                        name='email'
                        aria-describedby="email-error"
                    />
                    {error.email && <p id="email-error" className='text-red-500'>{error.email}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <input 
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type={passwordVisible ? 'text' : 'password'}
                            name='password'
                            value={input.password}
                            onChange={handleChange}
                            placeholder="******************"
                            aria-describedby="password-error"
                        />
                        <button 
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                        >
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {error.password && <p id="password-error" className='text-red-500'>{error.password}</p>}
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
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                        Sign In
                    </button>
                </div>
            </form>
            <div className="text-center my-4">
                <p className="text-sm">Don't have an account? <a href="#" className="text-red-500 hover:text-blue-800">Sign up</a></p>
            </div>
            <div className="flex items-center justify-between my-4">
                <div className="w-1/4 border-t border-gray-300"></div>
                <div className="w-1/2 text-center text-gray-500">or login with</div>
                <div className="w-1/4 border-t border-gray-300"></div>
            </div>
            <div className="flex justify-center gap-4">
                <button className="bg-white border border-blue-500 rounded-sm p-3 w-12 text-center">
                    <FaGoogle className="h-6 w-6 text-blue-700 m-auto" />
                </button>
                <button className="bg-white border border-blue-500 rounded-sm p-3 w-12 text-center">
                    <FaFacebook className="h-6 w-6 text-gray-700 m-auto" />
                </button>
                <button className="bg-white border border-blue-500 rounded-sm p-3 w-12 text-center">
                    <FaApple className="h-6 w-6 text-black-700 m-auto" />
                </button>
            </div>
        </div>
    );
};

export default CustomerLoginForm;

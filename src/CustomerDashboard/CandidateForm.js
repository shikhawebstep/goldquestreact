import React, { useState } from 'react'

const CandidateForm = () => {
    const [input, setInput] = useState({
        org_name: "",
        applicant_name: "",
        em_id: "",
        email: "",
    });

    const [error, setError] = useState({});
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput((prev) => ({
            ...prev, [name]: value,
        }));

    };

    const validate = () => {
        const NewErr = {};
        if (!input.org_name) { NewErr.org_name = 'This is Required' }
        if (!input.applicant_name) { NewErr.applicant_name = 'This is Required' }
        if (!input.em_id) { NewErr.em_id = 'This is Required' }
        if (!input.email) { NewErr.email = 'This is Required' }
        return NewErr;

    }                                                                                                            
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            console.log(input);
            setError({});
        }
        else {
            setError(errors);
        }

    }
    return (
        <>
            <form action="" onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="Organisation name" className='text-sm'>Name of the organisation:</label>
                    <input type="text" name="org_name" id="" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={input.org_name} />
                    {error.org_name && <p className='text-red-500'>{error.org_name}</p>}

                </div>
                <div className="mb-4">
                    <label htmlFor="applicant name" className='text-sm'>Full name of the applicant *</label>
                    <input type="text" name="applicant_name" id="" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={input.applicant_name} />
                    {error.applicant_name && <p className='text-red-500'>{error.applicant_name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="employee id" className='text-sm'>Employee id:</label>
                    <input type="text" name="em_id" id="" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={input.em_id} />
                    {error.em_id && <p className='text-red-500'>{error.em_id}</p>}

                </div>
                <div className="mb-4">
                    <label htmlFor="emial" className='text-sm'>Email id*:</label>
                    <input type="email" name="email" id="" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={input.email} />
                    {error.email && <p className='text-red-500'>{error.email}</p>}
                </div>

                <button type="submit" className='bg-green-400 text-white p-3 rounded-md w-full hover:bg-green-200'>Submit Link</button>
                <span className='flex justify-center py-4 font-bold text-lg '>OR</span>
                <button type="submit" className='bg-green-400 text-white p-3 rounded-md w-full hover:bg-green-200'>Bulk Mailer</button>

            </form>
        </>
    )
}

export default CandidateForm
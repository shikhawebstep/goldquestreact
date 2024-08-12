import React, { useState } from 'react'

const BulkUploadForm = () => {
    const [input, setInput] = useState({
        OrganisationName: "",
        SpocName: "",
        attachdoc: "",
        remarks: "",
    });
    const [error, setError] = useState({});
    const handleInputChange = (e) => {
        const { name, value, files, type } = e.target;
        setInput((prevInput) => ({
            ...prevInput, [name]: type === "file" ? files[0] : value,
        }))
    };

    const validateErrors = () => {
         const newErrors={};
         if(!input.OrganisationName){newErrors.OrganisationName='This is Required'}
         if(!input.SpocName){newErrors.SpocName='This is Required'}
         if(!input.attachdoc){newErrors.attachdoc='This is Required'}
         if(!input.remarks){newErrors.remarks='This is Required'}
         return newErrors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateErrors();
        if (Object.keys(errors).length === 0) {
            console.log(input);
            setError({});
        }
        else {
            setError(errors);
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="Organisation Name">Organisation Name</label>
                    <input type="text"
                        name="OrganisationName"
                        id="Organisation_Name"
                        className='outline-none pe-14 ps-2 text-left rounded-md w-full border p-2'
                        onChange={handleInputChange}
                        value={input.OrganisationName}
                    />
                    {error.OrganisationName && <p className='text-red-500'>{error.OrganisationName}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="Spoc Name">Spoc Name</label>
                    <input type="text"
                        name="SpocName"
                        id="Spoc_Name"
                        className='outline-none pe-14 ps-2 text-left rounded-md w-full border p-2'
                        onChange={handleInputChange}
                        value={input.SpocName}
                    />
                    {error.SpocName && <p className='text-red-500'>{error.SpocName}</p>}

                </div>
                <div className="mb-4">
                    <label htmlFor="Attach Docs">Attach Docs:</label>
                    <input type="file"
                        name="attachdoc"
                        id="AttachDocs"
                        className='outline-none pe-14 ps-2 text-left rounded-md w-full border p-2'
                        onChange={handleInputChange}
                    />
                    {error.attachdoc && <p className='text-red-500'>{error.attachdoc}</p>}

                </div>
                <div className="mb-4">
                    <label htmlFor="Remarks">Remarks</label>
                    <input type="text"
                        name="remarks"
                        id="Remarks"
                        className='outline-none pe-14 ps-2 text-left rounded-md w-full border p-2'
                        onChange={handleInputChange}
                        value={input.remarks}
                    />
                    {error.remarks && <p className='text-red-500'>{error.remarks}</p>}

                </div>
                <button className="bg-green-500 text-white rounded-md p-3" type='submit'>Upload</button>
            </form>
        </>
    )
}

export default BulkUploadForm
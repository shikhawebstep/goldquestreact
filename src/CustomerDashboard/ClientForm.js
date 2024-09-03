import React, { useState } from 'react'
import Swal from 'sweetalert2';

const ClientForm = () => {
    const [clientInput, setClientInput] = useState({
        name: '',
        attach_documents: '1.pdf,3.jpg',
        employee_id: '',
        spoc: '',
        location: '',
        batch_number: '',
        sub_client: '',
        photo: 'hh.hg'
    });
    const [inputError, setInputError] = useState({});
    const handleChange = (event) => {
        const { name, files, value, type } = event.target;
        setClientInput((prev) => ({
            ...prev, [name]: type === 'file' ? files[0] : value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!clientInput.organisation_name) { newErrors.organisation_name = "This Field is Required" }
        if (!clientInput.name) { newErrors.name = "This Field is Required" }
        if (!clientInput.attach_documents) { newErrors.attach_documents = "This Field is Required" }
        if (!clientInput.employee_id) { newErrors.employee_id = "This Field is Required" }
        if (!clientInput.spoc) { newErrors.spoc = "This Field is Required" }
        if (!clientInput.location) { newErrors.location = "This Field is Required" }
        if (!clientInput.batch_number) { newErrors.batch_number = "This Field is Required" }
        if (!clientInput.sub_client) { newErrors.sub_client = "This Field is Required" }
        if (!clientInput.photo) { newErrors.photo = "This Field is Required" }
        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            const branch_id = JSON.parse(localStorage.getItem("branch"))?.id;
            const branch_token = localStorage.getItem("branch_token");
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "branch_id": branch_id,
                "_token": branch_token,
                "name": clientInput.name,
                "attach_documents": clientInput.attach_documents,
                "employee_id": clientInput.employee_id,
                "spoc": clientInput.spoc,
                "location": clientInput.location,
                "batch_number": clientInput.batch_number,
                "sub_client": clientInput.sub_client,
                "photo": clientInput.photo
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
            console.log(requestOptions);
            
            fetch("https://goldquestreact.onrender.com/branch/client-application/create", requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            const errorData = JSON.parse(text);
                            Swal.fire(
                                'Error!',
                                `An error occurred: ${errorData.message}`,
                                'error'
                            );
                            throw new Error(text);
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    const newToken = data._token || data.token;
                    if (newToken) {
                        localStorage.setItem("_token", newToken);
                    }
                    setClientInput({
                        name: '',
                        attach_documents: '',
                        employee_id: '',
                        spoc: '',
                        location: '',
                        batch_number: '',
                        sub_client: '',
                        photo: ''
                    });
                    setInputError({});
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        } else {
            setInputError(errors);
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="md:flex gap-5">
                    <div className="mb-4 md:w-6/12">
                        <label htmlFor="organisation name" className='text-sm'>Name of the organisation:</label>
                        <input type="text" name="organisation_name" id="Organisation_Name" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.organisation_name} />
                        {inputError.organisation_name && <p className='text-red-500'>{inputError.organisation_name}</p>}
                    </div>
                    <div className="mb-4 md:w-6/12">
                        <label htmlFor="Applicant Name" className='text-sm'>Full name of the applicant *</label>
                        <input type="text" name="name" id="Applicant-Name" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.name} />
                        {inputError.name && <p className='text-red-500'>{inputError.name}</p>}

                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="attach_documents" className='text-sm'>Attach attach_documentss: * </label>
                    <input type="file" name="attach_documents" id="Attach_Docs" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} />

                    {inputError.attach_documents && <p className='text-red-500'>{inputError.attach_documents}</p>}

                </div>
                <div className="md:flex gap-5">
                    <div className="mb-4 md:w-6/12">
                        <label htmlFor="employee id" className='text-sm'>Employee id:</label>
                        <input type="text" name="employee_id" id="EmployeeId" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.employee_id} />
                        {inputError.employee_id && <p className='text-red-500'>{inputError.employee_id}</p>}

                    </div>
                    <div className="mb-4 md:w-6/12">
                        <label htmlFor="spoc case" className='text-sm'>Name of the spoc case uploaded:</label>
                        <input type="text" name="spoc" id="spoc" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.spoc} />
                        {inputError.spoc && <p className='text-red-500'>{inputError.spoc}</p>}

                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="locations" className='text-sm'>Location:</label>
                    <input type="text" name="location" id="Locations" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.location} />
                    {inputError.location && <p className='text-red-500'>{inputError.location}</p>}

                </div>
                <div className="md:flex gap-5">
                    <div className="mb-4 md:w-6/12">
                        <label htmlFor="Batch Number" className='text-sm'>Batch number:</label>
                        <input type="text" name="batch_number" id="Batch-Number" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.batch_number} />
                        {inputError.batch_number && <p className='text-red-500'>{inputError.batch_number}</p>}

                    </div>
                    <div className="mb-4 md:w-6/12">
                        <label htmlFor="sub client" className='text-sm'>Sub client:</label>
                        <input type="text" name="sub_client" id="SubClient" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.sub_client} />
                        {inputError.sub_client && <p className='text-red-500'>{inputError.sub_client}</p>}

                    </div>
                </div>
                <button type="submit" className='bg-green-400 hover:bg-green-200 text-white p-3 rounded-md w-full'>Send</button>
                <div className="border p-4 mt-5 rounded-md">

                    <div className="mb-4">
                        <label htmlFor="photo">Upload photo:</label>
                        <input type="file" name="photo" id="upPhoto" className="border w-full rounded-md p-2 mt-2 outline-none" onChange={handleChange} />
                        {inputError.photo && <p className='text-red-500'>{inputError.photo}</p>}

                    </div>
                    <button type="submit" className='bg-green-400 hover:bg-green-200 text-white p-3 rounded-md w-full'>Bulk Upload</button>
                </div>
            </form>
        </>
    )
}

export default ClientForm
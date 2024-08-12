import React, { useState } from 'react'

const ClientForm = () => {
    const [clientInput, setClientInput] = useState({
        organisation_name: "",
        applicant_name: "",
        Document: "",
        employee_id: "",
        spoc_case: "",
        location: "",
        batch_number: "",
        sub_client: "",
        photo: "",
    });
    const [inputError, setInputError] = useState({});
    const handleChange = (event) => {
        const { name, files, value, type } = event.target;
        setClientInput((prev) => ({
            ...prev, [name]: type === 'file' ? files[0] : value,
        }));
    };

    const validate=()=>{
        const newErrors={};
        if(!clientInput.organisation_name){newErrors.organisation_name="This Field is Required"}
        if(!clientInput.applicant_name){newErrors.applicant_name="This Field is Required"}
        if(!clientInput.Document){newErrors.Document="This Field is Required"}
        if(!clientInput.employee_id){newErrors.employee_id="This Field is Required"}
        if(!clientInput.spoc_case){newErrors.spoc_case="This Field is Required"}
        if(!clientInput.location){newErrors.location="This Field is Required"}
        if(!clientInput.batch_number){newErrors.batch_number="This Field is Required"}
        if(!clientInput.sub_client){newErrors.sub_client="This Field is Required"}
        if(!clientInput.photo){newErrors.photo="This Field is Required"}
        return newErrors;
    }

    const handleSubmit=(e)=>{
           e.preventDefault();
           const errors=validate();
           if(Object.keys(errors).length===0){
               console.log(clientInput);
               setInputError({});
           }
           else{
            setInputError(errors)
           }
    }
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
                        <input type="text" name="applicant_name" id="Applicant-Name" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.applicant_name} />
                        {inputError.applicant_name && <p className='text-red-500'>{inputError.applicant_name}</p>}

                        </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="Document" className='text-sm'>Attach documents: * </label>
                    <input type="file" name="Document" id="Attach_Docs" className="border w-full rounded-md p-2 mt-2" onChange={handleChange}  />
                    
                    {inputError.Document && <p className='text-red-500'>{inputError.Document}</p>}

                    </div>
                <div className="md:flex gap-5">
                    <div className="mb-4 md:w-6/12">
                        <label htmlFor="employee id" className='text-sm'>Employee id:</label>
                        <input type="text" name="employee_id" id="EmployeeId" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.employee_id} />
                        {inputError.employee_id && <p className='text-red-500'>{inputError.employee_id}</p>}

                        </div>
                    <div className="mb-4 md:w-6/12">
                        <label htmlFor="spoc case" className='text-sm'>Name of the spoc case uploaded:</label>
                        <input type="text" name="spoc_case" id="spoc_case" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.spoc_case} />
                        {inputError.spoc_case && <p className='text-red-500'>{inputError.spoc_case}</p>}

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
                        <input type="file" name="photo" id="upPhoto" className="border w-full rounded-md p-2 mt-2 outline-none" onChange={handleChange}  />
                        {inputError.photo && <p className='text-red-500'>{inputError.photo}</p>}

                    </div>
                    <button type="submit" className='bg-green-400 hover:bg-green-200 text-white p-3 rounded-md w-full'>Bulk Upload</button>
                </div>
            </form>
        </>
    )
}

export default ClientForm
import React, { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import DropBoxContext from './DropBoxContext';

const ClientForm = () => {
    const [clientInput, setClientInput] = useState({
        name: '',
        attach_documents: '1.pdf',
        employee_id: '',
        spoc: '',
        location: '',
        batch_number: '',
        sub_client: '',
        photo: '2.pdg',
        services: [], 
        package: '',
        client_application_id: ''
    });
    const [, setBranchId] = useState(null);
    const [, setStoredToken] = useState(null);
    const { selectedDropBox, } = useContext(DropBoxContext);
    const [isEditClient, setIsEditClient] = useState(false);
    const [inputError, setInputError] = useState({});
    const { services, uniquePackages } = useContext(DropBoxContext);
    const validate = () => {
        const newErrors = {};
        if (!clientInput.name) { newErrors.name = "This Field is Required" }
        if (!clientInput.attach_documents) { newErrors.attach_documents = "This Field is Required" }
        if (!clientInput.employee_id) { newErrors.employee_id = "This Field is Required" }
        if (!clientInput.spoc) { newErrors.spoc = "This Field is Required" }
        if (!clientInput.location) { newErrors.location = "This Field is Required" }
        if (!clientInput.batch_number) { newErrors.batch_number = "This Field is Required" }
        if (!clientInput.sub_client) { newErrors.sub_client = "This Field is Required" }
        if (!clientInput.photo) { newErrors.photo = "This Field is Required" }
        return newErrors;
    };

    useEffect(() => {
        const storedBranchData = JSON.parse(localStorage.getItem("branch"));
        const branch_token = localStorage.getItem("branch_token");
        const branchData = localStorage.getItem("branch");

        if (storedBranchData) setBranchId(storedBranchData.id);
        if (branch_token) setStoredToken(branch_token);
        if (selectedDropBox) {
            setClientInput({
                name: selectedDropBox.name,
                attach_documents: null,
                employee_id: selectedDropBox.employee_id,
                spoc: selectedDropBox.spoc,
                location: selectedDropBox.location,
                batch_number: selectedDropBox.batch_number,
                sub_client: selectedDropBox.sub_client,
                photo: null,
                services: selectedDropBox.services || [], 
                package: selectedDropBox.package || '',
                client_application_id: selectedDropBox.id
            });
            
            setIsEditClient(true);

        } else {
            setClientInput({
                name: "",
                attach_documents: null,
                employee_id: "",
                spoc: "",
                location: "",
                batch_number: "",
                sub_client: "",
                photo: null,
                services: [], 
                package: "",
                client_application_id: "",
            });
            setIsEditClient(false);
        }
    }, [selectedDropBox]);


    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        if (name === 'services') {
            setClientInput((prev) => {
                const updatedServices = checked
                    ? [...prev.services, value]
                    : prev.services.filter(serviceId => serviceId !== value);

                return {
                    ...prev,
                    services: updatedServices
                };
            });
        } else {
            setClientInput((prev) => ({
                ...prev, [name]: value
            }));
        }
    };

  

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            const branch_id = JSON.parse(localStorage.getItem("branch"))?.id;
            const branch_token = localStorage.getItem("branch_token");
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            const servicesString = Array.isArray(clientInput.services) ? clientInput.services.join(',') : '';
           

            const Raw = JSON.stringify({
                "branch_id": branch_id,
                "_token": branch_token,
                "name": clientInput.name,
                "attach_documents": clientInput.attach_documents,
                "employee_id": clientInput.employee_id,
                "spoc": clientInput.spoc,
                "location": clientInput.location,
                "batch_number": clientInput.batch_number,
                "sub_client": clientInput.sub_client,
                "photo": clientInput.photo,
                "services": servicesString,
                "package": clientInput.package,
                "client_application_id": clientInput.client_application_id,
            });

            const requestOptions = {
                method: isEditClient ? 'PUT' : "POST",
                headers: myHeaders,
                body:Raw,
                redirect: "follow"
            };
            const url = isEditClient
                ? 'https://goldquestreact.onrender.com/branch/client-application/update'
                : 'https://goldquestreact.onrender.com/branch/client-application/create';

            fetch(url, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            const errorData = JSON.parse(text);
                            Swal.fire('Error!', `An error occurred: ${errorData.message}`, 'error');
                            throw new Error(text);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    const newToken = data._token || data.token;
                    if (newToken) {
                        localStorage.setItem("branch_token", newToken);
                    }
                    setClientInput({
                        name: '',
                        attach_documents: null,
                        employee_id: '',
                        spoc: '',
                        location: '',
                        batch_number: '',
                        sub_client: '',
                        photo: null,
                        services: [], // Reset to empty array
                        package: '',
                        client_application_id: ''
                    });
                    setInputError({});
                    Swal.fire({
                        title: "Success",
                        text:  isEditClient ? 'Client Application Edit Successfully' : 'Client Application  added successfully',
                        icon: "success",
                        confirmButtonText: "Ok"
                    });
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });
        } else {
            setInputError(errors);
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="grid gap-4 grid-cols-2 mb-4">
                    <div className="col bg-white shadow-md rounded-md p-3 md:p-6">
                        <div className="md:flex gap-5">
                            <div className="mb-4 md:w-6/12">
                                <label htmlFor="organisation_name" className='text-sm'>Name of the organisation:</label>
                                <input type="text" name="organisation_name" id="Organisation_Name" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.organisation_name} />
                                {inputError.organisation_name && <p className='text-red-500'>{inputError.organisation_name}</p>}
                            </div>
                            <div className="mb-4 md:w-6/12">
                                <label htmlFor="name" className='text-sm'>Full name of the applicant *</label>
                                <input type="text" name="name" id="Applicant-Name" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.name} />
                                {inputError.name && <p className='text-red-500'>{inputError.name}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="attach_documents" className='text-sm'>Attach documents: *</label>
                            <input type="file" name="attach_documents" id="Attach_Docs" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} />
                            {inputError.attach_documents && <p className='text-red-500'>{inputError.attach_documents}</p>}
                        </div>
                        <div className="md:flex gap-5">
                            <div className="mb-4 md:w-6/12">
                                <label htmlFor="employee_id" className='text-sm'>Employee ID:</label>
                                <input type="text" name="employee_id" id="EmployeeId" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.employee_id} />
                                {inputError.employee_id && <p className='text-red-500'>{inputError.employee_id}</p>}
                            </div>
                            <div className="mb-4 md:w-6/12">
                                <label htmlFor="spoc" className='text-sm'>Name of the spoc case uploaded:</label>
                                <input type="text" name="spoc" id="spoc" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.spoc} />
                                {inputError.spoc && <p className='text-red-500'>{inputError.spoc}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location" className='text-sm'>Location:</label>
                            <input type="text" name="location" id="Locations" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.location} />
                            {inputError.location && <p className='text-red-500'>{inputError.location}</p>}
                        </div>
                        <div className="md:flex gap-5">
                            <div className="mb-4 md:w-6/12">
                                <label htmlFor="batch_number" className='text-sm'>Batch number:</label>
                                <input type="text" name="batch_number" id="Batch-Number" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.batch_number} />
                                {inputError.batch_number && <p className='text-red-500'>{inputError.batch_number}</p>}
                            </div>
                            <div className="mb-4 md:w-6/12">
                                <label htmlFor="sub_client" className='text-sm'>Sub client:</label>
                                <input type="text" name="sub_client" id="SubClient" className="border w-full rounded-md p-2 mt-2" onChange={handleChange} value={clientInput.sub_client} />
                                {inputError.sub_client && <p className='text-red-500'>{inputError.sub_client}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photo">Upload photo:</label>
                            <input type="file" name="photo" id="upPhoto" className="border w-full rounded-md p-2 mt-2 outline-none" onChange={handleChange} />
                            {inputError.photo && <p className='text-red-500'>{inputError.photo}</p>}
                        </div>
                    </div>
                    <div className="col bg-white shadow-md rounded-md p-3 md:p-6">
                        <div className="flex flex-wrap flex-col-reverse">
                            <div>
                                <h2 className='bg-green-500 rounded-md p-4 text-white mb-4 hover:bg-green-200'>Service Names</h2>
                                {services.length > 0 ? (
                                    <ul>
                                        {services.map((item) => (
                                            <li key={item.serviceId} className={`border p-2 my-1 flex gap-3 items-center ${clientInput.services.includes(item.serviceId) ? 'selected' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    name="services"
                                                    value={item.serviceId}
                                                    onChange={handleChange}
                                                    checked={clientInput.services.includes(item.serviceId)}
                                                />
                                                <div className='font-bold'>{item.serviceTitle}</div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No services available</p>
                                )}
                            </div>
                            <div>
                                <form className='pb-5'>
                                    <strong>Packages:</strong>
                                    {uniquePackages.length > 0 ? (
                                        <select
                                            className='border w-full rounded-md p-2 mt-2 outline-none'
                                            name="package"
                                            onChange={handleChange}
                                            value={clientInput.package}
                                        >
                                            {uniquePackages.map(pkg => (
                                                <option key={pkg.id} value={pkg.id}>{pkg.name || "No Name"}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p>No packages available</p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className='bg-green-400 hover:bg-green-200 text-white p-3 rounded-md w-auto'>{isEditClient ? ("Edit") : ("Send")}</button>
                <button type="button" className='bg-green-400 hover:bg-green-200 mt-4 text-white p-3 rounded-md w-auto ms-3'>Bulk Upload</button>
            </form >
        </>
    )
}

export default ClientForm;


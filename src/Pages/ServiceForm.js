import React, { useEffect, useState } from 'react';
import { useService } from './ServiceContext';

const ServiceForm = () => {
    const { selectedService, updateServiceList } = useService();

    const [isEdit, setIsEdit] = useState(false);
    const [serviceInput, setServiceInput] = useState({
        name: "",
        d_name: "",
    });
    const [error, setError] = useState({});
    const [formMessage, setFormMessage] = useState("");

    useEffect(() => {
        if (selectedService) {
            setServiceInput({
                name: selectedService.title || '',
                d_name: selectedService.description || '',
            });
            setIsEdit(true);
        } else {
            setServiceInput({
                name: "",
                d_name: "",
            });
            setIsEdit(false);
        }
    }, [selectedService]);

    const validate = () => {
        const newErrors = {};
        if (!serviceInput.name) {
            newErrors.name = 'This Field is Required!';
        }
        if (!serviceInput.d_name) {
            newErrors.d_name = 'This Field is Required!';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceInput((prevInput) => ({
            ...prevInput, [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validateError = validate();

        if (Object.keys(validateError).length === 0) {
            const adminData = JSON.parse(localStorage.getItem("admin"));
            const storedToken = localStorage.getItem("_token");

            if (!adminData || !storedToken) {
                setFormMessage("Admin ID or token is missing.");
                setTimeout(() => setFormMessage(""), 5000);
                return;
            }

            const requestOptions = {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: selectedService?.id || '',
                    title: serviceInput.name,
                    description: serviceInput.d_name,
                    admin_id: adminData.id,
                    _token: storedToken,
                }),
            };

            const url = isEdit
                ? `https://goldquestreact.onrender.com/service/update`
                : `https://goldquestreact.onrender.com/service/create`;

            fetch(url, requestOptions)
                .then((response) => response.ok ? response.json() : Promise.reject(response))
                .then((result) => {
                    setFormMessage(isEdit ? 'Service Updated successfully!' : 'Service created successfully!');

                    if (isEdit) {
                        updateServiceList(prevList => prevList.map(service => service.id === result.id ? result : service));
                    } else {
                        updateServiceList(prevList => [...prevList, result]);
                    }

                    setServiceInput({ name: "", d_name: "" });
                    setTimeout(() => setFormMessage(""), 5000);
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    setFormMessage(`An error occurred: ${error.message}`);
                    setTimeout(() => setFormMessage(""), 5000);
                });
        } else {
            setError(validateError);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="ServiceName" className="block">Service Name</label>
                <input
                    type="text"
                    name="name"
                    id="ServiceName"
                    value={serviceInput.name}
                    onChange={handleChange}
                    className='outline-none pe-14 ps-2 text-left rounded-md w-full border p-2 mt-2' />
                {error.name && <p className='text-red-500'>{error.name}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="ServiceDisplayName" className="block">Service Display Name</label>
                <input
                    type="text"
                    name="d_name"
                    id="ServiceDisplayName"
                    value={serviceInput.d_name}
                    onChange={handleChange}
                    className='outline-none pe-14 ps-2 text-left rounded-md w-full border p-2 mt-2' />
                {error.d_name && <p className='text-red-500'>{error.d_name}</p>}
            </div>
            <button className="bg-green-500 hover:bg-green-200 text-white w-full rounded-md p-3" type='submit'>
                {isEdit ? 'Update' : 'Submit'}
            </button>
            {formMessage && <p className="mt-4 text-center text-green-600">{formMessage}</p>}
        </form>
    );
};

export default ServiceForm;

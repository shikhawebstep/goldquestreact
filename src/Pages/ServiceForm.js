import React, { useCallback, useEffect, useState } from 'react';

const ServiceForm = () => {
    const [loading, setLoading] = useState(true);
    const [serviceInput, setServiceInput] = useState({
        name: "",
        d_name: "",
        package_id: "",
    });
    const [option, setOptions] = useState([]);
    const [error, setError] = useState({});
    const [formMessage, setFormMessage] = useState(""); 

    const fetchData = useCallback(() => {
        const adminData = JSON.parse(localStorage.getItem("admin"));
        const storedToken = localStorage.getItem("_token");
        setLoading(true);

        const queryParams = new URLSearchParams({
            admin_id: adminData?.id || '',
            _token: storedToken || ''
        }).toString();

        fetch(`https://goldquestreact.onrender.com/package/list?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('fetched data:', data);
            setOptions(data.packages || []);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            setFormMessage('Failed to load data');
        })
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const Validations = () => {
        const newErrors = {};
        if (!serviceInput.name) {
            newErrors.name = 'This Field is Required!';
        }
        if (!serviceInput.d_name) {
            newErrors.d_name = 'This Field is Required!';
        }
        if (!serviceInput.package_id) {
            newErrors.package_id = 'Please select a package!';
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
        const validateError = Validations();
        const adminData = JSON.parse(localStorage.getItem("admin"));
        const storedToken = localStorage.getItem("_token");

        if (Object.keys(validateError).length === 0) {
            if (!adminData || !storedToken) {
                setFormMessage("Admin ID or token is missing.");
                setTimeout(() => setFormMessage(""), 5000);
                return;
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                title: serviceInput.name,
                description: serviceInput.d_name,
                admin_id: adminData.id,
                package_id: serviceInput.package_id,
                _token: storedToken,
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch("https://goldquestreact.onrender.com/service/create", requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            console.error('Server error:', text);
                            throw new Error(text);
                        });
                    }
                    return response.json();
                })
                .then((result) => {
                    console.log(result);
                    setError({});
                    setFormMessage('Service created successfully!');
                    setServiceInput({
                        name: "",
                        d_name: "",
                        package_id: "",
                    });

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
        <>
            <form action="" className="" onSubmit={handleSubmit}>
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
                <div className="mb-4">
                    <label htmlFor="ServicePackage" className="block">Select Packages</label>
                    <select
                        name="package_id"
                        id="ServicePackage"
                        value={serviceInput.package_id}
                        onChange={handleChange}
                        className='outline-none pe-14 ps-2 text-left rounded-md w-full border p-2 mt-2'>
                        {option.map((item) => (
                            <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {error.package_id && <p className='text-red-500'>{error.package_id}</p>}
                </div>
                <button className="bg-green-500 hover:bg-green-200 text-white w-full rounded-md p-3" type='submit'>Submit</button>

                {formMessage && <p className="mt-4 text-center text-green-600">{formMessage}</p>} 
            </form>
        </>
    );
};

export default ServiceForm;

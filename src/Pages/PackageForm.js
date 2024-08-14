import React, { useState } from 'react';

const PackageForm = () => {
    const [packageInput, setPackageInput] = useState({
        name: "",
        services: "",
        message: "",
    });
    const [error, setError] = useState({});

    const Validations = () => {
        const errors = {};
        if (!packageInput.name) {
            errors.name = 'This Filed in Required!'
        }
        if (!packageInput.services) {
            errors.services = 'This Filed in Required!'
        }
        if (!packageInput.message) {
            errors.message = 'This Filed in Required!'
        }
        else {

        }
        return errors;

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageInput(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePackageFormSubmit = (e) => {
        e.preventDefault();
        const validationErrors = Validations();
        if (Object.keys(validationErrors).length === 0) {
            console.log(packageInput);
            setError({});
        }
        else {
            setError(validationErrors);
        }
    };

    return (
        <>
            <form action="" onSubmit={handlePackageFormSubmit}>
                <div className="mb-4">
                    <label htmlFor="packagename">Package Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="packagename"
                        className="border w-full rounded-md p-2 mt-2"
                        onChange={handleChange}
                        value={packageInput.name}
                    />
                    {error.name && <p className="text-red-500">{error.name}</p>}

                </div>
                <div className="mb-4">
                    <label htmlFor="services">Select Services</label>
                    <select
                        name="services"
                        id="services"
                        className="w-full border p-2 rounded-md mt-2"
                        onChange={handleChange}
                        value={packageInput.services}
                    >
                        <option value="Service1" selected>Service1</option>
                        <option value="Service2">Service2</option>
                        <option value="Service3">Service3</option>
                        <option value="Service4">Service4</option>
                        <option value="Service5">Service5</option>
                    </select>
                    {error.services && <p className="text-red-500">{error.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="message">Your Message:</label>
                    <textarea
                        name="message"
                        id="message"
                        className="w-full border p-3 outline-none rounded-md mt-2"
                        rows={5}
                        cols={4}
                        onChange={handleChange}
                        value={packageInput.message}
                    ></textarea>
                    {error.message && <p className="text-red-500">{error.message}</p>}
                </div>
                <button
                    type="submit"
                    className='bg-green-400 text-white p-3 rounded-md w-full hover:bg-green-200'
                >
                    Send
                </button>
            </form>
        </>
    );
};

export default PackageForm;

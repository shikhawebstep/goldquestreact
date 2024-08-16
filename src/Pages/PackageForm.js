import React, { useState, useEffect } from 'react';
import { usePackage } from './PackageContext'; // Import the custom hook

const PackageForm = () => {
    const { selectedPackage } = usePackage();
    const [packageInput, setPackageInput] = useState({
        name: "",
        message: "",
    });
    const [error, setError] = useState({});
    const [adminId, setAdminId] = useState(null);
    const [storedToken, setStoredToken] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem("admin"));
        const token = localStorage.getItem("_token");

        if (adminData) setAdminId(adminData.id);
        if (token) setStoredToken(token);

        if (selectedPackage) {
            setPackageInput({
                name: selectedPackage.title || "",
                message: selectedPackage.description || "",
            });
            setIsEditMode(true);
            alert('edit');

          if(isEditMode===true){
            alert('hello');
          }

        } else {
            setPackageInput({
                name: "",
                message: "",
            });
            setIsEditMode(false);
        }

    }, [selectedPackage]);

    const Validations = () => {
        const errors = {};
        if (!packageInput.name) {
            errors.name = 'This Field is Required!';
        }
        if (!packageInput.message) {
            errors.message = 'This Field is Required!';
        }
        return errors;
    };

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
            const requestOptions = {
                method: isEditMode ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "title": packageInput.name,
                    "description": packageInput.message,
                    "admin_id": adminId,
                    "_token": storedToken,
                    ...(isEditMode && { "id": selectedPackage.id }) // Include ID for updates
                }),
                redirect: "follow"
            };

            fetch(`https://goldquestreact.onrender.com/package/${isEditMode ? 'update' : 'add'}`, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(result => {
                    console.log(result);
                    setError({});
                    alert(isEditMode ? 'Package updated successfully' : 'Package added successfully');
                })
                .catch(error => console.error('Fetch error:', error));
        } else {
            setError(validationErrors);
        }
    };

    return (
        <>
            <form onSubmit={handlePackageFormSubmit}>
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
                    <label htmlFor="message">Description:</label>
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
                    {isEditMode ? 'Update' : 'Send'}
                </button>
            </form>
        </>
    );
};

export default PackageForm;

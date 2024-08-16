import React, { useState, useEffect } from 'react';
import { usePackage } from './PackageContext';

const PackageForm = ({ onSuccess }) => {
    const { selectedPackage, clearSelectedPackage } = usePackage(); // Assuming clearSelectedPackage is a function to clear the selected package
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
        } else {
            setPackageInput({
                name: "",
                message: "",
            });
            setIsEditMode(false);
        }
    }, [selectedPackage]);

    const validateInputs = () => {
        const errors = {};
        if (!packageInput.name) {
            errors.name = 'This field is required!';
        }
        if (!packageInput.message) {
            errors.message = 'This field is required!';
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
    
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length === 0) {
            const adminData = JSON.parse(localStorage.getItem("admin"));
            const token = localStorage.getItem("_token");
    
            if (!adminData || !token) {
                console.error("Admin ID or token is missing.");
                return;
            }
    
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            const raw = JSON.stringify({
                id: selectedPackage?.id || "",
                title: packageInput.name,
                description: packageInput.message,
                admin_id: adminData.id,
                _token: token,
            });
    
            console.log('Request body:', raw);
    
            const requestOptions = {
                method: isEditMode ? "PUT" : "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
    
            const url = isEditMode
                ? "https://goldquestreact.onrender.com/package/update"
                : "https://goldquestreact.onrender.com/package/create";
    
            fetch(url, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            console.error('Server error:', text);
                            throw new Error(text);
                        });
                    }
                    return response.json();
                })
                .then(result => {
                    console.log(result);
                    setError({});
                    alert(isEditMode ? 'Package updated successfully' : 'Package added successfully');
    
                    // Reset form fields
                    setPackageInput({
                        name: "",
                        message: "",
                    });
                    setIsEditMode(false);

                    // Clear selected package in context or parent component
                    if (typeof clearSelectedPackage === 'function') {
                        clearSelectedPackage();
                    }

                    // If onSuccess is provided, call it
                    if (typeof onSuccess === 'function') {
                        onSuccess(result); // Pass the result to onSuccess
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    alert(`An error occurred: ${error.message}`);
                });
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

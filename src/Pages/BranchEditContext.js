import React, { createContext, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useData } from './DataContext';

const BranchEditContext = createContext();


export const BranchEditProvider = ({ children }) => {
    const {toggleAccordion}=useData()
    const [branchEditData, setBranchEditData] = useState({
        id: '',
        name: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBranchEditData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditBranch = async (e) => {
        e.preventDefault();

        const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
        const storedToken = localStorage.getItem("_token");

        if (!branchEditData.id || !branchEditData.name || !branchEditData.email) {

            Swal.fire(
                'Error!',
                'Missing required fields: Branch ID, Name, Email',
                'error'
            );
            return;
        }

        const raw = JSON.stringify({
            id: branchEditData.id,
            name: branchEditData.name,
            email: branchEditData.email,
            admin_id: admin_id,
            _token: storedToken
        });

        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch('https://goldquestreact.onrender.com/branch/update', requestOptions);
            if (!response.ok) {
                return response.text().then(text => {
                    const errorData = JSON.parse(text);
                    Swal.fire(
                        'Error!',
                        `An error occurred: ${errorData.message}`,
                        'error'
                    );
                });
            }
            const newToken = response._token || response.token; // Use result.token if result._token is not available
            if (newToken) {
                localStorage.setItem("_token", newToken); // Replace the old token with the new one
            }
            Swal.fire(
                'Success!',
                'Branch updated successfully.',
                'success'
            );
            toggleAccordion();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <BranchEditContext.Provider value={{ branchEditData, setBranchEditData, handleInputChange, handleEditBranch }}>
            {children}
        </BranchEditContext.Provider>
    );
};


export const useEditBranch = () => useContext(BranchEditContext);

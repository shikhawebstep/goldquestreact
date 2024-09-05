import React, { createContext, useState, useContext } from 'react';
import Swal from 'sweetalert2';


const ClientEditContext = createContext();


export const ClientEditProvider = ({ children }) => {
    const [clientData, setClientData] = useState({
        company_name: '',
        client_code: '',
        address: '',
        emails: '',
        mobile_number: '',
        contact_person: '',
        state: '',
        name_of_escalation: '',
        state_code: '',
        client_spoc: '',
        gstin: '',
        tat: '',
        date_agreement: '',
        client_standard: '',
        agreement_period: 'Unless terminated',
        agr_upload: null,
        custom_template: 'no',
        custom_logo: null,
        custom_address: '',
        additional_login: 'No',
        username: '',
        services: [],
    });

    const handleClientChange = (e, index) => {
        const { name, value, type, files } = e.target;
        setClientData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleClientSubmit = async (e) => {
        e.preventDefault();
        const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
        const storedToken = localStorage.getItem("_token");

        if (!clientData.company_name || !clientData.client_code || !clientData.address) {
            Swal.fire('Error!', 'Missing required fields: Branch ID, Name, Email', 'error');
            return;
        }

        const raw = JSON.stringify({
            ...clientData,
            admin_id,
            _token: storedToken
        });

        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch('https://goldquestreact.onrender.com/customer/update', requestOptions);
            const contentType = response.headers.get("content-type");

            if (!response.ok) {
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    Swal.fire('Error!', `An error occurred: ${errorData.message}`, 'error');
                } else {
                    const errorText = await response.text();
                    Swal.fire('Error!', `An error occurred: ${errorText}`, 'error');
                }
                return;
            }

            const data = contentType.includes("application/json") ? await response.json() : {};
            const newToken = data._token || data.token;
            if (newToken) {
                localStorage.setItem("_token", newToken);
            }
            Swal.fire('Success!', 'Branch updated successfully.', 'success');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            Swal.fire('Error!', 'There was a problem with the fetch operation.', 'error');
        }
    };


    return (
        <ClientEditContext.Provider value={{ clientData, setClientData, handleClientChange, handleClientSubmit }}>
            {children}
        </ClientEditContext.Provider>
    );
};


export const useEditClient = () => useContext(ClientEditContext);

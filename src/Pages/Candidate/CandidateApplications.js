import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BranchContextExel } from '../BranchContextExel';
import Swal from 'sweetalert2';

const CandidateApplications = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { branch_id, application_id } = useContext(BranchContextExel);
    const [clientData, setClientData] = useState([]);
    const [formData, setFormData] = useState({
        month_year: '',
        initiation_date: '',
        organization_name: '',
        verification_purpose: '',
        employee_id: '',
        client_code: '',
        applicant_name: '',
        contact_number: '',
        contact_number2: '',
        father_name: '',
        dob: '',
        gender: '',
        marital_status: '',
        nationality: '',
        insuff: ''
    });
    const [disabledFields, setDisabledFields] = useState({
        month_year: false,
        initiation_date: false,
        organization_name: false,
        verification_purpose: false,
        employee_id: false,
        client_code: false,
        applicant_name: false,
        contact_number: false,
        contact_number2: false,
        father_name: false,
        dob: false,
        gender: false,
        marital_status: false,
        nationality: false,
        insuff: false
    });

    const fetchClients = useCallback(() => {
        const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
        const storedToken = localStorage.getItem("_token");
        setLoading(true);
        setError(null);

        fetch(`https://goldquestreact.onrender.com/client-master-tracker/application-by-id?application_id=${application_id}&branch_id=${branch_id}&admin_id=${admin_id}&_token=${storedToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
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
            .then((data) => {
                const newToken = data._token || data.token;
                if (newToken) {
                    localStorage.setItem("_token", newToken);
                }
                setClientData(data.application );
              
                setFormData({
                    month_year: data.application.month_year || '',
                    initiation_date: data.application.initiation_date || '',
                    organization_name: data.application.organization_name || '',
                    verification_purpose: data.application.verification_purpose || '',
                    employee_id: data.application.employee_id || '',
                    client_code: data.application.client_code || '',
                    applicant_name: data.application.name || '',
                    contact_number: data.application.contact_number || '',
                    contact_number2: data.application.contact_number2 || '',
                    father_name: data.application.father_name || '',
                    dob: data.application.dob || '',
                    gender: data.application.gender || '',
                    marital_status: data.application.marital_status || '',
                    nationality: data.application.nationality || '',
                    insuff: data.application.insuff || ''
                });
                
                setDisabledFields({
                    month_year: !!data.application.month_year,
                    initiation_date: !!data.application.initiation_date,
                    organization_name: !!data.application.organization_name,
                    verification_purpose: !!data.application.verification_purpose,
                    employee_id: !!data.application.employee_id,
                    client_code: !!data.application.client_code,
                    applicant_name: !!data.application.name,
                    contact_number: !!data.application.contact_number,
                    contact_number2: !!data.application.contact_number2,
                    father_name: !!data.application.father_name,
                    dob: !!data.application.dob,
                    gender: !!data.application.gender,  
                    marital_status: !!data.application.marital_status,
                    nationality: !!data.application.nationality,
                    insuff: !!data.application.insuff
                });
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setError('Failed to load client data');
            })
            .finally(() => setLoading(false));
    }, [application_id, branch_id]);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);
   console.log(clientData)
    return (
        <form>
            <div className="grid grid-cols-2 gap-3">
                <div className="mb-4">
                    <label htmlFor="month">Month -Year*</label>
                    <input
                        type="text"
                        name="month"
                        id="month_year"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.month_year}
                        disabled={disabledFields.month_year}
                        onChange={(e) => setFormData({ ...formData, month_year: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Initiation Date">Initiation Date</label>
                    <input
                        type="date"
                        name="initiation_date"
                        id="initiation_date"
                        className="w-full border p-2 outline-none rounded-md mt-2 capitalize"
                        value={formData.initiation_date}
                        disabled={disabledFields.initiation_date}
                        onChange={(e) => setFormData({ ...formData, initiation_date: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="mb-4">
                    <label htmlFor="organization name">Name of the Client Organization</label>
                    <input
                        type="text"
                        name="organization_name"
                        id="organization_name"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.organization_name}
                        disabled={disabledFields.organization_name}
                        onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Verification Purpose*">Verification Purpose*</label>
                    <input
                        type="text"
                        name="verification_purpose*"
                        id="verification_purpose"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.verification_purpose}
                        disabled={disabledFields.verification_purpose}
                        onChange={(e) => setFormData({ ...formData, verification_purpose: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="mb-4">
                    <label htmlFor="Applicant Employee ID">Applicant Employee ID</label>
                    <input
                        type="text"
                        name="employee_id"
                        id="employee_id"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.employee_id}
                        disabled={disabledFields.employee_id}
                        onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Client Code">Client Code</label>
                    <input
                        type="text"
                        name="client_code"
                        id="Client_Code"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.client_code}
                        disabled={disabledFields.client_code}
                        onChange={(e) => setFormData({ ...formData, client_code: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="mb-4">
                    <label htmlFor="applicant name">Name of the Applicant*</label>
                    <input
                        type="text"
                        name="applicant_name"
                        id="applicant_name"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.applicant_name}
                        disabled={disabledFields.applicant_name}
                        onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="contact number">Contact Number</label>
                    <input
                        type="number"
                        name="contact_number"
                        id="contact_number"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.contact_number}
                        disabled={disabledFields.contact_number}
                        onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="mb-4">
                    <label htmlFor="contact number2">Contact Number 2:</label>
                    <input
                        type="number"
                        name="contact_number2"
                        id="contact_number2"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.contact_number2}
                        disabled={disabledFields.contact_number2}
                        onChange={(e) => setFormData({ ...formData, contact_number2: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Father Name">Father's Name:</label>
                    <input
                        type="text"
                        name="father_name"
                        id="father_name"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.father_name}
                        disabled={disabledFields.father_name}
                        onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="mb-4">
                    <label htmlFor="gender">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        className="border w-full rounded-md p-2 mt-2"
                        value={formData.gender}
                        disabled={disabledFields.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="marital_status">Marital Status</label>
                    <select
                        name="marital_status"
                        id="marital_status"
                        className="border w-full rounded-md p-2 mt-2"
                        value={formData.marital_status}
                        disabled={disabledFields.marital_status}
                        onChange={(e) => setFormData({ ...formData, marital_status: e.target.value })}
                    >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => fetchClients()}>
                    Refresh
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CandidateApplications;

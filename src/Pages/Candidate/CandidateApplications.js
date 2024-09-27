import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BranchContextExel } from '../BranchContextExel';
import Swal from 'sweetalert2';
import { useGenerateReport } from '../GenerateReportContext'; // Adjust the import path
import LatestEmployeement from '../LatestEmployeement'

const CandidateApplications = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { branch_id, application_id } = useContext(BranchContextExel);
    const [clientData, setClientData] = useState([]);
    const { formData, setFormData, handleInputChange, handleFormSubmit } = useGenerateReport(); // Access context
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
    console.log('this is',formData.permanent_address)
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
                setClientData(data.application);

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
                    insuff: data.application.insuff || '',
                    permanent_address:formData.permanent_address.permanent_address || '' ,
                    sender_name:formData.permanent_address.sender_name || '',
                    reciever_name:formData.permanent_address.reciever_name || '',
                    permanent_landmark:formData.permanent_address.permanent_landmark || '',
                    pin_code:formData.permanent_address.pin_code || '',
                    permanent_state:formData.permanent_address.permanent_state || '',
                    address:formData.address.address || '',
                    landmark:formData.address.landmark || '',
                    residence_mobile_number:formData.address.residence_mobile_number || '',
                    state:formData.address.state || '',
                    
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
                    insuff: !!data.application.insuff,
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


    return (
        <form onSubmit={handleFormSubmit}>
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                    >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                </div>
            </div>
            <h3 className='text-2xl text-center font-bold my-5'>Permanent Address</h3>
            <div className="form-group border p-3 rounded-md">
                <div className="mb-4">
                    <label htmlFor="full_address">Full Address:</label>
                    <input
                        type="text"
                        name="permanent_address"
                        id="full_address"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.permanent_address.permanent_address}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <h3 className='font-semibold text-xl mb-3'>Period of Stay</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-4">
                            <label htmlFor="sender_name">From:</label>
                            <input
                                type="text"
                                name="sender_name"
                                id="sender_name"
                                className="border w-full rounded-md p-2 mt-2 capitalize"
                                value={formData.permanent_address.sender_name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="reciever_name">To:</label>
                            <input
                                type="text"
                                name="reciever_name"
                                id="reciever_name"
                                className="w-full border p-2 outline-none rounded-md mt-2 capitalize"
                                value={formData.permanent_address.reciever_name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-4">
                            <label htmlFor="permanent_landmark">Landmark:</label>
                            <input
                                type="text"
                                name="permanent_landmark"
                                id="permanent_landmark"
                                className="border w-full rounded-md p-2 mt-2 capitalize"
                                value={formData.permanent_address.permanent_landmark}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="pin_code">Pin Code:</label>
                            <input
                                type="text"
                                name="pin_code"
                                id="pin_code"
                                className="w-full border p-2 outline-none rounded-md mt-2 capitalize"
                                value={formData.permanent_address.pin_code}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="permanent_state">State:</label>
                        <input
                            type="text"
                            name="permanent_state"
                            id="permanent_state"
                            className="w-full border p-2 outline-none rounded-md mt-2 capitalize"
                            value={formData.permanent_address.permanent_state}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <h3 className='text-2xl text-center font-semi-bold my-5'>Current Address</h3>
            <div className="form-group border rounded-md p-3">
                <div className="mb-4">
                    <label htmlFor="full_address">Full Address:</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.address.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Landmark">Landmark:</label>
                    <input
                        type="text"
                        name="landmark"
                        id="landmark"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.address.landmark}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="residence_mobile_number">Residence Mobile No:</label>
                    <input
                        type="text"
                        name="residence_mobile_number"
                        id="residence_mobile_number"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                        value={formData.address.residence_mobile_number}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        name="state"
                        id="state"
                        className="w-full border p-2 outline-none rounded-md mt-2 capitalize"
                        value={formData.address.state}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <LatestEmployeement />
            <button>submit</button>
        </form>
    );
};

export default CandidateApplications;

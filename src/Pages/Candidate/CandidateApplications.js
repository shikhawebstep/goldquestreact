import React from 'react'

const CandidateApplications = () => {
    return (
        <>

            <form>
                <div className="grid grid-cols-2 gap-3">
                    <div className="mb-4">
                        <label htmlFor="month">Month -Year*</label>
                        <input
                            type="text"
                            name="month"
                            id="month_year"
                            className="border w-full rounded-md p-2 mt-2 capitalize"
                        />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="Initiation Date">Initiation Date</label>
                        <input type="date" name="initiation_date"
                            id="initiation_date"
                            className="w-full border p-2 outline-none rounded-md mt-2 capitalize"
                            value='' />
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
                        />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="Verification Purpose*">Verification Purpose*</label>
                        <input
                            type="text"
                            name="verification_purpose*"
                            id="verification_purpose"
                            className="border w-full rounded-md p-2 mt-2 capitalize"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="mb-4">
                        <label htmlFor="Applicant Employee ID">Applicant Employee ID</label>
                        <input
                            type="text"
                            name="applicant_employee_id"
                            id="applicant_employee_id"
                            className="border w-full rounded-md p-2 mt-2 capitalize"
                        />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="Client Code">Client Code</label>
                        <input
                            type="text"
                            name="client_code"
                            id="Client_Code"
                            className="border w-full rounded-md p-2 mt-2 capitalize"
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
                        />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="contact number">Contact Number</label>
                        <input
                            type="number"
                            name="contact_number"
                            id="contact_number"
                            className="border w-full rounded-md p-2 mt-2 capitalize"
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
                        />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="fater name">Father Full Name:</label>
                        <input
                            type="text"
                            name="fater_name"
                            id="fater_name"
                            className="border w-full rounded-md p-2 mt-2 capitalize"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="mb-4">
                        <label htmlFor="Date of Birth:">Date of Birth:</label>
                        <input
                            type="text"
                            name="dob"
                            id="dob"
                            className="border w-full rounded-md p-2 mt-2 capitalize"
                        />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="Gender:">Gender:</label>
                        <select name="" id="" className="border w-full rounded-md p-2 mt-2 capitalize">
                            <option value="" selected></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="mb-4">
                        <label htmlFor="status">Marital Status:</label>
                        <select name="" id="" className="border w-full rounded-md p-2 mt-2 capitalize">
                            <option value="" selected></option>
                            <option value="Singal">Singal</option>
                            <option value="Married">Married</option>
                        </select>

                    </div>

                    <div className="mb-4">
                        <label htmlFor="Nationality:">Nationality:</label>
                        <input
                            type="text"
                            name="nationality"
                            id="nationality"
                            className="border w-full rounded-md p-2 mt-2 capitalize"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="insuff">Insuff Cleared Date / Re-Opened date*:</label>
                    <input
                        type="date"
                        name="insuff"
                        id="insuff"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                    />

                </div>


            </form>
        </>
    )
}

export default CandidateApplications
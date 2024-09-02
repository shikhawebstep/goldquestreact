import React, { useState, useMemo } from "react";
import countryList from 'react-select-country-list';
import ClientManagementData from './ClientManagementData';
import { useClient } from "./ClientManagementContext";
import Swal from 'sweetalert2';

const ClientManagement = () => {
  const options = useMemo(() => countryList().getData(), []);
  const { clientData } = useClient();

  const [input, setInput] = useState({
    company_name: "",
    client_code: "",
    address: "",
    state_code: "",
    state: "",
    mobile_number: "",
    name_of_escalation: "",
    client_spoc: "",
    contact_person: "",
    gstin: "",
    tat: "",
    date_agreement: "",
    agreement_period: "",
    client_standard: "",
    custom_logo: "",
    agr_upload: "",
    additional_login: "no",
    custom_template: "",
    custom_address: "",
    username: "",
    clientData:[
      
    ]
  });

  const [branchForms, setBranchForms] = useState([{ branch_name: "", branch_email: "" }]);
  const [emails, setEmails] = useState([""]); // Change to an array of strings
  const [errors, setErrors] = useState({});

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name.startsWith("branch_")) {
      const newBranchForms = [...branchForms];
      newBranchForms[index][name] = value;
      setBranchForms(newBranchForms);
    } else if (name.startsWith("email")) {
      const newEmails = [...emails];
      newEmails[index] = value;
      setEmails(newEmails);
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "company_name", "client_code", "address", "state_code", "state", "mobile_number",
      "name_of_escalation", "client_spoc", "contact_person", "gstin", "tat",
      "date_agreement", "agreement_period", "client_standard", "agr_upload",
      "additional_login", "custom_template",
    ];

    requiredFields.forEach(field => {
      if (!input[field]) newErrors[field] = "This field is required*";
    });

    if (input.mobile_number && input.mobile_number.length !== 10) {
      newErrors.mobile_number = "Please enter a valid phone number, containing 10 characters";
    }

    branchForms.forEach((form, index) => {
      if (!form.branch_name) newErrors[`branch_name_${index}`] = "This field is required*";
      if (!form.branch_email) newErrors[`branch_email_${index}`] = "This field is required*";
    });

    emails.forEach((email, index) => {
      if (!email) newErrors[`email${index}`] = "This field is required*";
    });

    return newErrors;
  };

  // Map emails to an array of strings
  const newData = emails.map(email => email);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    console.log('Validation Errors:', validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const adminData = JSON.parse(localStorage.getItem("admin"));
      const token = localStorage.getItem("_token");

      const requestData = {
        admin_id: adminData.id,
        ...input,
        _token: token,
        branches: branchForms,
        emails: newData, // Pass emails as an array of strings
        clientData: clientData,
      };

      console.log('Request Data:', requestData);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
        redirect: "follow",
      };
      console.log(requestOptions.body);

      fetch("https://goldquestreact.onrender.com/customer/create", requestOptions)
        .then((response) => {
          if (!response.ok) {
            return response.text().then(text => {
                const errorData = JSON.parse(text);
                Swal.fire(
                    'Error!',
                    `An error occurred: ${errorData.message}`,
                    'error'
                );
                throw new Error(text);
            });
          }
          const newToken = response._token || response.token;
          if (newToken) {
              localStorage.setItem("_token", newToken);
          }
          return response.json();
        })
        .then((result) => {

          console.log('Form Submit Result:', result);
          Swal.fire({
            title: "Success",
            text: 'Client Created Successfully',
            icon: "success",
            confirmButtonText: "Ok"
          });

          // Reset form state
          setInput({});
          setEmails([""]); // Reset to initial state
          setBranchForms([{ branch_name: "", branch_email: "" }]);
          setErrors({});
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const addMoreFields = () => {
    setBranchForms([...branchForms, { branch_name: "", branch_email: "" }]);
  };

  const addMoreEmails = () => {
    setEmails([...emails, ""]); // Add an empty string to the array
  };

  const deleteField = (index) => {
    const newBranchForms = branchForms.filter((_, i) => i !== index);
    setBranchForms(newBranchForms);
  };

  const deleteEmails = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  return (
    <>
      <div className="py-4 md:py-16 m-4">
        <h2 className="md:text-4xl text-2xl md:mb-8 font-bold pb-8 md:pb-4 text-center">
          Client Management
        </h2>
        <div className="md:w-9/12 m-auto bg-white shadow-md rounded-md p-3 md:p-10">

          <form onSubmit={handleFormSubmit} >
            <div className="md:flex gap-5">
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="company_name">Company Name: *</label>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.company_name}
                  onChange={handleChange}
                />
                {errors.company_name && <p className="text-red-500">{errors.company_name}</p>}
              </div>

              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="client_code">Client Code: *</label>
                <input
                  type="text"
                  name="client_code"
                  id="client_code"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.client_code}
                  onChange={handleChange}
                />
                {errors.client_code && <p className="text-red-500">{errors.client_code}</p>}
              </div>
            </div>
            <div className="md:flex gap-5">
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="address">Address: *</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.address}
                  onChange={handleChange}
                />
                {errors.address && <p className="text-red-500">{errors.address}</p>}
              </div>
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="mobile_number">Mobile: *</label>
                <input
                  type="number"
                  name="mobile_number"
                  id="mobile_number"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.mobile_number}
                  onChange={handleChange}
                />
                {errors.mobile_number && <p className="text-red-500">{errors.mobile_number}</p>}
              </div>

            </div>

            <div className="md:flex gap-5">

              <div className="mb-4 md:w-6/12">
                <label htmlFor="contact_person">Contact Person: *</label>
                <input
                  type="text"
                  name="contact_person"
                  id="contact_person"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.contact_person}
                  onChange={handleChange}
                />
                {errors.contact_person && <p className="text-red-500">{errors.contact_person}</p>}
              </div>
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="state">State: *</label>
                <select name="state" id="state" className="w-full border p-2 rounded-md mt-2" value={input.state} onChange={handleChange}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {errors.state && <p className="text-red-500">{errors.state}</p>}
              </div>
            </div>

            <div className="md:flex gap-5">
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="state_code">State Code: *</label>
                <input
                  type="number"
                  name="state_code"
                  id="state_code"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.state_code}
                  onChange={handleChange}
                />
                {errors.state_code && <p className="text-red-500">{errors.state_code}</p>}
              </div>
              <div className="mb-4 md:w-6/12">
              <label className="text-gray-500" htmlFor="name_of_escalation">Name of the Escalation Point of Contact:*</label>
              <input
                type="text"
                name="name_of_escalation"
                id="name_of_escalation"
                className="border w-full rounded-md p-2 mt-2 outline-none"
                value={input.name_of_escalation}
                onChange={handleChange}
              />
              {errors.name_of_escalation && <p className="text-red-500">{errors.name_of_escalation}</p>}
            </div>

            </div>
            <div className="my-8 grid gap-5 grid-cols-2 items-center flex-wrap">
            {emails.map((email, index) => (
              <div className="mb-4 flex gap-3 items-center " key={index} >
                <label className="text-gray-500 block text-sm whitespace-nowrap" htmlFor={`email${index}`}>
                  Email: *{index + 1}
                </label>
                <input
                  type="text"
                  name={`email${index}`}
                  id={`email${index}`}
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={email}
                  onChange={(e) => handleChange(e, index)}
                />
                 {errors[`email${index}`] && (
                  <p className="text-red-500 whitespace-nowrap">{errors[`email${index}`]}</p>
                )}
              
                {index > 0 && (
                  <button
                    className="bg-red-500 rounded-md p-3  text-white"
                    type="button"
                    onClick={() => deleteEmails(index)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
            
              <button className="bg-green-500 text-white rounded-3 p-2 mt-0 rounded-md" type="button" onClick={addMoreEmails}>ADD MORE</button>
            </div>

           

            <div className="md:flex gap-5">
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="client_spoc">Name of The Client SPOC:*</label>
                <input
                  type="text"
                  name="client_spoc"
                  id="client_spoc"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.client_spoc}
                  onChange={handleChange}
                />
                {errors.client_spoc && <p className="text-red-500">{errors.client_spoc}</p>}
              </div>

              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="gstin">GSTIN: *</label>
                <input
                  type="text"
                  name="gstin"
                  id="gstin"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.gstin}
                  onChange={handleChange}
                />
                {errors.gstin && <p className="text-red-500">{errors.gstin}</p>}
              </div>
            </div>

            <div className="md:flex gap-5">
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="tat">TAT: *</label>
                <input
                  type="text"
                  name="tat"
                  id="tat"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.tat}
                  onChange={handleChange}
                />
                {errors.tat && <p className="text-red-500">{errors.tat}</p>}
              </div>

              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="date_agreement">Date of Service Agreement:*</label>
                <input
                  type="date"
                  name="date_agreement"
                  id="date_agreement"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.date_agreement}
                  onChange={handleChange}
                />
                {errors.date_agreement && <p className="text-red-500">{errors.date_agreement}</p>}
              </div>
            </div>

            <div className="md:flex gap-5">
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="client_standard">Client Standard Procedure:</label>
                <textarea name="client_standard"
                  id="client_standard"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.client_standard}
                  onChange={handleChange}></textarea>
                {errors.client_standard && <p className="text-red-500">{errors.client_standard}</p>}
              </div>
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="agreement_period">Agreement Period: *</label>

                <select name="agreement_period" className="border w-full rounded-md p-2 mt-2 outline-none" id="agreement_period" onChange={handleChange} value={input.agreement_period}>
                  <option value="Unless terminated" selected>Unless terminated</option>
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value="3 year">3 year</option>
                </select>
                {errors.agreement_period && <p className="text-red-500">{errors.agreement_period}</p>}
              </div>
            </div>
            <div className="mb-4">
              <label className="text-gray-500" htmlFor="agr_upload">Agreement Upload:</label>
              <input
                type="file"
                name="agr_upload"
                id="agr_upload"
                className="border w-full rounded-md p-2 mt-2 outline-none"
                onChange={handleChange}
              />
              {errors.agr_upload && <p className="text-red-500">{errors.agr_upload}</p>}
            </div>

            <div className="mb-4">
              <label className="text-gray-500" htmlFor="custom_template">Required Custom Template:*</label>
              <select name="custom_template" id="custom_template" value={input.custom_template} className="border w-full rounded-md p-2 mt-2 outline-none" onChange={handleChange}>
                <option value="yes">yes</option>
                <option value="no" selected>no</option>
              </select>
              {input.custom_template === 'yes' && (
                <>
                  <div className="mb-4 mt-4">
                    <label htmlFor="custom_logo" className="text-gray-500">Upload Custom Logo :*</label>
                    <input
                      type="file"
                      name="custom_logo"
                      id="custom_logo"
                      onChange={handleChange}
                      className="border w-full rounded-md p-2 mt-2 outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="" className="text-gray-500">Custom Address</label>
                    <textarea
                      name="custom_address"
                      id="custom_address"
                      onChange={handleChange}
                      value={input.custom_address}
                      className="border w-full rounded-md p-2 mt-2 outline-none"
                    ></textarea>
                  </div>
                </>
              )}
            </div>
            <div className="mb-4">
              <label className="text-gray-500" htmlFor="additional_login">Additional login Required</label>
              <div className="flex items-center gap-10 mt-4">
                <div>
                  <input
                    type="radio"
                    name="additional_login"
                    value="Yes"
                    checked={input.additional_login === "Yes"}
                    onChange={handleChange}
                    className="me-2"
                  />Yes
                </div>
                <div>
                  <input
                    type="radio"
                    name="additional_login"
                    value="No"
                    checked={input.additional_login === "No"}
                    onChange={handleChange}
                    className="me-2"
                  />No
                </div>
              </div>
              {input.additional_login === "Yes" && (
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username2"
                  value={input.username}
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  onChange={handleChange}
                />
              )}
            </div>


            {branchForms.map((form, index) => (
              <div className="my-8 flex gap-5 items-center" key={index}>
                <div className="mb-4 md:w-5/12">
                  <label className="text-gray-500" htmlFor={`branch_name_${index}`}>Branch: *{index + 1}</label>
                  <input
                    type="text"
                    name="branch_name"
                    id={`branch_name_${index}`}
                    className="border w-full rounded-md p-2 mt-2 outline-none"
                    value={form.branch_name}
                    onChange={(e) => handleChange(e, index)}
                  />
                  {errors[`branch_name_${index}`] && <p className="text-red-500">{errors[`branch_name_${index}`]}</p>}
                </div>
                <div className="mb-4 md:w-5/12">
                  <label className="text-gray-500" htmlFor={`branch_email_${index}`}> Branch Email:</label>
                  <input
                    type="email"
                    name="branch_email"
                    id={`branch_email_${index}`}
                    className="border w-full rounded-md p-2 mt-2 outline-none"
                    value={form.branch_email}
                    onChange={(e) => handleChange(e, index)}
                  />
                  {errors[`branch_email_${index}`] && <p className="text-red-500">{errors[`branch_email_${index}`]}</p>}
                </div>

                {
                  branchForms.length > 1 ? (
                    <button
                      type="button"
                      className="text-white bg-red-500 rounded-md mt-3 p-3 md:w-2/12"
                      onClick={() => deleteField(index)}
                    >
                      Delete Branch
                    </button>
                  ) : ('')
                }

              </div>
            ))}

            <button
              type="button"
              id="AddMore"
              onClick={addMoreFields}
              className="bg-green-400 w-auto text-white p-2 rounded-md hover:bg-green-200"
            >
              Add More
            </button>
            <ClientManagementData />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-200 w-full text-white p-3 mt-5 rounded-md hover:bg-green-500"
              >
                Submit
              </button>
            </div>

          </form>
        </div>

      </div>
    </>
  );
};

export default ClientManagement;

import React, { useState } from "react";
import ClientManagementData from './ClientManagementData'
const ClientManagement = () => {
  const [input, setInput] = useState({
    company_name: "",
    client_code: "",
    address: "",
    state_code: "",
    state: "",
    mobile_number: "",
    email: "",
    cc1_email: "",
    cc2_email: "",
    contact_person: "",
    role: "",
    name_of_escalation: "",
    client_spoc: "",
    gstin: "",
    tat: "",
    date_agreement: "",
    Agreement_Period: "",
    client_standard: "",
    c_logo: '',
    agr_upload: '',
    additional_login: "",
    required_template:"no",
    custom_address:"",
    username:"",
    package_name:"",
  });

  const [branchForms, setBranchForms] = useState([{ branch_name: "", branch_email: ""}]);

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e, index) => {
    const { name, value, type, files } = e.target;

    if (name.startsWith("branch_")) {
      const newBranchForms = [...branchForms];
      newBranchForms[index][name] = type === "file" ? files[0] : value;
      setBranchForms(newBranchForms);
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!input.company_name) newErrors.company_name = "This field is required*";
    if (!input.client_code) newErrors.client_code = "This field is required*";
    if (!input.address) newErrors.address = "This field is required*";
    if (!input.state_code) newErrors.state_code = "This field is required*";
    if (!input.state) newErrors.state = "This field is required*";
    if (!input.mobile_number){
      newErrors.mobile_number = "This field is required*";
    } 
    else if(input.mobile_number.length !==10){
      newErrors.mobile_number = "Please enter a valid phone number,containing 10 characters";
    }
    if (!input.email) newErrors.email = "This field is required*";
    if (!input.cc1_email){
      newErrors.cc1_email = "This field is required*";
    } 
    else if(input.cc1_email===input.email || input.cc1_email===input.cc2_email){
      newErrors.cc1_email = "Please enter another Email*"; 
    }
   
    if (!input.cc2_email) {
      newErrors.cc2_email = "This field is required*";
  } else if (input.cc1_email === input.cc2_email || input.email === input.cc2_email) {
      newErrors.cc2_email = "Please enter a valid, different CC email*";
  }
    if (!input.contact_person) newErrors.contact_person = "This field is required*";
    if (!input.role) newErrors.role = "This field is required*";
    if (!input.name_of_escalation) newErrors.name_of_escalation = "This field is required*";
    if (!input.client_spoc) newErrors.client_spoc = "This field is required*";
    if (!input.gstin) newErrors.gstin = "This field is required*";
    if (!input.tat) newErrors.tat = "This field is required*";
    if (!input.date_agreement) newErrors.date_agreement = "This field is required*";
    if (!input.client_standard) newErrors.client_standard = "This field is required*";
    if (!input.Agreement_Period) newErrors.Agreement_Period = "This field is required*";
    if (!input.package_name) newErrors.package_name = "This field is required*";
  
    branchForms.forEach((form, index) => {
      if (!form.branch_name) newErrors[`branch_name_${index}`] = "This field is required*";
      if (!form.branch_email) newErrors[`branch_email_${index}`] = "This field is required*";
    });

    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    console.log('Validation Errors:', validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      const adminData = JSON.parse(localStorage.getItem("admin"));
      const token = localStorage.getItem("_token");
  
      const requestData = {
        admin_id: adminData,
        _token: token,
        ...input,
        branches: branchForms, // Ensure you're including branchForms properly
      };
      
      console.log('Request Data:', requestData);
  
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
        redirect: "follow",
      };
      console.log(JSON.stringify(requestData, null, 2));

      fetch("https://goldquestreact.onrender.com/customer/create", requestOptions)
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              console.error("Server error:", text);
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then((result) => {
          console.log('Form Submit Result:', result);
       
          setSuccessMessage("Form submitted successfully!");
          setInput({
            company_name: "",
            client_code: "",
            address: "",
            state_code: "",
            state: "",
            mobile_number: "",
            email: "",
            cc1_email: "",
            cc2_email: "",
            contact_person: "",
            role: "",
            name_of_escalation: "",
            client_spoc: "",
            gstin: "",
            tat: "",
            date_agreement: "",
            Agreement_Period: "",
            client_standard: "",
            c_logo: '',
            agr_upload: '',
            additional_login: "",
            required_template:"",
            custom_address:"",
            username:"",
            package_name:""
          });
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

  const deleteField = (index) => {
    const newBranchForms = branchForms.filter((_, i) => i !== index);
    setBranchForms(newBranchForms);
  };

  return (
    <>
      <div className="py-4 md:py-16 m-4">
        <h2 className="md:text-4xl text-2xl md:mb-8 font-bold pb-8 md:pb-4 text-center">
          Client Management
        </h2>
        <div className="md:w-9/12 m-auto bg-white shadow-md rounded-md p-3 md:p-10">
          {successMessage && (
            <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-200 rounded">
              {successMessage}
            </div>
          )}
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
                <label className="text-gray-500" htmlFor="state">State: *</label>
                <select
                  name="state"
                  id="state"
                  className="w-full border p-2 rounded-md mt-2"
                  value={input.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  <option value="State1">State1</option>
                  <option value="State2">State2</option>
                  <option value="State3">State3</option>
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
                <label className="text-gray-500" htmlFor="email">Email: *</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="cc1_email">CC1 Email: *</label>
                <input
                  type="email"
                  name="cc1_email"
                  id="cc1_email"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.cc1_email}
                  onChange={handleChange}
                />
                {errors.cc1_email && <p className="text-red-500">{errors.cc1_email}</p>}
              </div>
            </div>

            <div className="md:flex gap-5">
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="cc2_email">CC2 Email: *</label>
                <input
                  type="email"
                  name="cc2_email"
                  id="cc2_email"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.cc2_email}
                  onChange={handleChange}
                />
                {errors.cc2_email && <p className="text-red-500">{errors.cc2_email}</p>}
              </div>

              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="contact_person">Contact Person: *</label>
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
            </div>

            <div className="md:flex gap-5">
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="role">Role: *</label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="border w-full rounded-md p-2 mt-2 outline-none"
                  value={input.role}
                  onChange={handleChange}
                />
                {errors.role && <p className="text-red-500">{errors.role}</p>}
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
                <textarea  name="client_standard"
                id="client_standard"
                className="border w-full rounded-md p-2 mt-2 outline-none"
                value={input.client_standard}
                onChange={handleChange}></textarea>
                {errors.client_standard && <p className="text-red-500">{errors.client_standard}</p>}
              </div>
              <div className="mb-4 md:w-6/12">
                <label className="text-gray-500" htmlFor="Agreement_Period">Agreement Period: *</label>
              
                <select name="Agreement_Period"  className="border w-full rounded-md p-2 mt-2 outline-none"  id="Agreement_Period"  onChange={handleChange} value={input.Agreement_Period}>
                <option value="Unless terminated" selected>Unless terminated</option>
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                </select>
                {errors.Agreement_Period && <p className="text-red-500">{errors.Agreement_Period}</p>}
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
            <label className="text-gray-500" htmlFor="agr_upload">Agreement Upload:</label>
            <input
              type="text"
              name="package_name"
              id="package_name"
              className="border w-full rounded-md p-2 mt-2 outline-none"
              onChange={handleChange}
            />
            {errors.package_name && <p className="text-red-500">{errors.package_name}</p>}
          </div>
            <div className="mb-4">
            <label className="text-gray-500" htmlFor="required_template">Required Custom Template:*</label>
            <select name="required_template" id="required_template" value={input.required_template}   className="border w-full rounded-md p-2 mt-2 outline-none"  onChange={handleChange}>
            <option value="yes">yes</option>
            <option value="no">no</option>
            </select>
            {input.required_template==='yes' && (
              <>
              <div className="mb-4 mt-4">
              <label htmlFor="custom_logo" className="text-gray-500">Upload Custom Logo :*</label>
              <input 
              type="file" 
              name="c_logo" 
              id="c_logo" 
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
              <div className="my-8" key={index}>
                <div className="mb-4">
                  <label className="text-gray-500" htmlFor={`branch_name_${index}`}>Head Branch Name: *</label>
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
                <div className="mb-4">
                  <label className="text-gray-500" htmlFor={`branch_email_${index}`}>Head Branch Email:</label>
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
                  branchForms.length>1?(
                    <button
                    type="button"
                    className="text-white bg-red-500 rounded-md p-3"
                    onClick={() => deleteField(index)}
                  >
                    Delete Branch
                  </button>
                  ):('')
                }
               
              </div>
            ))}

            <button
              type="button"
              id="AddMore"
              onClick={addMoreFields}
              className="bg-green-400 w-auto text-white p-3 rounded-md hover:bg-green-200"
            >
              Add More
            </button>

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
        <ClientManagementData/>
      </div>
    </>
  );
};

export default ClientManagement;

import { createContext, useContext, useState } from "react";

// Create the context
const GenerateReportContext = createContext();

// Create the provider component
const GenerateReportProvider = ({ children }) => {
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
        insuff: '',
        address: {
            address: '',
            landmark: '',
            residence_mobile_number: '',
            state: '',
        },
        permanent_address: {
            permanent_address: '',
            sender_name: '',
            reciever_name: '',
            permanent_landmark: '',
            pin_code: '',
            permanent_state: '',
        },
        insuffDetails: {
            first_insufficiency_marks: '',
            first_insuff_date: '',
            first_insuff_reopened_date: '',
            second_insufficiency_marks: '',
            second_insuff_date: '',
            second_insuff_reopened_date: '',
            third_insufficiency_marks: '',
            third_insuff_date: '',
            third_insuff_reopened_date: '',
            overall_status: '',
            report_date: '',
            report_status: '',
            report_type: '',
            final_verification_status: '',
            is_verify: '',
            deadline_date: '',
            insuff_address: '',
            basic_entry: '',
            education: '',
            case_upload: '',
            emp_spoc: '',
            report_generate_by: '',
            qc_done_by: '',
            delay_reason: ''
        }
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // Handle nested object updates for permanent_address
        if (name.startsWith('permanent_address.')) {
            const field = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                permanent_address: {
                    ...prevState.permanent_address,
                    [field]: value,
                },
            }));
        } else {
            // Handle regular fields
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    

  const handleFormSubmit=(e)=>{
       e.preventDefault();
       console.log('====================================');
       console.log(formData);
       console.log('====================================');

  }

    return (
        <GenerateReportContext.Provider value={{ formData,handleFormSubmit, setFormData,handleInputChange }}>
            {children}
        </GenerateReportContext.Provider>
    );
}

// Custom hook to use the GenerateReportContext
export const useGenerateReport = () => useContext(GenerateReportContext);

export default GenerateReportProvider;

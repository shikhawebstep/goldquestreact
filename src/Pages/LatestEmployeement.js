import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useApi } from '../ApiContext';
import Swal from 'sweetalert2';
import { BranchContextExel } from './BranchContextExel';

const LatestEmployeement = () => {
  const { service_id, setServiceId } = useContext(BranchContextExel);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { API_URL } = useApi();
  const [formData, setFormData] = useState({});
 

  const fetchServices = useCallback(() => {
    const servicesArray = service_id ? service_id.split(',').map(Number) : [];
    const admin_id = JSON.parse(localStorage.getItem("admin"))?.id;
    const storedToken = localStorage.getItem("_token");
    setLoading(true);
    setError(null);

    servicesArray.forEach((serviceId) => {
      fetch(`https://goldquestreact.onrender.com/client-master-tracker/report-form-json-by-service-id?service_id=${serviceId}&admin_id=${admin_id}&_token=${storedToken}`, {
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

          const parsedJson = JSON.parse(data.reportFormJson.json || '{}');
          setFormData(prevState => ({
            ...prevState,
            [serviceId]: parsedJson, // Store form data for each service
          }));
        })
        .catch((error) => {
          console.error('Fetch error:', error);
          setError('Failed to load data');
        })
        .finally(() => setLoading(false));
    });

  }, [service_id]);

  useEffect(() => {
    fetchServices();
    setServiceId();
  }, [fetchServices, setServiceId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleInputChange = (e) => {

  };

  return (
    <>
    
      {Object.entries(formData).map(([serviceId, form], index) => (
        <div key={serviceId} className="form-section">
          <h4 className="text-2xl text-center mt-4 font-bold my-5">Form for Service {serviceId}: {form.heading}</h4>
          <div className="form-group bg-gray-200 p-3 rounded-md mb-4">
            {form.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="mb-4">
                {row.inputs.map((input, inputIndex) => (
                  <div key={inputIndex} className="mb-4">
                    <label className='capitalize' htmlFor={input.name}>{input.label}</label>
                    {input.type === 'text' && (
                      <input
                        type="text"
                        name={input.name}
                        id={input.name}
                        className="border w-full rounded-md p-2 mt-2"
                        onChange={handleInputChange}
                      />
                    )}
                    {input.type === 'dropdown' && (
                      <select
                        name={input.name}
                        id={input.name}
                        className="border w-full rounded-md p-2 mt-2"
                        onChange={handleInputChange}
                      >
                        <option value="" selected></option>
                        {input.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.value}>
                            {option.showText}
                          </option>
                        ))}
                      </select>
                    )}
                    {input.type === 'file' && (
                      <input
                        type="file"
                        name={input.name}
                        id={input.name}
                        className="border w-full rounded-md p-2 mt-2 bg-white"
                        onChange={handleInputChange}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="form-group border rounded-md p-3">
      <div className="mb-4">
        <label className='capitalize text-gray-500' htmlFor="First Level Insufficiency Remarks">First Level Insufficiency Remarks</label>
        <input
          type="text"
          name="first_insufficiency_marks"
          id="first_insufficiency_marks"
          className="border w-full rounded-md p-2 mt-2 capitalize"
        />

      </div>
      <div className="mb-4">
        <label className='capitalize text-gray-500' htmlFor="First Insuff Raised Date:">First Insuff Raised Date:</label>
        <input
          type="text"
          name="first_insuff_date"
          id="first_insuff_date"
          className="border w-full rounded-md p-2 mt-2 capitalize"
        />

      </div>
      <div className="mb-4">
        <label className='capitalize text-gray-500' htmlFor="First Insuff Cleared Date / Re-Opened date">First Insuff Cleared Date / Re-Opened date</label>
        <input
          type="text"
          name="first_insuff_reopened_date"
          id="first_insuff_reopened_date"
          className="border w-full rounded-md p-2 mt-2 capitalize"
        />

      </div>
      <div className="mb-4">
        <label className='capitalize text-gray-500' htmlFor="second Level Insufficiency Remarks">Second Level Insufficiency Remarks</label>
        <input
          type="text"
          name="second_insufficiency_marks"
          id="second_insufficiency_marks"
          className="border w-full rounded-md p-2 mt-2 capitalize"
        />

      </div>
      <div className="mb-4">
        <label className='capitalize text-gray-500' htmlFor="second Insuff Raised Date:">Second Insuff Raised Date:</label>
        <input
          type="text"
          name="second_insuff_date"
          id="second_insuff_date"
          className="border w-full rounded-md p-2 mt-2 capitalize"
        />

      </div>
      <div className="mb-4">
        <label className='capitalize text-gray-500' htmlFor="second Insuff Cleared Date / Re-Opened date">Second Insuff Cleared Date / Re-Opened date</label>
        <input
          type="text"
          name="second_insuff_reopened_date"
          id="second_insuff_reopened_date"
          className="border w-full rounded-md p-2 mt-2 capitalize"
        />

      </div>
      <div className="mb-4">
        <label className='capitalize text-gray-500' htmlFor="third Level Insufficiency Remarks">third Level Insufficiency Remarks</label>
        <input
          type="text"
          name="third_insufficiency_marks"
          id="third_insufficiency_marks"
          className="border w-full rounded-md p-2 mt-2 capitalize"
        />

      </div>
      <div className="mb-4">
        <label className='capitalize text-gray-500' htmlFor="third Insuff Raised Date:">third Insuff Raised Date:</label>
        <input
          type="text"
          name="third_insuff_date"
          id="third_insuff_date"
          className="border w-full rounded-md p-2 mt-2 capitalize"
        />

      </div>
      <div className="mb-4">
        <label className='capitalize text-gray-500' htmlFor="third Insuff Cleared Date / Re-Opened date">third Insuff Cleared Date / Re-Opened date</label>
        <input
          type="text"
          name="third_insuff_reopened_date"
          id="third_insuff_reopened_date"
          className="border w-full rounded-md p-2 mt-2 capitalize"
        />

      </div>
      <div className="mb-4 ">
        <label className='capitalize text-gray-500' htmlFor="overall status">overall status</label>
        <select name="" id="" className="border rounded-md p-2 mt-2 uppercase w-full">
          <option value="">insuff</option>
          <option value="">inititated</option>
          <option value="" wip></option>
          <option value="">hold</option>
        </select>

      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="mb-4">
          <label className='capitalize text-gray-500' htmlFor="report date">report date</label>
          <input
            type="date"
            name="report_date"
            id="report_date"
            className="border rounded-md p-2 w-full mt-2 capitalize"
          />

        </div>
        <div className="mb-4">
          <label className='capitalize text-gray-500' htmlFor="overall status">Report Status:</label>
          <select name="" id="" className="border rounded-md p-2 mt-2 uppercase w-full">
            <option value="">insuff</option>
            <option value="">inititated</option>
            <option value="">wip</option>
            <option value="">hold</option>
          </select>

        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="mb-4">
          <label className='capitalize text-gray-500' htmlFor="report status">Report Type:</label>
          <select name="" id="" className="border rounded-md p-2 mt-2 uppercase w-full">
            <option value="">insuff</option>
            <option value="">inititated</option>
            <option value="">wip</option>
            <option value="">hold</option>
          </select>

        </div>
        <div className="mb-4">
          <label className='capitalize text-gray-500' htmlFor="Final Verification Status:">Final Verification Status:</label>
          <select name="" id="" className="border w-full rounded-md p-2 mt-2 uppercase">
            <option value="">insuff</option>
            <option value="">inititated</option>
            <option value="" wip></option>
            <option value="">hold</option>
          </select>

        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="mb-4">
          <label className='capitalize text-gray-500  ' htmlFor="Is verified by quality team">Is verified by quality team</label>
          <select name="" id="" className="border w-full rounded-md p-2 mt-2 uppercase">
            <option value="">yes</option>
            <option value="">no</option>
          </select>

        </div>
        <div className="mb-4">
          <label className='capitalize text-gray-500 ' htmlFor="deadline date">deadline date</label>
          <input
            type="date"
            name="deadline_date"
            id="deadline_date"
            className="border w-full rounded-md p-2 mt-2 capitalize"
          />

        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="mb-4">
          <label className='capitalize text-gray-500 ' htmlFor="Address">Address</label>
          <select name="" id="" className="border w-full rounded-md p-2 mt-2 uppercase">
            <option value="">yes</option>
            <option value="">no</option>
          </select>

        </div>
        <div className="mb-4 ">
          <label className='capitalize text-gray-500' htmlFor="basic entry">basic entry</label>
          <select name="" id="" className="border w-full rounded-md p-2 mt-2 uppercase">
            <option value="">yes</option>
            <option value="">no</option>
          </select>

        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="mb-4 ">
          <label className='capitalize text-gray-500 ' htmlFor="education">education</label>
          <select name="" id="" className="border w-full rounded-md p-2 mt-2 uppercase">
            <option value="">yes</option>
            <option value="">no</option>
          </select>

        </div>

        <div className="mb-4">
          <label className='capitalize text-gray-500' htmlFor="case upload">case upload</label>
          <input
            type="text"
            name="case_upload"
            id="case_upload"
            className="border w-full rounded-md p-2 mt-2 capitalize"
          />

        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="mb-4 ">
          <label className='capitalize text-gray-500 block' htmlFor="Employment Spoc:">Employment Spoc:</label>
          <select name="" id="" className="border w-full rounded-md p-2 mt-2 uppercase">
            <option value="">yes</option>
            <option value="">no</option>
          </select>

        </div>
        <div className="mb-4 ">
          <label className='capitalize text-gray-500' htmlFor="Report Generated By:">Report Generated By:</label>
          <select name="" id="" className="border w-full rounded-md p-2 mt-2 uppercase">
            <option value="">yes</option>
            <option value="">no</option>
          </select>

        </div>
      </div>
      <div className="mb-4 ">
        <label className='capitalize block text-gray-500' htmlFor="QC Done By:">QC Done By:</label>
        <select name="" id="" className="border w-full rounded-md p-2 mt-2 uppercase">
          <option value="">yes</option>
          <option value="">no</option>
        </select>

      </div>
      <div className="mb-4">
        <label className='capitalize text-gray-500' htmlFor="Remarks & reason for Delay:">Remarks & reason for Delay:</label>
        <input
          type="text"
          name="delay_reason"
          id="delay_reason"
          className="border w-full rounded-md p-2 mt-2 capitalize"
        />

      </div>

    </div>
    </>
  );
};

export default LatestEmployeement;

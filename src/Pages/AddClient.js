import React, { useState } from 'react';

const App = () => {
  const [forms, setForms] = useState([{ id: Date.now() }]);

  const addForm = () => {
    setForms([...forms, { id: Date.now() }]);
  };

  const removeForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  return (
    <div className="my-8">
      {forms.map((form) => (
        <Form key={form.id} id={form.id} removeForm={removeForm} />
      ))}
      <button type="button" className="bg-green-400 text-white p-3 rounded-md hover:bg-green-200" onClick={addForm}>
        Add More
      </button>
    </div>
  );
};

const Form = ({ id, removeForm }) => (
  <div className="mb-8">
    <form action="" id={`form-${id}`}>
      <div className="mb-4">
        <label htmlFor={`client-logo-${id}`}>Client Logo:</label>
        <input type="file" id={`client-logo-${id}`} className="border w-full rounded-md p-2 mt-2 outline-none" />
      </div>
      <div className="md:flex gap-5">
        <div className="mb-4 md:w-6/12">
          <label htmlFor={`branch-name-${id}`}>Branch Name *</label>
          <input type="text" id={`branch-name-${id}`} className="border w-full rounded-md p-2 mt-2 outline-none" />
        </div>
        <div className="mb-4 md:w-6/12">
          <label htmlFor={`branch-head-email-${id}`}>Branch Head Email</label>
          <input type="email" id={`branch-head-email-${id}`} className="border w-full rounded-md p-2 mt-2 outline-none" />
        </div>
      </div>
    </form>
    <button type="button" className="bg-red-400 text-white p-3 rounded-md hover:bg-red-200 ms-4" onClick={() => removeForm(id)}>
      Delete
    </button>
  </div>
);

export default App;

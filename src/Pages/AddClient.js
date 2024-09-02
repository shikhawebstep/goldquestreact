import React, { useState } from 'react';

const AddClient = () => {
  const [input, setInput] = useState({
    image: '',
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, files } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.image) {
      setError({ image: 'Please upload a file first.' });
      return;
    }

    setError({});

    const formData = new FormData();
    formData.append('image', input.image);

    try {
      const response = await fetch('https://goldquestreact.onrender.com/customer/image-upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        setInput({ image: null });
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  return (
    <>
      <form className='border p-3 rounded-md' onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="file"
            name="image"
            id="agreement"
            className='w-full p-3 border rounded-md mb-2'
            onChange={handleChange}
          />
          {error.image && <span className="text-red-500">{error.image}</span>}
          <button type="submit" className='p-3 bg-green-500 text-white border-0 rounded-md'>
            Submit
          </button>
        </div>

        {input.image && <p>Selected file: {input.image.name}</p>}
      </form>
    </>
  );
};

export default AddClient;

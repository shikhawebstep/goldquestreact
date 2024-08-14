import React, { useState } from 'react'

const ServiceForm = () => {
    const[serviceInput,setServiceInput]=useState({
       name:"",
       d_name:"",
    });

    const[error,setError]=useState({});

    const Validations=()=>{
        const newerrors={};
        if(!serviceInput.name){
             newerrors.name='This Field is Required!'
        }
        if(!serviceInput.d_name){
             newerrors.d_name='This Field is Required!'
        }
        else{

        }
        return newerrors;
    }
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setServiceInput((prevInput)=>({
            ...prevInput,[name]:value,
        }))
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        const validateError=Validations();
        if(Object.keys(validateError).length===0){ 
            console.log(serviceInput); 
            setError({});
        }
        else{
            setError(validateError);
        }
    }

    return (
        <>
            <form action="" className="" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="" className="block" > Service Name</label>
                    <input 
                    type="text"
                    name="name"
                    id="ServiceName"
                    onChange={handleChange}
                    className='outline-none pe-14 ps-2 text-left rounded-md w-full border p-2 mt-2' />
                    {error.name && <p className='text-red-500'>{error.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="">Service Display Name</label>
                    <input 
                     type="text"
                     name="d_name" 
                     id="ServiveDisplayName" 
                     onChange={handleChange}
                     className='outline-none pe-14 ps-2 text-left rounded-md w-full border p-2 mt-2' />
                     {error.d_name && <p className='text-red-500'>{error.d_name}</p>}
                </div>
                <button className="bg-green-500 hover:bg-green-200 text-white w-full rounded-md p-3" type='submit'>Submit</button>
            </form>
        </>
    )
}

export default ServiceForm
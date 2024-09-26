import React, { useState } from 'react'

const CurrentAddress = () => {
    const [address,setAddress]=useState({
        address:'',
        landmark:'',
        residence_mobile_number:'',
        state:'',
    })
    return (
        <>
            <h3 className='text-2xl text-center font-semi-bold my-5'>Current Address</h3>
            <div className="form-group border rounded-md p-3">
            <div className="mb-4">
                <label htmlFor="month">Full Address:</label>
                <input
                    type="text"
                    name="address"
                    id="full_address"
                    className="border w-full rounded-md p-2 mt-2 capitalize"
                />

            </div>
            <div className="mb-4">
                <label htmlFor="Landmark">Landmark:</label>
                <input
                    type="text"
                    name="landmark"
                    id="Landmark:"
                    className="border w-full rounded-md p-2 mt-2 capitalize"
                />

            </div>
            <div className="mb-4">
                <label htmlFor="Mobile-No:">Residence Mobile No::</label>
                <input
                    type="text"
                    name="residence_mobile_number"
                    id="residence_mobile_number"
                    className="border w-full rounded-md p-2 mt-2 capitalize"
                />

            </div>

            <div className="mb-4">
                <label htmlFor="state">State</label>
                <input type="text" 
                    name="state"
                    id="state"
                    className="w-full border p-2 outline-none rounded-md mt-2 capitalize"
                    value='' />
            </div>
            </div>

        </>
    )
}

export default CurrentAddress
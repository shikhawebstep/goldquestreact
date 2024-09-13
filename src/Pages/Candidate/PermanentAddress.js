import React from 'react'

const PermanentAddress = () => {
    return (
        <>
        <h3 className='text-2xl text-center font-bold my-5'>Permanent Address</h3>

            <div className="form-group border p-3 rounded-md">
                <div className="mb-4">
                    <label htmlFor="month">Full Address:</label>
                    <input
                        type="text"
                        name="address"
                        id="full_address"
                        className="border w-full rounded-md p-2 mt-2 capitalize"
                    />

                </div>
                <div className="form-group">
                <h3 className='font-semibold text-xl mb-3'>Period of Stay</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-4">
                            <label htmlFor="month">From:</label>
                            <input
                                type="text"
                                name="sender_name"
                                id="sender_name"
                                className="border w-full rounded-md p-2 mt-2 capitalize"
                            />

                        </div>

                        <div className="mb-4">
                            <label htmlFor="Reciever">To</label>
                            <input type="text" name="reciever_name"
                                id="reciever_name"
                                className="w-full border p-2 outline-none rounded-md mt-2 capitalize"
                                value='' />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-4">
                            <label htmlFor="Landmark">Landmark:</label>
                            <input
                                type="text"
                                name="landmark:"
                                id="Landmark:"
                                className="border w-full rounded-md p-2 mt-2 capitalize"
                            />

                        </div>
                        <div className="mb-4">
                        <label htmlFor="Pin_Code">Pin Code</label>
                        <input type="text" name="pin_code"
                            id="pin_code"
                            className="w-full border p-2 outline-none rounded-md mt-2 capitalize"
                            value='' />
                    </div>
                   
                    </div>
                    
                    <div className="mb-4">
                    <label htmlFor="state">State</label>
                    <input type="text" name="state"
                        id="state"
                        className="w-full border p-2 outline-none rounded-md mt-2 capitalize"
                        value='' />
                </div>
                    </div>


            </div>

        </>
    )
}

export default PermanentAddress
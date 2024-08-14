import React from 'react'

const DropBoxPackage = () => {
    return (
        <>
            <form action="" className='pb-5'>
                <select name="" id="" className='border w-full rounded-md p-2 mt-2 outline-none'>
                    <option value="">-Package Options-</option>
                    <option value="">All</option>
                    <option value="">Regular BGV</option>
                    <option value="">Special BGV</option>
                </select>
            </form>
         <h2 className='bg-green-500 rounded-md p-4 text-white mb-4 hover:bg-green-200'>Service Names</h2>
            <ul>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />Latest employment-1</li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />Ex-employment-2</li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />Previous employment-3</li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />Previous employment-4</li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />Previous employment-5</li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />Permanent address</li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />Current address</li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />Post graduation :
            <select name="" id=""  className='border w-full rounded-md p-2 mt-2 outline-none'>
            <option value="">MD</option>
            <option value="">MTech</option>
            <option value="">MCom</option>
            <option value="">MBA</option>
            <option value="">MSE</option>
            <option value="">MA</option>
            </select>
            </li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' /> Graduation :
            <select name="" id="" className='border w-full rounded-md p-2 mt-2 outline-none '>
            <option value="">MBBS</option>
            <option value="">BTech</option>
            <option value="">BCom</option>
            <option value="">BBA</option>
            <option value="">BSE</option>
            <option value="">BA</option>
            </select>
            </li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />12th-std</li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />10TH-std</li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />Diploma / iti</li>
            <li className='border p-2 my-1 '><input type="checkbox" name="" id="" className='me-5' />Police verification</li>
            </ul>
        </>
    )
}

export default DropBoxPackage
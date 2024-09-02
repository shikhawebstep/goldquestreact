import React from 'react'
import { useEditBranch } from './BranchEditContext'

const BranchEditForm = () => {
    const { branchEditData, setBranchEditData, handleInputChange, handleEditBranch }=useEditBranch()
    return (
        <>
            <form onSubmit={handleEditBranch} className='mt-9 p-4'>
                <div className="mb-3">
                    <label htmlFor="name" className='d-block'>Branch Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={branchEditData.name}
                        onChange={handleInputChange}
                        className='outline-none p-3 border mt-3 w-full rounded-md'
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className='d-block'>Branch Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={branchEditData.email}
                        onChange={handleInputChange}
                        className='outline-none p-3 border mt-3 w-full rounded-md'
                    />
                </div>
                <button type="submit" className='bg-green-400 text-white p-3 rounded-md w-full hover:bg-green-200'>Edit Branch</button>
            </form>
        </>
    )
}

export default BranchEditForm
import React from 'react'
import CandidateList from './CandidateList';
import CandidateForm from './CandidateForm';
const CandidateDropBox = () => {
    return (
        <>
            <div className=" py-4 md:py-16">
                <h2 className='md:text-4xl text-2xl font-bold pb-8 md:pb-4 text-center'>Candidate DropBox</h2>
                <div className=" md:grid-cols-6 md:p-4 gap-5 md:m-7  m-3">
                    <div className="   -3 md:p-6 " >
                     <CandidateForm/>
                    </div>
                   
                </div>
                <CandidateList />
            </div>
        </>
    )
}

export default CandidateDropBox
import React from 'react'
import CandidateApplications from './CandidateApplications'
import PermanentAddress from './PermanentAddress'
import CurrentAddress from './CurrentAddress'
import LatestEmployeement from '../LatestEmployeement'

const CandidateMain = () => {
  return (
    <>
    <div className="bg-white w-6/12 m-auto p-7 rounded-md shadow-md">
  
    <CandidateApplications/>
    <PermanentAddress/>
    <CurrentAddress/>
    <LatestEmployeement/>
    </div>
    </>
  )
}

export default CandidateMain
import React from 'react'
import CaseStudy from './CaseStudy'
import Chart from './Chart'
import Chart2 from './Chart2'
import CaseRecieved from './CaseRecieved'
import Insufficiency from './Insufficiency'
import Completed from './Completed'
import Wip from './Wip'
import CompletedGreen from './CompletedGreen'
import CompletedRed from './CompletdRed'
import CompletedYellow from './CompletedYellow'
import CompletedPink from './CompletedPink'
import CompletedOrange from './CompleteOrange'
import ReportsInTat from './ReportsInTat'
import ReportOutOfTat from './ReportOutOfTat'
const Dashboard = () => {
    return (
        <>
            <div className="md:p-14 p-4">
                <CaseStudy />
                <div className="my-10">
                    <div className="md:flex items-stretch gap-6">
                        <div className="md:w-6/12 bg-white shadow-md rounded-md">
                            <Chart />
                        </div>
                        <div className="md:w-6/12 bg-white shadow-md rounded-md p-3">
                            <Chart2/>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><CaseRecieved/></div>
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><Insufficiency/></div>
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><Completed/></div>
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><Wip/></div>
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><CompletedGreen/></div>
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><CompletedRed/></div>
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><CompletedYellow/></div>
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><CompletedPink/></div>
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><CompletedOrange/></div>
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><ReportsInTat/></div>
                <div className='grid-flow-col bg-white shadow-md rounded-md p-4'><ReportOutOfTat/></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
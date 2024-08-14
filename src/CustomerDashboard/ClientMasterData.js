import React from 'react'

const ClientMasterData = () => {
    const MasterData = [
        {
            Particulars: "Company Name",
            Information: "Ahum Softtech Solutions Pvt Ltd",
        },
        {
            Particulars: "Company Email",
            Information: "info@rightpick.co.in",
        },
        {
            Particulars: "Company Mobile",
            Information: 9019938133,
        },
        {
            Particulars: "Company Address",
            Information: "Ganeshprasad Appartment,C Wing,Dhayri Phata, Sinhgad Road,Dhayri, Pune – 411041",
        },
        {
            Particulars: "Role",
            Information: "Director",
        },
        {
            Particulars: "GST",
            Information: "NA",
        },
        {
            Particulars: "Contact Person",
            Information: "Charudatt Gosavi",
        },
        {
            Particulars: "Status",
            Information: "Active",
        },
        {
            Particulars: "TAT",
            Information: "7 Days",
        },
    ];
    return (
        <>

                 <h2 className='text-center md:text-4xl text-2xl font-bold pb-8 pt-16 md:pb-4'>Client Master Data</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-md md:m-10 m-3">
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-green-500'>
                            <th className="py-3 px-4 border-b text-center border-r-2 text-white uppercase whitespace-nowrap">PARTICULARS</th>
                            <th className="py-3 px-4 border-b text-center text-white uppercase whitespace-nowrap">INFORMATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MasterData.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b border-r-2 whitespace-nowrap">{item.Particulars}</td>
                                <td className="py-2 px-4 border-b whitespace-nowrap">{item.Information}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ClientMasterData

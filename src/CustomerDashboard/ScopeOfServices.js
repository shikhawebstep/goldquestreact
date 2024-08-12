import React from 'react'

const ScopeOfServices = () => {
    const MasterData = [
        {
            sl: 1,
            SERVICES: "	PERMANENT ADDRESS",
            PRICING: 300,
            SERVICE_PACKAGE: "REGULAR BGV ",
            special: "SPECIAL BGV",
        },
        {
            sl: 2,
            SERVICES: "CURRENT ADDRESS",
            PRICING: 300 ,
            SERVICE_PACKAGE: "REGULAR BGV ",
            special: "SPECIAL BGV",
        },
        {
            sl: 3,
            SERVICES: "CREDIT/CIBIL CHECK",
            PRICING: 280,
            SERVICE_PACKAGE: " ",
            special: "",
        },
        {
            sl: 4,
            SERVICES: "COURT VERIFICATION",
            PRICING: "280",
            SERVICE_PACKAGE: " ",
            special: "",
        },
        {
            sl: 5,
            SERVICES: "GRADUATION",
            PRICING: "375",
            SERVICE_PACKAGE: "",
            special: "",
        },

    ];
    return (
        <>

            <h2 className='text-center md:text-4xl text-2xl font-bold pb-8 pt-7 md:pb-4'>Scope Of Services</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-md md:m-10 m-3">
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-green-500'>
                            <th className="py-3 px-4 border-b text-center border-r-2 text-white uppercase whitespace-nowrap">SL NO</th>
                            <th className="py-3 px-4 border-b text-center border-r-2 text-white uppercase whitespace-nowrap">SERVICES</th>
                            <th className="py-3 px-4 border-b text-center border-r-2 text-white uppercase whitespace-nowrap">PRICING</th>
                            <th className="py-3 px-4 border-b text-center text-white uppercase whitespace-nowrap">SERVICE PACAKGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MasterData.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b text-center border-r-2 whitespace-nowrap">{item.sl}</td>
                                <td className="py-2 px-4 border-b border-r-2  whitespace-nowrap">{item.SERVICES}</td>
                                <td className="py-2 px-4 border-b border-r-2 text-center whitespace-nowrap">{item.PRICING} RS</td>
                                <td className="py-2 px-4 border-b whitespace-nowrap text-center">{item.SERVICE_PACKAGE}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ScopeOfServices

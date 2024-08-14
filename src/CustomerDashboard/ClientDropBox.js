import React from 'react'
import DropBoxPackage from './DropBoxPackage';
import DropBoxList from './DropBoxList';
import ClientForm from './ClientForm';
const ClientDropBox = () => {
    return (
        <>
            <div className=" py-4 md:py-16">
                <h2 className='md:text-4xl text-2xl font-bold pb-8 md:pb-4 text-center'>Client DropBox</h2>
                <div className="grid grid-cols-1 md:grid-cols-6 md:p-4 gap-5 md:m-7  m-3">
                    <div className=" md:col-span-3 bg-white shadow-md rounded-md p-3 md:p-6 " >
                        <ClientForm />
                    </div>
                    <div className="md:col-span-3 bg-white shadow-md rounded-md  p-3 md:p-6">
                        <DropBoxPackage />
                    </div>
                </div>
                <DropBoxList />
            </div>

        </>
    )
}

export default ClientDropBox
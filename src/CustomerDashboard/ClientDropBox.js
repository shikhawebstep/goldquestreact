import React from 'react'
import DropBoxList from './DropBoxList';
import ClientForm from './ClientForm';
const ClientDropBox = () => {
    return (
        <>
            <div className=" py-4 md:py-16">
                <h2 className='md:text-4xl text-2xl font-bold pb-8 md:pb-4 text-center'>Client DropBox</h2>
                <div className= "m-5">
                    <div>
                        <ClientForm />
                    </div>
                   
                </div>
                <DropBoxList />
            </div>

        </>
    )
}

export default ClientDropBox
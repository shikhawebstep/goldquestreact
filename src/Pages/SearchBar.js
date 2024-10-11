import React from 'react'

const SearchBar = () => {
    return (
        <>
            <div className="md:flex justify-between items-center md:my-4 border-b-2 pb-4">
                <div className="col">
                    <form action="">
                        <div className="flex gap-5 justify-between">
                            <select name="" id="" className='outline-none pe-14 ps-2 text-left rounded-md w-10/12'>
                                <option value="100">Show 100 Rows</option>
                                <option value="200">200 Rows</option>
                                <option value="300">300 Rows</option>
                                <option value="400">400 Rows</option>
                                <option value="500">500 Rows</option>
                            </select>
                            <button className="bg-green-600 text-white py-3 px-8 rounded-md capitalize" type='button'>exel</button>
                        </div>
                    </form>
                </div>
                <div className="col md:flex justify-end ">
                    <form action="">
                        <div className="flex md:items-stretch items-center  gap-3">
                            <input type="search" name="" id="" className='outline-none border-2 p-2 rounded-md w-full my-4 md:my-0' placeholder='search anything' />
                            <button className='bg-green-500 p-3 rounded-md text-whitevhover:bg-green-200 text-white'>Serach</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default SearchBar
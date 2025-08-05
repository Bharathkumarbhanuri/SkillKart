import React from 'react'
import { FaSearch } from 'react-icons/fa';

function Search() {
    return (
        <div className='flex px-6 w-full'>
            <input
                type="search"
                name="search"
                placeholder='search'
                className='w-96 border rounded-bl-md rounded-tl-md border-gray-500 text-sm px-4'
            />
            <button>
                <FaSearch className='text-3xl bg-blue-200 rounded-br-md rounded-tr-md p-1'></FaSearch>
            </button>
        </div>
    )
}

export default Search

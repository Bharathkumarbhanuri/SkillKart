import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

function Search({onSearch}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(searchTerm.trim());
    };

    return (
        <form onSubmit={handleSubmit} className='flex px-6 w-full'>
            <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                name="search"
                placeholder='search'
                className='w-96 border rounded-bl-md rounded-tl-md border-gray-500 text-sm px-4'
            />
            <button type='submit'>
                <FaSearch className='text-3xl bg-blue-200 rounded-br-md rounded-tr-md p-1'></FaSearch>
            </button>
        </form>
    );
}

export default Search

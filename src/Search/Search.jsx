import React, { useState } from 'react'

export default function Search({ search, setSearch }) {

    const [searchInp, setSearchInp] = useState("")

    const handleChange = (e) => {
        setSearchInp(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(searchInp)
    }

    return (
        <div className="search"> 
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" name='searchInput' onChange={handleChange} value={searchInp} />
                </label>
                <button type="submit">🔍</button>
            </form>
        </div>
    )
}

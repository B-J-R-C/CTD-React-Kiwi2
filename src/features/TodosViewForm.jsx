import React, { useState, useEffect } from 'react';

function TodosViewForm({ sortField, setSortField, sortDirection, setSortDirection, queryString, setQueryString }) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label htmlFor="search">Search todos:</label>
        <input 
          id="search"
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </div>
      <div>
        <label htmlFor="sortBy">Sort by:</label>
        <select id="sortBy" value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="createdTime">Time added</option>
          <option value="title">Title</option>
        </select>
        <label htmlFor="direction">Direction:</label>
        <select id="direction" value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
}

export default TodosViewForm;
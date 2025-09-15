import React from 'react';

function TodosViewForm({ sortField, setSortField, sortDirection, setSortDirection, queryString, setQueryString }) {
  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label htmlFor="search">Search todos:</label>
        <input 
          id="search"
          type="text"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setQueryString('')}>
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
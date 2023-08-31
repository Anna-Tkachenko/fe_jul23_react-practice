import React from 'react';

const Search = ({ searchValue, setSearchValue }) => {
  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const resetSearch = () => {
    setSearchValue('');
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left has-icons-right">
        <input
          data-cy="SearchField"
          type="text"
          className="input"
          placeholder="Search"
          value={searchValue}
          onChange={searchChangeHandler}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>

        <span className="icon is-right">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="ClearButton"
            type="button"
            className="delete"
            onClick={resetSearch}
          />
        </span>
      </p>
    </div>
  );
};

export default Search;

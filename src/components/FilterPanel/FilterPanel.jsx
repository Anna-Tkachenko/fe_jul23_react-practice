import React from 'react';
import CategoriesFilter from '../CategoriesFilter/CategoriesFilter';
import UserFilter from '../UserFilter/UserFilter';
import Search from '../Search/Search';

const FilterPanel = ({
  activeUser,
  setActiveUser,
  activeCategories,
  setActiveCategories,
  searchValue,
  setSearchValue,
}) => {
  const resetFilters = () => {
    setActiveUser(null);
    setSearchValue('');
    setActiveCategories([]);
  };

  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <UserFilter activeUser={activeUser} setActiveUser={setActiveUser} />

        <Search searchValue={searchValue} setSearchValue={setSearchValue} />

        <CategoriesFilter
          activeCategories={activeCategories}
          setActiveCategories={setActiveCategories}
        />

        <div className="panel-block">
          <a
            onClick={resetFilters}
            data-cy="ResetAllButton"
            href="#/"
            className="button is-link is-outlined is-fullwidth"
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};

export default FilterPanel;

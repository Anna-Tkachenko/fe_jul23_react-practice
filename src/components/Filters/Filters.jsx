import cn from 'classnames';

export const Filters = ({
  users,
  selectedUserId,
  changeSelectedUserId,
  searchQuery,
  changeSearchQuery,
  categories,
  selectedCategories,
  changeCategory,
  clearCategories,
}) => {
  const resetAllFilters = () => {
    changeSelectedUserId(0);
    changeSearchQuery('');
    clearCategories();
  };

  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs has-text-weight-bold">
          <a
            data-cy="FilterAllUsers"
            href="#/"
            className={cn({
              'is-active': !selectedUserId,
            })}
            onClick={() => changeSelectedUserId(0)}
          >
            All
          </a>

          {users.map(user => (
            <a
              key={user.id}
              data-cy="FilterUser"
              href="#/"
              className={cn({
                'is-active': user.id === selectedUserId,
              })}
              onClick={() => changeSelectedUserId(user.id)}
            >
              {user.name}
            </a>
          ))

      }
        </p>

        <div className="panel-block">
          <p className="control has-icons-left has-icons-right">
            <input
              data-cy="SearchField"
              type="text"
              className="input"
              placeholder="Search"
              value={searchQuery}
              onChange={event => changeSearchQuery(event.target.value)}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>

            {Boolean(searchQuery) && (
            <span className="icon is-right">
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => changeSearchQuery('')}
              />
            </span>
            )}
          </p>
        </div>

        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            onClick={clearCategories}
            className={cn(
              'button',
              'is-success',
              'mr-6',
              {
                'is-outlined': Boolean(selectedCategories.length),
              },
            )}
          >
            All
          </a>

          {categories.map(category => (
            <a
              key={category.id}
              data-cy="Category"
              className={cn(
                'button',
                'mr-2',
                'my-1',
                {
                  'is-info': selectedCategories.includes(category.id),
                },
              )}
              href="#/"
              onClick={() => changeCategory(category.id)}
            >
              {category.title}
            </a>
          ))}
        </div>

        <div className="panel-block">
          <a
            data-cy="ResetAllButton"
            href="#/"
            className="button is-link is-outlined is-fullwidth"
            onClick={resetAllFilters}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};

import cn from 'classnames';

export const Panel = ({
  users,
  categories,
  activeOwner,
  activeCategory,
  setFilterByOwnerField,
  setFilterByCategoryField,
  setFilterByProductField,
}) => {
  const onResetClick = () => {
    setFilterByOwnerField('');
    setFilterByCategoryField('');
    setFilterByProductField('');
  };

  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs has-text-weight-bold">
          <a
            data-cy="FilterAllUsers"
            href="#/"
            onClick={() => setFilterByOwnerField('')}
            className={cn({
              'is-active': !activeOwner,
            })}
          >
            All
          </a>

          {/* className="is-active" */}
          {users.map(user => (
            <a
              key={user.id}
              data-cy="FilterUser"
              href="#/"
              onClick={() => setFilterByOwnerField(user.id)}
              className={cn({
                'is-active': user.id === activeOwner,
              })}
            >
              {user.name}
            </a>
          ))}

        </p>

        <div className="panel-block">
          <p className="control has-icons-left has-icons-right">
            <input
              data-cy="SearchField"
              type="text"
              className="input"
              placeholder="Search"
              onChange={
                event => setFilterByProductField(event
                  .target.value.trim().toLowerCase())
              }
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
              />
            </span>
          </p>
        </div>

        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className={cn(
              'button mr-6 is-outlined',
              {
                'is-success': !activeCategory,
              },
            )}
            onClick={() => setFilterByCategoryField('')}
          >
            All
          </a>
          {/* className="button mr-2 my-1 is-info" */}
          {categories.map(category => (
            <a
              key={category.id}
              data-cy="Category"
              className={cn(
                'button mr-2 my-1',
                {
                  'is-info': category.id === activeCategory,
                },
              )}
              href="#/"
              onClick={() => setFilterByCategoryField(category.id)}
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
            onClick={() => onResetClick()}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};

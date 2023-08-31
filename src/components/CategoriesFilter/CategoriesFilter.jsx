import React from 'react';
import cn from 'classnames';
import categoriesFromServer from '../../api/categories';

const CategoriesFilter = ({ activeCategories, setActiveCategories }) => {
  const categoryClickHandler = (id) => {
    if (activeCategories.includes(id)) {
      setActiveCategories(activeCategories.filter(item => item !== id));
    } else {
      setActiveCategories([...activeCategories, id]);
    }
  };

  const resetActiveCategories = () => {
    setActiveCategories([]);
  };

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        onClick={resetActiveCategories}
        href="#/"
        data-cy="AllCategories"
        className={cn('button mr-6',
          activeCategories.length === 0 ? 'is-success' : 'is-outlined')}
      >
        All
      </a>

      {categoriesFromServer.map(item => (
        <a
          onClick={() => categoryClickHandler(item.id)}
          key={item.id}
          data-cy="Category"
          className={cn('button mr-2 my-1', {
            'is-info': activeCategories.includes(item.id),
          })}
          href="#/"
        >
          {item.title}
        </a>
      ))}
    </div>
  );
};

export default CategoriesFilter;

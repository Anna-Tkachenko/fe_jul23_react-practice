import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(categoryItem => (
    categoryItem.id === product.categoryId
  ));
  const user = usersFromServer.find(person => person.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

const filterData = (userId, searchValue, selectedCategories) => {
  let filteredProducts = [...products];

  if (userId) {
    filteredProducts = products.filter(({ user }) => (
      user.id === userId
    ));
  }

  if (searchValue) {
    filteredProducts = products.filter(({ name, user }) => (
      name
        .toLowerCase()
        .trim()
        .includes(searchValue.toLowerCase().trim())
      && user.id === userId
    ));
  }

  if (selectedCategories.length !== 0) {
    filteredProducts = products.filter(({ category, user, name }) => (
      selectedCategories.includes(category.title)
      && user.id === userId
      && name
        .toLowerCase()
        .trim()
        .includes(searchValue.toLowerCase().trim())
    ));
  }

  return filteredProducts;
};

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const productsToRender = filterData(
    selectedUserId,
    searchValue,
    selectedCategories,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={cn({
                  'is-active': selectedUserId === '',
                })}
                onClick={() => setSelectedUserId('')}
              >
                All
              </a>

              {usersFromServer.map(({ name, id }) => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={id}
                  className={cn({
                    'is-active': id === selectedUserId,
                  })}
                  onClick={() => {
                    setSelectedUserId(id);
                  }}
                >
                  {name}
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
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchValue
                    ? (
                      <button
                        data-cy="ClearButton"
                        type="button"
                        className="delete"
                        onClick={() => setSearchValue('')}
                      />
                    )
                    : null
                  }
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button is-success mr-6', {
                  'is-outlined': selectedCategories.length,
                })}
                onClick={() => setSelectedCategories([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn('button mr-2 my-1', {
                    'is-info': selectedCategories.includes(category.title),
                  })}
                  href="#/"
                  key={category.id}
                  onClick={() => {
                    if (!selectedCategories.includes(category.title)) {
                      setSelectedCategories(prevCategories => (
                        [...prevCategories, category.title]
                      ));
                    } else {
                      const selectedCategoriesCopy = [...selectedCategories];

                      selectedCategoriesCopy.splice(
                        selectedCategoriesCopy.indexOf(category.title), 1,
                      );

                      setSelectedCategories(selectedCategoriesCopy);
                    }
                  }}
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
                onClick={() => {
                  setSearchValue('');
                  setSelectedUserId('');
                  setSelectedCategories([]);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {productsToRender.length
            ? (
              <table
                data-cy="ProductTable"
                className="table is-striped is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        ID

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Product

                        <a href="#/">
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className="fas fa-sort-down"
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Category

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort-up" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        User

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {productsToRender.map(({ id, name, category, user }) => (
                    <tr data-cy="Product" key={id}>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {id}
                      </td>

                      <td data-cy="ProductName">
                        {name}
                      </td>
                      <td data-cy="ProductCategory">
                        {`${category.icon} - ${category.title}`}
                      </td>

                      <td
                        data-cy="ProductUser"
                        className={cn({
                          'has-text-link': user.sex === 'm',
                          'has-text-danger': user.sex === 'f',
                        })}
                      >
                        {user.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
            : (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
          }

        </div>
      </div>
    </div>
  );
};

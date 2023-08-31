import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// function getUserById(userId) {
//   return usersFromServer.find(user => user.id === userId)
//       || null;
// }

function getCategoryById(categoryId) {
  return categoriesFromServer.find(category => category.id === categoryId)
      || null;
}

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

const products = productsFromServer.map((product) => {
  const category = getCategoryById(product.categoryId);
  const user = getUserById(category.ownerId);

  return ({
    ...product,
    category,
    user,
  });
});

function getFilteredProducts(prod, { selectedUser, query }) {
  let prepareProducts = [...prod];

  if (!query) {
    prepareProducts = [...prod];
  }

  if (selectedUser === 'all') {
    prepareProducts = [...prod];
  }

  if (selectedUser === 'Roma') {
    prepareProducts = prepareProducts
      .filter(product => product.user.name === 'Roma');
  }

  if (selectedUser === 'Anna') {
    prepareProducts = prepareProducts
      .filter(product => product.user.name === 'Anna');
  }

  if (selectedUser === 'Max') {
    prepareProducts = prepareProducts
      .filter(product => product.user.name === 'Max');
  }

  if (selectedUser === 'John') {
    prepareProducts = prepareProducts
      .filter(product => product.user.name === 'John');
  }

  if (query) {
    prepareProducts = prepareProducts
      .filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));
  }

  return prepareProducts;
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('all');
  const [query, setQuery] = useState('');
  const visibleProducts
    = getFilteredProducts(products, { selectedUser, query });

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
                className={cn({ 'is-active': selectedUser === 'all' })}
                onClick={() => {
                  setSelectedUser('all');
                }}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={cn({ 'is-active': selectedUser === 'Roma' })}
                onClick={() => {
                  setSelectedUser('Roma');
                }}
              >
                Roma
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={cn({ 'is-active': selectedUser === 'Anna' })}
                onClick={() => {
                  setSelectedUser('Anna');
                }}
              >
                Anna
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={cn({ 'is-active': selectedUser === 'Max' })}
                onClick={() => {
                  setSelectedUser('Max');
                }}
              >
                Max
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={cn({ 'is-active': selectedUser === 'John' })}
                onClick={() => {
                  setSelectedUser('John');
                }}
              >
                John
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
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
                    onClick={() => setQuery('')}
                    style={{ display: query ? 'block' : 'none' }}
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">

          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

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
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
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
              {visibleProducts.map(product => (
                <tr data-cy="Product" key={product.id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">
                    {product.name}
                  </td>

                  <td data-cy="ProductCategory">
                    {`${product.category.icon} - ${product.category.title}`}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={cn({
                      'has-text-link': product.user.sex === 'm',
                      'has-text-danger': product.user.sex === 'f',
                    })}
                  >
                    {product.user.name}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

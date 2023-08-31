/* eslint-disable */
import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getCategoryIcon(categoryId) {
  const category = categoriesFromServer.find(cat => cat.id === categoryId);

  return category ? category.icon : '';
}

function getUserColor(gender) {
  return gender === 'male' ? 'has-text-link' : 'has-text-danger';
}

const preparedProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(cat => cat.id === product.categoryId);
  const user = usersFromServer.find(user => user.id === product.ownerId);

  return {
    ...product,
    categoryName: category ? category.name : 'Unknown Category',
    categoryIcon: getCategoryIcon(product.categoryId),
    userName: user ? user.name : 'Unknown User',
    userColor: getUserColor(user ? user.gender : ''),
  };
});

export const App = () => (
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
            >
              All
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
            >
              User 1
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
              className="is-active"
            >
              User 2
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
            >
              User 3
            </a>
          </p>

          <div className="panel-block">
            <p className="control has-icons-left has-icons-right">
              <input
                data-cy="SearchField"
                type="text"
                className="input"
                placeholder="Search"
                value="qwe"
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
              className="button is-success mr-6 is-outlined"
            >
              All
            </a>

            <a
              data-cy="Category"
              className="button mr-2 my-1 is-info"
              href="#/"
            >
              {category}
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
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {preparedProducts.map(product => (
              <tr key={product.id} data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  {product.id}
                </td>
                <td data-cy="ProductName">{product.name}</td>
                <td data-cy="ProductCategory">
                  {product.categoryIcon && (
                  <span role="img" aria-label="Category Icon">
                    {product.categoryIcon}
                  </span>
                  )}
                  {product.categoryName}
                </td>
                <td
                  data-cy="ProductUser"
                  className={product.userColor}
                >
                  {product.userName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

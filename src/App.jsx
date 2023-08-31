import React, { useState } from 'react';
import cn from 'classnames';

import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(({ id }) => (
    product.categoryId === id)) || null;
  const user = usersFromServer.find(({ id }) => (
    id === category.ownerId)) || null;

  return {
    ...product,
    category,
    user,
  };
});

const DEFAULT_USER = {
  all: true,
};

function getProductsByUser(productsToFilter, selectedUser) {
  if (selectedUser.all) {
    return productsToFilter;
  }

  return productsToFilter.filter(product => (
    product.user.id === selectedUser.id
  ));
}

function getProductsBySearch(productsToFilter, searchValue) {
  if (searchValue.length === 0) {
    return productsToFilter;
  }

  return productsToFilter.filter(({ name }) => (
    name.toLowerCase().includes(searchValue.toLowerCase())
  ));
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(DEFAULT_USER);
  const [searchProduct, setSearchProduct] = useState('');
  let productsFiltered = getProductsByUser(products, selectedUser);

  productsFiltered = getProductsBySearch(productsFiltered, searchProduct);

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
                className={cn({
                  'is-active': !selectedUser.id,
                })}
                href="#/"
                onClick={() => setSelectedUser(DEFAULT_USER)}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  className={cn({
                    'is-active': selectedUser.id === user.id,
                  })}
                  href="#/"
                  onClick={() => {
                    if (selectedUser.id !== user.id) {
                      setSelectedUser(user);
                    }
                  }}
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
                  onChange={event => (
                    setSearchProduct(event.currentTarget.value)
                  )}
                  value={searchProduct}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchProduct.length > 0 && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setSearchProduct('')}
                    />
                  </span>
                )}
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
                onClick={() => {
                  setSearchProduct('');
                  setSelectedUser(DEFAULT_USER);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {productsFiltered.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            {productsFiltered.length > 0 && (
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
            )}
            <tbody>
              {productsFiltered.map((product) => {
                const {
                  id,
                  name,
                  category,
                  user,
                } = product;

                return (
                  <tr data-cy="Product" key={product.id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {id}
                    </td>

                    <td data-cy="ProductName">{name}</td>
                    <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>

                    <td
                      data-cy="ProductUser"
                      className={user.sex === 'm'
                        ? 'has-text-link'
                        : 'has-text-danger'
                      }
                    >
                      {user.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

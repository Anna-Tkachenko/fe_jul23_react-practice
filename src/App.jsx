import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(({ id }) => id === product.categoryId);

  const user = usersFromServer.find(({ id }) => id === category.ownerId);

  return {
    id: product.id,
    productName: product.name,
    title: category.title,
    icon: category.icon,
    sex: user.sex,
    userName: user.name,
  };
});

const filterProduct = (userFilter, inputState) => {
  if (!userFilter && !inputState) {
    return products;
  }

  let prods = [...products];

  if (userFilter) {
    prods = prods.filter(({ userName }) => userName === userFilter);
  }

  const newInputValue = inputState.trim().toLowerCase();

  if (inputState) {
    prods = prods.filter(({ productName }) => productName
      .trim().toLowerCase().includes(newInputValue));
  }

  return prods;
};

export const App = () => {
  const [userFilter, setUserFilter] = useState('');
  const [inputState, setInputState] = useState('');

  const prods = filterProduct(userFilter, inputState);

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
                onClick={() => {
                  setUserFilter('');
                }}
                className={cn({ 'is-active': !userFilter })}
              >
                All
              </a>

              {usersFromServer.map(({ name }) => (
                <a
                  className={cn({ 'is-active': name === userFilter })}
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => {
                    setUserFilter(name);
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
                  value={inputState}
                  onChange={event => setInputState(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {inputState.length > 0 && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setInputState('')}
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
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {prods.length ? (

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
                {prods.map((el) => {
                  const { id, productName, title, icon, sex, userName } = el;

                  return (
                    <tr data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {id}
                      </td>

                      <td data-cy="ProductName">{productName}</td>
                      <td data-cy="ProductCategory">{`${icon} - ${title}`}</td>

                      <td
                        data-cy="ProductUser"
                        className={cn({
                          'has-text-link': sex === 'm',
                          'has-text-danger': sex === 'f',
                        })}
                      >
                        {userName}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
            : (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

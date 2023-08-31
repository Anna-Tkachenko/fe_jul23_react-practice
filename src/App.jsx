import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const USER1_ID = usersFromServer[0].id;
const USER2_ID = usersFromServer[1].id;
const USER3_ID = usersFromServer[2].id;

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(({ id }) => id === product.categoryId);
  const user = usersFromServer
    .find(({ id }) => id === category.ownerId);

  // eslint-disable-next-line no-param-reassign
  product.categoryGood = category;
  // eslint-disable-next-line no-param-reassign
  product.user = user;

  return product;
});

export const App = () => {
  const [visiblesTable, setVisiblesTable] = useState([...products]);
  const [isSortActive, setIsSortActive] = useState('All');
  const [searchField, setSearchField] = useState('');




  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                onClick={() => {
                  setIsSortActive('All');
                  setVisiblesTable([...products]);
                }}
                data-cy="FilterAllUsers"
                href="#/"
                className={
                  cn({ 'is-active': isSortActive === 'All' })
              }
              >
                All
              </a>

              <a
                onClick={() => {
                  setIsSortActive('User1');
                  setVisiblesTable([...products]
                    .filter(product => USER1_ID === product.user.id));
                }}
                data-cy="FilterUser"
                href="#/"
                className={
                  cn({ 'is-active': isSortActive === 'User1' })
                }
              >
                User 1
              </a>

              <a
                onClick={() => {
                  setIsSortActive('User2');
                  setVisiblesTable([...products]
                    .filter(product => USER2_ID === product.user.id));
                }}
                data-cy="FilterUser"
                href="#/"
                className={
                  cn({ 'is-active': isSortActive === 'User2' })
                }
              >
                User 2
              </a>

              <a
                onClick={() => {
                  setIsSortActive('User3');
                  setVisiblesTable([...products]
                    .filter(product => USER3_ID === product.user.id));
                }}
                data-cy="FilterUser"
                href="#/"
                className={
                  cn({ 'is-active': isSortActive === 'User3' })
                }
              >
                User 3
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={(event) => {
                    setSearchField(event.target.value);
                    if (searchField) {
                      setVisiblesTable(visiblesTable
                        .filter(p => p.name
                          .toLowerCase()
                          .includes(searchField.trim().toLowerCase())));
                    } }}
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchField}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchField
                  && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      onClick={() => setSearchField('')}
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                    />
                  </span>
                  )
                }
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
              {visiblesTable.map(product => (
                <tr
                  key={product.id}
                  data-cy="Product"
                >
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">{`${product.categoryGood.title} -${product.categoryGood.icon} `}</td>

                  <td
                    data-cy="ProductUser"
                    className={
                      cn({
                        'is-has-text-link': product.user.sex === 'm',
                        'has-text-danger': product.user.sex === 'f',
                      })
                    }
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

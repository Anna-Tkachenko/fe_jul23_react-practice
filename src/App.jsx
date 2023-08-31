import React, { useState } from 'react';
import { v4 as getRandomKey } from 'uuid';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { ProductList } from './components/ProductList/ProductList';
import { UserList } from './components/UserList/UserList';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(({ id }) => product.categoryId === id);
  const user = usersFromServer
    .find(({ id }) => category.ownerId === id);
  const key = getRandomKey();

  return {
    ...product,
    category,
    user,
    key,
  };
});

const getPreparedProducts = (
  productsToPrepared,
  {
    selecteddUser: isSelectedUser,
    searchInput: isSearchInput,
  },
) => {
  let preparedProducts = [...productsToPrepared];

  if (isSelectedUser) {
    preparedProducts = preparedProducts.filter((product) => {
      const { name: username } = product.user;

      return isSelectedUser === username;
    });
  }

  if (isSearchInput) {
    const trimedSearchValue = isSearchInput.toLowerCase().trim();

    preparedProducts = preparedProducts.filter(product => (
      product.name.toLowerCase().includes(trimedSearchValue)
    ));
  }

  return preparedProducts;
};

export const App = () => {
  const [selecteddUser, setSelectedUser] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const preparedProducts = getPreparedProducts(
    products,
    {
      selecteddUser,
      searchInput,
    },
  );

  const onUserSelectedHandler = (user) => {
    setSelectedUser(user?.name ?? '');
  };

  const onInputHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const resetAllFilters = () => {
    setSelectedUser('');
    setSearchInput('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserList
              users={usersFromServer}
              selecteddUser={selecteddUser}
              onUserSelectedHandler={onUserSelectedHandler}
            />

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={onInputHandler}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {searchInput && (
                    <button
                      onClick={() => setSearchInput('')}
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                    />
                  )}
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
                onClick={() => resetAllFilters()}
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {!preparedProducts.length ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
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

              <ProductList products={preparedProducts} />

            </table>
          )}
        </div>
      </div>
    </div>
  );
};

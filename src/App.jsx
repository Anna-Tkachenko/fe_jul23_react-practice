import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const SORT_ORDER_ASC = 'asc';
const SORT_ORDER_DESC = 'desc';

const sortingKeys = [
  { name: 'ID', sortingKey: 'id' },
  { name: 'Product', sortingKey: 'product' },
  { name: 'Category', sortingKey: 'category' },
  { name: 'User', sortingKey: 'user' },
];

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    categoryFromServer => product.categoryId === categoryFromServer.id,
  );
  const user = usersFromServer.find(
    userFromServer => category.ownerId === userFromServer.id,
  );

  return {
    ...product,
    category: category.title,
    icon: category.icon,
    userName: user.name,
    userSex: user.sex,
  };
});

function getFilteredProducts(
  productsToFilter, user, filterByProduct, categories,
) {
  let filteredProducts = [...productsToFilter];

  if (user) {
    filteredProducts = filteredProducts.filter(
      product => product.userName === user,
    );
  }

  if (filterByProduct) {
    filteredProducts = filteredProducts.filter(
      product => product.name
        .toLowerCase()
        .includes(filterByProduct.toLowerCase()),
    );
  }

  if (categories.length) {
    filteredProducts = filteredProducts.filter(
      product => categories.includes(product.category),
    );
  }

  return filteredProducts;
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [filterByProduct, setFilterByProduct] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const filteredProducts = getFilteredProducts(
    products, selectedUser, filterByProduct, selectedCategories,
  );

  const resetAllFilters = () => {
    setSelectedUser('');
    setFilterByProduct('');
    setSelectedCategories([]);
  };

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
                className={classNames({
                  'is-active': selectedUser === '',
                })}
                onClick={() => setSelectedUser('')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames({
                    'is-active': user.name === selectedUser,
                  })}
                  onClick={() => setSelectedUser(user.name)}
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
                  value={filterByProduct}
                  onChange={event => setFilterByProduct(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {filterByProduct.length > 0 && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setFilterByProduct('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={classNames('button', 'is-success', 'mr-6', {
                  'is-outlined': selectedCategories.length > 0,
                })}
                onClick={() => setSelectedCategories([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className={classNames('button', 'mr-2', 'my-1', {
                    'is-info': selectedCategories.includes(category.title),
                  })}
                  href="#/"
                  onClick={() => {
                    if (selectedCategories.includes(category.title)) {
                      setSelectedCategories(
                        selectedCategories.filter(
                          selectCategory => selectCategory !== category.title,
                        ),
                      );
                    } else {
                      setSelectedCategories([
                        ...selectedCategories,
                        category.title,
                      ]);
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
                onClick={() => resetAllFilters()}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            {filteredProducts.length > 0 && (
              <thead>
                <tr>
                  {sortingKeys.map((sortingKey) => {
                    const isKeySelected = sortKey === sortingKey.sortingKey;

                    return (
                      <th key={sortingKey.sortingKey}>
                        <span className="is-flex is-flex-wrap-nowrap">
                          {sortingKey.name}

                          <a
                            href="#/"
                            onClick={() => {
                              if (sortOrder === SORT_ORDER_DESC
                                && isKeySelected) {
                                setSortOrder('');
                                setSortKey('');
                              } else if (sortOrder === SORT_ORDER_ASC
                                && isKeySelected) {
                                setSortOrder(SORT_ORDER_DESC);
                              } else {
                                setSortKey(sortingKey.sortingKey);
                                setSortOrder(SORT_ORDER_ASC);
                              }
                            }}
                          >
                            <span className="icon">
                              <i
                                data-cy="SortIcon"
                                className={classNames('fas', 'fa-sort', {
                                  // 'fa-sort': sortKey === '',
                                  'fa-sort-up': sortOrder === SORT_ORDER_ASC
                                    && isKeySelected,
                                  'fa-sort-down': sortOrder === SORT_ORDER_DESC
                                    && isKeySelected,
                                })}
                              />
                            </span>
                          </a>
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
            )}

            <tbody>
              {filteredProducts.map(product => (
                <tr data-cy="Product" key={product.id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>

                  <td data-cy="ProductCategory">
                    {`${product.icon} - ${product.category}`}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={classNames({
                      'has-text-link': product.userSex === 'm',
                      'has-text-danger': product.userSex === 'f',
                    })}
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
};

import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const preparedProducts = productsFromServer.map(product => ({
  ...product,
  category: categoriesFromServer
    .find(categ => categ.id === product.categoryId), // find by product.categoryId
  user: usersFromServer.find(user1 => user1.id === categoriesFromServer
    .find(categ => categ.id === product.categoryId).ownerId), // find by category.ownerId
}));

function filterProducts(products, userSelected) {
  let filteredProducts = products;

  if (userSelected !== '') {
    filteredProducts = filteredProducts
      .filter();
  }

  return filteredProducts;
}

export const App = () => {
  const [userSelected, setUserSelected] = useState('');
  const allUsersFilter = () => setUserSelected('');
  // const UserFilter = () => setUserSelected(usersFromServer[0].id);
  // const annaUserFilter = () => setUserSelected(usersFromServer[1].id);
  // const maxUserFilter = () => setUserSelected(usersFromServer[2].id);
  // const johnUserFilter = () => setUserSelected(usersFromServer[3].id);

  const visibleProducts = filterProducts(preparedProducts, userSelected);

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
                onClick={allUsersFilter}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.name}
                  // onClick={}
                  data-cy="FilterUser"
                  href="#/"
                  className="is-active"
                // className={classNames({

                // })}
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
                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {
                      `${product.category.icon} - ${product.category.title}`
                    }
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={
                      classNames('has-text-link',
                        {
                          'has-text-link': product.user.sex === 'm',
                          'has-text-danger': product.user.sex === 'f',
                        })
                    }
                  >
                    {`${product.user.name}`}
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

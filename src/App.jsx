import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(categoryFromServer => categoryFromServer.id === product.categoryId); // find by product.categoryId
  const user = usersFromServer
    .find(userFromServer => userFromServer.id === category.ownerId); // find by category.ownerId

  return {
    ...product,
    category,
    user, // should i use {...user} instead?
  };
});

const MALE_SIGN = 'm';
const FEMALE_SIGN = 'f';

// component Emoji can be used as an Emoji-wrapper
/* const Emoji = ({ emojicon }) => (
  <span className="Emoji" role="img">{emojicon}</span>
); */

function productsToRender(productList, selectedUserId) {
  return productList.filter((product) => {
    const isOwnerSelected = product.user.id === selectedUserId;

    return isOwnerSelected;
  });
}

const CategoryTitle = ({ category }) => (
  <>
    <span className="Emoji" role="img">{category.icon}</span>
    {` - ${category.title}`}
  </>
);

// can be named as UserFilter, or UserNav, or UserHeader, i am not sure
const UserMenu = ({ users, selectedUserId, onClickUserSelect }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      className={cn({
        'is-active': selectedUserId === 0,
      })}
      key={0}
      data-cy="FilterAllUsers"
      href="#/"
      onClick={() => {
        if (selectedUserId !== 0) {
          onClickUserSelect();
        }
      }}
    >
      All
    </a>

    {users.map(user => (
      <a
        className={cn({
          'is-active': selectedUserId === user.id,
        })}
        key={user.id}
        data-cy="FilterUser"
        href="#/"
        onClick={() => {
          if (user.id !== selectedUserId) {
            onClickUserSelect(user);
          }
        }}
      >
        {user.name}
      </a>
    ))}

  </p>
);

const ProductTable = ({ productList }) => (
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
      {products.map(product => (
        <tr data-cy="Product" key={product.id}>
          <td className="has-text-weight-bold" data-cy="ProductId">
            {product.id}
          </td>

          <td data-cy="ProductName">{product.name}</td>
          <td data-cy="ProductCategory">
            <CategoryTitle category={product.category} />
          </td>

          <td
            data-cy="ProductUser"
            className={cn({
              'has-text-link': product.user.sex === MALE_SIGN,
            },
            {
              'has-text-danger': product.user.sex === FEMALE_SIGN,
            })}
          >
            {product.user.name}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(usersFromServer[1].id);
  const onClickUserSelect = (user) => {
    if (user) {
      setSelectedUserId(user.id);
    } else {
      setSelectedUserId(0);
    }
  }; // change to ternar later
  // const onClickUserReset = () => setSelectedUserId(0); // should swap 0 with something

  const renderedProducts = productsToRender(products, selectedUserId);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserMenu
              users={usersFromServer}
              selectedUserId={selectedUserId}
              onClickUserSelect={onClickUserSelect}
            />

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

          <ProductTable productList={renderedProducts} />
        </div>
      </div>
    </div>
  );
};

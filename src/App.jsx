import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductTable } from './components/ProductTable/ProductTable';
import { Panel } from './components/Panel/Panel';
// import categories from './api/categories';

const products = productsFromServer.map((product) => {
  const category = findCategoryById(product.categoryId);

  return {
    ...product,
    category: findCategoryById(product.categoryId),
    user: findOwnerById(category.ownerId),
  };
});

function findOwnerById(ownerId) {
  return usersFromServer.find(user => user.id === ownerId);
}

function findCategoryById(categoryId) {
  return categoriesFromServer.find(category => category.id === categoryId);
}

function filterByOwnerId(ownerId, visibleProducts) {
  return visibleProducts
    .filter(product => product.category.ownerId === ownerId);
}

function filterByCategoryId(categoryId, visibleProducts) {
  return visibleProducts
    .filter(product => product.category.id === categoryId);
}

function filterByName(productName, visibleProducts) {
  return visibleProducts
    .filter(product => product.name.toLowerCase().includes(productName));
}

export const App = () => {
  const [filterByOwnerField, setFilterByOwnerField] = useState('');
  const [filterByCategoryField, setFilterByCategoryField] = useState('');
  const [filterByProductField, setFilterByProductField] = useState('');

  let visibleProducts = [...products];

  if (filterByOwnerField) {
    visibleProducts = filterByOwnerId(filterByOwnerField, visibleProducts);
  }

  if (filterByCategoryField) {
    visibleProducts
    = filterByCategoryId(filterByCategoryField, visibleProducts);
  }

  if (filterByProductField) {
    visibleProducts
    = filterByName(filterByProductField, visibleProducts);
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <Panel
          users={usersFromServer}
          categories={categoriesFromServer}
          activeOwner={filterByOwnerField}
          activeCategory={filterByCategoryField}
          setFilterByOwnerField={setFilterByOwnerField}
          setFilterByCategoryField={setFilterByCategoryField}
          setFilterByProductField={setFilterByProductField}
        />

        <ProductTable products={visibleProducts} />
      </div>
    </div>
  );
};

import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Filters } from './components/Filters';
import { ProductList } from './components/ProductList';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(({ id }) => product.categoryId === id);
  const user = usersFromServer
    .find(({ id }) => category.ownerId === id);

  return {
    ...product,
    category,
    user,
  };
});

function filterProducts(productsToFilter, queries) {
  const {
    userId,
    searchQuery,
    selectedCategories,
  } = queries;

  let filteredData = filterByUser(productsToFilter, userId);

  filteredData = filterBySearchQuery(filteredData, searchQuery);
  filteredData = filterByCategories(filteredData, selectedCategories);

  return filteredData;
}

function filterByUser(productsToFilter, userId) {
  if (!userId) {
    return productsToFilter;
  }

  return productsToFilter.filter(({ user }) => user.id === userId);
}

function filterBySearchQuery(productsToFilter, searchQuery) {
  const lowerQuery = searchQuery.toLowerCase();

  return productsToFilter
    .filter(({ name }) => name.toLowerCase().includes(lowerQuery));
}

function filterByCategories(productsToFilter, categories) {
  if (!categories.length) {
    return productsToFilter;
  }

  return productsToFilter
    .filter(({ category }) => categories.includes(category.id));
}

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filterParams = {
    userId: selectedUserId,
    searchQuery,
    selectedCategories,
  };

  const filteredProducts = filterProducts(products, filterParams);

  const addSelectedCategory = (newCategory) => {
    setSelectedCategories(prevState => [...prevState, newCategory]);
  };

  const removeSelectedCategory = (categoryToRemove) => {
    setSelectedCategories(prevState => prevState
      .filter(id => id !== categoryToRemove));
  };

  const changeCategory = (id) => {
    if (selectedCategories.includes(id)) {
      removeSelectedCategory(id);

      return;
    }

    addSelectedCategory(id);
  };

  const clearCategories = () => setSelectedCategories([]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <Filters
          users={usersFromServer}
          selectedUserId={selectedUserId}
          changeSelectedUserId={newUser => setSelectedUserId(newUser)}
          searchQuery={searchQuery}
          changeSearchQuery={newQuery => setSearchQuery(newQuery)}
          categories={categoriesFromServer}
          selectedCategories={selectedCategories}
          changeCategory={changeCategory}
          clearCategories={clearCategories}
        />
        <ProductList products={filteredProducts} />

      </div>
    </div>
  );
};

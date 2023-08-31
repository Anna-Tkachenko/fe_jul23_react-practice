import React, { useEffect, useState } from 'react';
import './App.scss';

import { getFilteredProducts } from './helpers/products.helper';
import FilterPanel from './components/FilterPanel/FilterPanel';
import ProductTable from './components/ProductTable/ProductTable';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const { categoryId } = product;

  const category = categoriesFromServer.find(({ id }) => id === categoryId);
  const user = usersFromServer.find(item => item.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [activeUser, setActiveUser] = useState(null);
  const [activeCategories, setActiveCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(products);

  useEffect(() => {
    const newVisibleProducts = getFilteredProducts(
      products,
      activeUser,
      activeCategories,
      searchValue,
      sortedColumn,
    );

    setVisibleProducts(newVisibleProducts);
  }, [activeUser, activeCategories, searchValue, sortedColumn]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <FilterPanel
          activeUser={activeUser}
          setActiveUser={setActiveUser}
          activeCategories={activeCategories}
          setActiveCategories={setActiveCategories}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <ProductTable
          products={visibleProducts}
          sortedColumn={sortedColumn}
          setSortedColumn={setSortedColumn}
        />
      </div>
    </div>
  );
};

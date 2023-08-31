import usersFromServer from './users';
import categoriesFromServer from './categories';
import productsFromServer from './products';

const getPreparedProducts = (
  users,
  categories,
  products,
) => {
  const preparedProducts = products.map((product) => {
    const category = categories.find(({ id }) => (
      id === product.categoryId
    ));
    const categoryClone = { ...category };

    const owner = users.find(({ id }) => id === category.ownerId);
    const ownerClone = { ...owner };

    delete categoryClone.ownerId;

    const newProduct = {
      ...product,
      category: categoryClone,
      owner: ownerClone,
    };

    delete newProduct.categoryId;

    return newProduct;
  });

  return preparedProducts;
};

const preparedProducts = getPreparedProducts(
  usersFromServer,
  categoriesFromServer,
  productsFromServer,
);

export default preparedProducts;

import { Product } from '../Product/Product';

export const ProductList = ({ products }) => (
  <tbody>
    {products.map(product => (
      <Product key={product.key} product={product} />
    ))}
  </tbody>
);

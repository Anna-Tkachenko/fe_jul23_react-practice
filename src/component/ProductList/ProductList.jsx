import { ProductItem } from "../ProductItem/ProductItem";

export const ProductList = ({ products }) => (
  <tbody>
    {products.map(product => (
      <ProductItem key={product.id} product={product} />
    ))}
  </tbody>
);

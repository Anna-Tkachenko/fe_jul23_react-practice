import { ProductTable } from '../../ProductTable';

export const ProductList = ({ products }) => (
  <div className="box table-container">
    {products.length
      ? (
        <ProductTable products={products} />
      )
      : (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      )
    }
  </div>
);

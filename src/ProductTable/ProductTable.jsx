import { ProductItem } from '../components/ProductItem';
import { TableSection } from './TableSection';

export const ProductTable = ({ products }) => {
  const tableSectionNames = ['ID', 'Product', 'Category', 'User'];

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableSectionNames.map(sectionName => (
            <TableSection key={sectionName} sectionName={sectionName} />
          ))}
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))

    }
      </tbody>
    </table>
  );
};

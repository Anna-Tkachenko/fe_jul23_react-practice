import cn from 'classnames';

export const ProductItem = ({ product }) => (
  <tr data-cy="Product">
    <td className="has-text-weight-bold" data-cy="ProductId">
      {product.id}
    </td>

    <td data-cy="ProductName">{product.name}</td>
    <td data-cy="ProductCategory">{`${product.categoryIcon} - ${product.categoryTitle}`}</td>

    <td
      data-cy="ProductUser"
      className={cn({
        "has-text-link": product.userSex === 'm',
        "has-text-danger": product.userSex === 'f',
      })}
    >
      {product.userName}
    </td>
  </tr>
);

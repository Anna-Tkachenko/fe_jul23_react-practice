import cn from 'classnames';

export const ProductItem = ({ product }) => {
  const { user, category } = product;
  const isMale = sex => sex === 'm';

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {product.id}
      </td>

      <td data-cy="ProductName">
        {product.name}
      </td>

      <td data-cy="ProductCategory">
        {`${category.icon} - ${category.title}`}
      </td>

      <td
        data-cy="ProductUser"
        className={cn('has-text-link', {
          'has-text-link': isMale(user.sex),
          'has-text-danger': !isMale(user.sex),
        })}
      >
        {user.name}
      </td>
    </tr>
  );
};

import cn from 'classnames';

export const Product = ({ product }) => {
  const { id, name, category } = product;
  const { title, icon } = category;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
      <td data-cy="ProductCategory">
        <span role="img" aria-labelledby="emoji-desc">{icon}</span>
        {` - `}
        {title}
      </td>

      <td
        data-cy="ProductUser"
        className={cn({
          'has-text-link': product.user.sex === 'm',
          'has-text-danger': product.user.sex === 'f',
        })}
      >
        {product.user.name}
      </td>
    </tr>
  );
};

export const Product = ({ product }) => {
  const { id, user, category, name } = product;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>

      <td data-cy="ProductCategory">🍺 - {category.title}</td>

      <td
        data-cy="ProductUser"
        className="has-text-link"
      >
        {/* {user.name} */}
      </td>
    </tr>
  );
};

export const Product = ({ product }) => {
  const {
    id,
    name,
  } = product;

  return (
    <>
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
    </>
  );
};

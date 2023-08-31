export const Categorie = ({ categorie }) => {
  const {
    icon,
    title,
  } = categorie;

  return (
    <>
      <td data-cy="ProductCategory">{`${icon} - ${title}`}</td>
    </>
  );
};

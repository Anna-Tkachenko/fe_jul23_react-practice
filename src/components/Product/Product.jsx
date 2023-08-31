import cn from 'classnames';
import { FEMALE, MALE } from '../../utils/vars';

export const Product = ({ product }) => {
  const { name, id, category, user } = product;

  return (

    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
      <td data-cy="ProductCategory">
        <span role="img" aria-label="mac-book">
          {category.icon}
        </span>
        {' - '}
        {category.title}
      </td>

      <td
        data-cy="ProductUser"
        className={cn({
          'has-text-link': user.sex === MALE,
          'has-text-danger': user.sex === FEMALE,
        })}
      >
        {user?.name}
      </td>
    </tr>
  );
};

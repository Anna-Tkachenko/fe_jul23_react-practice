import React from 'react';
import cn from 'classnames';
import { USER_SEX } from '../../constants/user';

const ProductItem = ({ product }) => {
  const { id, name, category, user } = product;
  const { icon, title } = category;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">
        {name}
      </td>

      <td data-cy="ProductCategory">
        {`${icon} - ${title}`}
      </td>

      <td
        data-cy="ProductUser"
        className={cn({
          'has-text-link': user.sex === USER_SEX.MALE,
          'has-text-danger': user.sex === USER_SEX.FEMALE,
        })}
      >
        {user.name}
      </td>
    </tr>
  );
};

export default ProductItem;

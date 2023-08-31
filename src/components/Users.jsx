import cn from 'classnames';

export const Users = ({ user }) => {
  const {
    name,
    sex,
  } = user;

  return (
    <>
      <td
        data-cy="ProductUser"
        className={cn('has-text-link', { 'has-text-danger': sex === 'f' })}
      >
        {name}
      </td>
    </>
  );
};

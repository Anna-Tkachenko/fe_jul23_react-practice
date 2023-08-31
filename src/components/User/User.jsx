export const User = ({
  user,
  selecteddUser,
  onUserSelectedHandler,
  ...props
}) => (
  <a
    data-cy="FilterUser"
    href="#/"
    onClick={() => onUserSelectedHandler(user)}
    className={props.cn(
      { 'is-active': user.name === selecteddUser },
    )}
  >
    {user.name}
  </a>
);

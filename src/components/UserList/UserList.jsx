import cn from 'classnames';
import { User } from '../User/User';

export const UserList = ({ users, selecteddUser, onUserSelectedHandler }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterAllUsers"
      href="#/"
      onClick={() => onUserSelectedHandler('')}
      className={cn({
        'is-active': !selecteddUser,
      })}
    >
      All
    </a>

    {users.map(user => (
      <User
        key={user.id}
        user={user}
        selecteddUser={selecteddUser}
        onUserSelectedHandler={onUserSelectedHandler}
        cn={cn}
      />
    ))}
  </p>
);

import React from 'react';
import cn from 'classnames';
import usersFromServer from '../../api/users';

const UserFilter = ({ activeUser, setActiveUser }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      onClick={() => setActiveUser(null)}
      className={cn({
        'is-active': !activeUser,
      })}
      data-cy="FilterAllUsers"
      href="#/"
    >
      All
    </a>
    {usersFromServer.map(item => (
      <a
        onClick={() => setActiveUser(item.id)}
        key={item.id}
        className={cn({
          'is-active': activeUser === item.id,
        })}
        data-cy="FilterUser"
        href="#/"
      >
        {item.name}
      </a>
    ))}
  </p>
);

export default UserFilter;

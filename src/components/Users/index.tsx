import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import './style.scss';

import { User } from 'generated/graphql';

const USERS = gql`
  {
    users {
      userId
      userName
      firstName
      lastName
      email
      phone
    }
  }
`;

interface IResponse {
  users: User[]
}

const Users: FC = () => {
  const { loading, error, data } = useQuery<IResponse>(USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul className="users__list">
      {(data !== undefined) && data.users.map(user => (
        <li key={user.userId!} className="users__item">
          <p>{user.userName}</p>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </li>
      ))}
    </ul>
  );
};

export default Users;

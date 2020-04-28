import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { User } from 'generated/graphql';

const ADMIN = gql`
  {
    admins {
      userId
      userName
    }
  }
`;

interface IResponse {
  admins: User[]
}

const Admin: FC = () => {
  const { loading, error, data } = useQuery<IResponse>(ADMIN);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error::((</div>;

  return (
    <div className="admins__list">
      {(data !== undefined) && data.admins.map(admin => (
        <li key={admin.userId!} className="admin__item">
          <p>{admin.userName}</p>
        </li>
      ))}
    </div>
  )
};

export default Admin;

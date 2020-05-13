import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import VpnKey from '@material-ui/icons/VpnKey';

import './style.scss';

import useAuthRoute from 'hooks/useAuthRoute';
import usePrivateClient from 'hooks/usePrivateClient';
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
  admins: User[];
}

const Admin: FC = observer(() => {
  useAuthRoute();
  const client = usePrivateClient();
  const { loading, error, data } = useQuery<IResponse>(ADMIN, { client });

  if (loading) return <div className="wrapper">Loading...</div>;
  if (error) {
    return (
      /* tslint:disable */
      <div className="wrapper centralized">
        You probably need to
        <Link to="/login">
          <Button>
            Login <VpnKey />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <ul className="admins__list">
        {data !== undefined &&
          data.admins.map((admin) => (
            <li key={admin.userId!} className="admin__item">
              <p>{admin.userName}</p>
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Admin;

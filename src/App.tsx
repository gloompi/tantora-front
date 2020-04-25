import React, { FC } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import 'normalize.css';
import './App.scss';

import env from 'config/env';
import Users from 'components/Users';

const client = new ApolloClient({
  uri: env.backendUrl,
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <Users />
  </ApolloProvider>
);

export default App;

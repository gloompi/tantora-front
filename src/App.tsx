import React, { FC } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import 'normalize.css';
import './App.scss';

import Users from 'components/Users';

const client = new ApolloClient({
  uri: 'http://localhost:9999/graphql',
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <Users />
  </ApolloProvider>
);

export default App;

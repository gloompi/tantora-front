import React, { FC, createContext, useContext } from 'react';
import ApolloClient from 'apollo-boost';

import env from '@config/env';

const privateClient = new ApolloClient({
  uri: env.privateBackendUrl,
  request: (operation) => {
    const token = localStorage.getItem('authToken');

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      },
    });
  },
});

const PrivateClientContext = createContext<ApolloClient<unknown>>(privateClient);

export const PrivateClientProvider: FC = ({ children }) => (
  <PrivateClientContext.Provider value={privateClient}>
    {children}
  </PrivateClientContext.Provider>
);

export default () => {
  const client = useContext(PrivateClientContext);

  if (!client) {
    throw new Error('`PrivateClientProvider` need to be defined higher up in the tree');
  }

  return client;
};

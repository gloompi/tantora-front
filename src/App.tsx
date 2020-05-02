import React, { FC } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import loadable from "@loadable/component";

import 'normalize.css';
import './App.scss';

import theme from 'theme';
import env from '@config/env';
import { StoreProvider } from 'hooks/useStore';
import { PrivateClientProvider } from 'hooks/usePrivateClient';
import Loading from 'components/@common/Loading';
import Header from 'components/@common/Header';
import Footer from 'components/@common/Footer';

// loadable components
const LoadableUsers = loadable(() => import("components/Users"), {
  fallback: <Loading />
});
const LoadableLogin = loadable(() => import("components/Login"), {
  fallback: <Loading />
});
const LoadableAdmins = loadable(() => import("components/Admin"), {
  fallback: <Loading />
});

const client = new ApolloClient({
  uri: env.backendUrl,
});

console.log('ENV', env);

const App: FC = () => (
  <ApolloProvider client={client}>
    <PrivateClientProvider>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact>
                <LoadableUsers />
              </Route>
              <Route path="/admins">
                <LoadableAdmins />
              </Route>
              <Route path="/login">
                <LoadableLogin />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </ThemeProvider>
      </StoreProvider>
    </PrivateClientProvider>
  </ApolloProvider>
);

export default App;

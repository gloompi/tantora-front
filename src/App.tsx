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

import env from 'config/env';
import Loading from 'components/@common/Loading';
import Header from 'components/@common/Header';

const LoadableUsers = loadable(() => import("components/Users"), {
  fallback: <Loading />
});

const LoadableLogin = loadable(() => import("components/Login"), {
  fallback: <Loading />
});

const client = new ApolloClient({
  uri: env.backendUrl,
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <LoadableUsers />
          </Route>
          <Route path="/login">
            <LoadableLogin />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;

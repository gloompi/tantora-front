import React, { FC } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import loadable from '@loadable/component';

import 'normalize.css';
import './App.scss';

import theme from 'theme';
import env from '@config/env';
import { StoreProvider } from 'hooks/useStore';
import Loading from 'components/@common/Loading';
import Header from 'components/@common/Header';
import Footer from 'components/@common/Footer';

// loadable components
const LoadableHome = loadable(() => import('components/Home'), {
  fallback: <Loading />,
});
const LoadableExibitions = loadable(() => import('components/Events'), {
  fallback: <Loading />,
});
const LoadableLogin = loadable(() => import('components/Login'), {
  fallback: <Loading />,
});
const LoadableAdmins = loadable(() => import('components/Admin'), {
  fallback: <Loading />,
});
const LoadableRegistration = loadable(() => import('components/Registration'), {
  fallback: <Loading />,
});
const LoadableMessages = loadable(() => import('components/Messages'), {
  fallback: <Loading />,
});

const client = new ApolloClient({
  uri: env.backendUrl,
  request: (operation) => {
    const token = localStorage.getItem('authToken');

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

const App: FC = () => {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Header />
            <main className={classes.main}>
              <Switch>
                <Route path="/" exact={true}>
                  <LoadableHome />
                </Route>
                <Route path="/exibitions">
                  <LoadableExibitions />
                </Route>
                <Route path="/admins">
                  <LoadableAdmins />
                </Route>
                <Route path="/login">
                  <LoadableLogin />
                </Route>
                <Route path="/register">
                  <LoadableRegistration />
                </Route>
                <Route path="/messages">
                  <LoadableMessages />
                </Route>
              </Switch>
            </main>
            <Footer />
          </Router>
        </ThemeProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

const useStyles = makeStyles({
  main: {
    minHeight: 'calc(100vh - 70px)',
  },
});

export default App;

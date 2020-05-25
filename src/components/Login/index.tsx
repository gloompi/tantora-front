import React, { useState, ChangeEventHandler } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import { gql } from 'apollo-boost';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VpnKey from '@material-ui/icons/VpnKey';

import useStore from 'hooks/useStore';
import { LoginResponse } from 'generated/graphql';
import Loading from 'components/@common/Loading';

const LoginUserQuery = gql`
  query($userName: String!, $password: String!) {
    loginUser(userName: $userName, password: $password) {
      token {
        refreshToken
        accessToken
      }
    }
  }
`;

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authStore } = useStore();
  const classes = useStyles();

  const [handleLogin, { loading, error, data, called }] = useLazyQuery<{
    loginUser: LoginResponse;
  }>(LoginUserQuery, { variables: { userName, password } });

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  if (called) {
    const authToken = get(data, 'loginUser.token.accessToken', '');
    const refreshToken = get(data, 'loginUser.token.refreshToken', '');

    if (!isEmpty(authToken) && !isEmpty(refreshToken)) {
      authStore.setAuthToken(authToken);
      authStore.setRefreshToken(refreshToken);

      return <Redirect to="/" />;
    }
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <form className={classes.form}>
        {!loading ? (
          <Typography className={classes.title} variant="h4" color="secondary">
            <VpnKey /> Login
          </Typography>
        ) : (
          <Loading />
        )}
        <TextField
          label="Username"
          value={userName}
          error={Boolean(error)}
          className={classes.input}
          onChange={handleUsernameChange}
          disabled={loading}
          fullWidth={true}
          required={true}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          error={Boolean(error)}
          className={classes.input}
          onChange={handlePasswordChange}
          disabled={loading}
          fullWidth={true}
          required={true}
        />
        <div className={classes.buttonsWrapper}>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={() => handleLogin()}
          >
            Confirm
          </Button>
          <Link to="/register">
            <Button variant="outlined" color="primary" disabled={loading}>
              Register
            </Button>
          </Link>
        </div>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: theme.mixins.container,
  form: theme.mixins.form,
  title: {
    marginBottom: 25,
  },
  input: {
    marginBottom: 25,
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',

    '& > button': {
      '&:first-child': {
        marginRight: 25,
      },
    },
  },
}));

export default Login;

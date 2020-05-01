import React, { useState, ChangeEventHandler } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
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
  const [goHome, setGoHome] = useState(false);
  const { authStore } = useStore();
  const classes = useStyles();

  const [handleLogin, { loading, error, data, called }] = useLazyQuery<{ loginUser: LoginResponse }>(LoginUserQuery, { variables: { userName, password } });

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  if (called && !goHome) {
    const authToken = get(data, 'loginUser.token.accessToken', '');
    const refreshToken = get(data, 'loginUser.token.refreshToken', '');
    
    if (!isEmpty(authToken) && !isEmpty(refreshToken)) {
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('refreshToken', refreshToken);
      authStore.setAuthToken(authToken);
      authStore.setRefreshToken(refreshToken);
      
      setGoHome(true);
    }
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      {goHome && <Redirect to="/"/>}
      <form className={classes.form}>
        {!loading
          ? (
            <Typography
              className={classes.title}
              variant="h4"
              color="secondary"
            >
              <VpnKey /> Login
            </Typography>
          ) : <Loading />
        }
        <TextField
          label="Username"
          value={userName}
          error={Boolean(error)}
          className={classes.input}
          onChange={handleUsernameChange}
          disabled={loading}
          fullWidth
          required
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          error={Boolean(error)}
          className={classes.input}
          onChange={handlePasswordChange}
          disabled={loading}
          fullWidth
          required
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
            <Button variant="outlined" color="primary" disabled={loading}>Register</Button>
          </Link>
        </div>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 128px)',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '25px 50px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 5,
  },
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
        marginRight: 25
      }
    }
  }
}));

export default Login;

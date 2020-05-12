import React, { useState, ChangeEventHandler } from 'react';
import { Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useStore from 'hooks/useStore';
import { CreateUserResponse } from 'generated/graphql';
import Loading from 'components/@common/Loading';

const CreateUserMutation = gql`
  mutation(
    $userName: String!
    $password: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $phone: String
    $dateOfBirth: String!
  ) {
    createUser(
      userName: $userName
      password: $password
      email: $email
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      dateOfBirth: $dateOfBirth
    ) {
      status
    }
  }
`;

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOB, setDateOB] = useState('');
  const [goLogin, setGoLogin] = useState(false);
  const { authStore } = useStore();
  const classes = useStyles();

  const disabled =
    isEmpty(userName) ||
    isEmpty(password) ||
    isEmpty(email) ||
    isEmpty(firstName) ||
    isEmpty(lastName) ||
    isEmpty(dateOB);

  const [register, { loading, error, data, called }] = useMutation<{
    createUser: CreateUserResponse;
  }>(CreateUserMutation, {
    variables: {
      userName,
      password,
      email,
      firstName,
      lastName,
      phone,
      dateOfBirth: dateOB,
    },
  });

  // input handlers
  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const handleFirstNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLastName(e.target.value);
  };
  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhone(e.target.value);
  };
  const handleDateOBChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDateOB(e.target.value);
  };

  // register handler
  const handleRegister = () => {
    if (!disabled) {
      register();
    }
  };

  if (called && data?.createUser.status === 'ok' && !goLogin) {
    authStore.clear();
    setGoLogin(true);
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <form className={classes.form}>
        {!loading ? (
          <Typography className={classes.title} variant="h4" color="secondary">
            Create New User
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
        <TextField
          label="Email"
          type="email"
          value={email}
          error={Boolean(error)}
          className={classes.input}
          onChange={handleEmailChange}
          disabled={loading}
          fullWidth={true}
          required={true}
        />
        <TextField
          label="First name"
          value={firstName}
          error={Boolean(error)}
          className={classes.input}
          onChange={handleFirstNameChange}
          disabled={loading}
          fullWidth={true}
          required={true}
        />
        <TextField
          label="Last name"
          value={lastName}
          error={Boolean(error)}
          className={classes.input}
          onChange={handleLastNameChange}
          disabled={loading}
          fullWidth={true}
          required={true}
        />
        <TextField
          label="Phone"
          value={phone}
          error={Boolean(error)}
          className={classes.input}
          onChange={handlePhoneChange}
          disabled={loading}
          fullWidth={true}
        />
        <TextField
          label="Date of birth"
          value={dateOB}
          type="date"
          error={Boolean(error)}
          className={classes.input}
          onChange={handleDateOBChange}
          disabled={loading}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth={true}
          required={true}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={loading || disabled}
          onClick={handleRegister}
        >
          Register
        </Button>
      </form>
      {goLogin && <Redirect to="/login" />}
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

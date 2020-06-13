import React, {
  useState,
  useEffect,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import { gql } from 'apollo-boost';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import useStore from 'hooks/useStore';
import {
  CreateUserResponse,
  AddToAdminResponse,
  AddToProducerResponse,
} from 'generated/graphql';
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
      token {
        accessToken
      }
      user {
        userId
      }
    }
  }
`;

const AddToAdminsMutation = gql`
  mutation($userId: String!) {
    addToAdmins(userId: $userId) {
      status
    }
  }
`;

const AddToProducerMutation = gql`
  mutation($userId: String!) {
    addToProducer(userId: $userId) {
      status
    }
  }
`;

const ROLE_ENUM = Object.freeze({
  CLIENT: 'client',
  PRODUCER: 'producer',
  ORGANIZER: 'organizer',
});

const Register = () => {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(ROLE_ENUM.CLIENT);

  // form fields
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOB, setDateOB] = useState('');

  const { authStore } = useStore();
  const classes = useStyles();

  const [register, registerPayload] = useMutation<{
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

  const userId = get(registerPayload, 'data.createUser.user.userId', '');

  const [addToAdmins, adminsPayload] = useMutation<{
    addToAdmins: AddToAdminResponse;
  }>(AddToAdminsMutation, {
    variables: { userId },
  });

  const [addToProducers, producersPayload] = useMutation<{
    addToProducer: AddToProducerResponse;
  }>(AddToProducerMutation, {
    variables: { userId },
  });

  useEffect(() => {
    // if(registerPayload.called && !registerPayload.error) {
    //     return <Redirect to="/" />
    //   } else {
    //     console.log('You have failed registration dui to this reason:' + registerPayload.error)
    //   }

    if (
      registerPayload.called &&
      registerPayload.loading === false &&
      userId !== ''
    ) {
      authStore.setAuthToken(
        get(registerPayload, 'data.createUser.token.accessToken', '')
      );

      if (userType === ROLE_ENUM.PRODUCER) {
        addToProducers(userId);
      } else if (userType === ROLE_ENUM.ORGANIZER) {
        addToAdmins(userId);
      }
    }
  }, [
    userId,
    userType,
    authStore,
    addToAdmins,
    addToProducers,
    registerPayload,
    registerPayload.called,
    registerPayload.loading,
  ]);

  // input handlers
  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setConfirmPassword(e.target.value);
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

  const handleTypeChange: ChangeEventHandler<{
    name?: string;
    value: unknown;
  }> = (e) => {
    if (typeof e.target.value === 'string') {
      setUserType(e.target.value);
    }
  };

  const disabled =
    isEmpty(userName) ||
    isEmpty(password) ||
    isEmpty(email) ||
    isEmpty(firstName) ||
    isEmpty(lastName) ||
    isEmpty(dateOB) ||
    registerPayload.loading ||
    adminsPayload.loading ||
    producersPayload.loading;

  // User type handler
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // register handler
  const handleRegister: MouseEventHandler = () => {
    if (password === confirmPassword) {
      if (!disabled) {
        register();
      }
    }
  };

  if (authStore.isAuth) {
    if (
      userType === ROLE_ENUM.CLIENT ||
      (userType === ROLE_ENUM.PRODUCER &&
        producersPayload.called &&
        !producersPayload.loading) ||
      (userType === ROLE_ENUM.ORGANIZER &&
        adminsPayload.called &&
        !adminsPayload.loading)
    ) {
      return <Redirect to="/" />;
    }
  }

  return (
    <Container className={classes.container}>
      <form className={classes.form}>
        {!registerPayload.loading ? (
          <Typography className={classes.title} variant="h4" color="secondary">
            Create New User
          </Typography>
        ) : (
          <Loading />
        )}
        <TextField
          label="Username"
          value={userName}
          error={Boolean(registerPayload.error)}
          className={classes.input}
          onChange={handleUsernameChange}
          disabled={registerPayload.loading}
          fullWidth={true}
          required={true}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          error={Boolean(registerPayload.error)}
          className={classes.input}
          onChange={handlePasswordChange}
          disabled={registerPayload.loading}
          fullWidth={true}
          required={true}
        />
        <TextField
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          className={classes.input}
          onChange={handleConfirmPasswordChange}
          disabled={registerPayload.loading}
          fullWidth={true}
          required={true}
          error={password !== confirmPassword}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          error={Boolean(registerPayload.error)}
          className={classes.input}
          onChange={handleEmailChange}
          disabled={registerPayload.loading}
          fullWidth={true}
          required={true}
        />
        <TextField
          label="First name"
          value={firstName}
          error={Boolean(registerPayload.error)}
          className={classes.input}
          onChange={handleFirstNameChange}
          disabled={registerPayload.loading}
          fullWidth={true}
          required={true}
        />
        <TextField
          label="Last name"
          value={lastName}
          error={Boolean(registerPayload.error)}
          className={classes.input}
          onChange={handleLastNameChange}
          disabled={registerPayload.loading}
          fullWidth={true}
          required={true}
        />
        <TextField
          label="Phone"
          value={phone}
          error={Boolean(registerPayload.error)}
          className={classes.input}
          onChange={handlePhoneChange}
          disabled={registerPayload.loading}
          fullWidth={true}
        />
        <TextField
          label="Date of birth"
          value={dateOB}
          type="date"
          error={Boolean(registerPayload.error)}
          className={classes.input}
          onChange={handleDateOBChange}
          disabled={registerPayload.loading}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth={true}
          required={true}
        />
        <div>
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={userType}
            onChange={handleTypeChange}
            fullWidth={true}
            required={true}
            className={classes.input}
          >
            <MenuItem value={ROLE_ENUM.CLIENT}>Client</MenuItem>
            <MenuItem value={ROLE_ENUM.PRODUCER}>Producer</MenuItem>
            <MenuItem value={ROLE_ENUM.ORGANIZER}>Organizor</MenuItem>
          </Select>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={registerPayload.loading || disabled}
          onClick={handleRegister}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.mixins.container,
    width: '100%',
    maxWidth: '100%',
    background: `url(${require('assets/images/register-bg.jpg')}) center no-repeat`,
    backgroundSize: 'cover',
  },
  form: {
    ...theme.mixins.form,
    backgroundColor: theme.palette.common.white,
  },
  title: {
    marginBottom: 25,
  },
  input: {
    marginBottom: 25,
  },
}));

export default Register;

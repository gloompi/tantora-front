import React from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  button: {
    color: '#000'
  }
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <form>
        <Typography variant="h4" color="secondary">Login</Typography>
      </form>
    </Container>
  );
};

export default Login;

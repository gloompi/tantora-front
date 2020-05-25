import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const MainScreen = () => {
  const classes = useStyles();

  return <div className={classes.wrapper}>main</div>;
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
    marginBottom: 150,
  },
}));

export default MainScreen;

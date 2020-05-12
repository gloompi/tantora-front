import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography>
            &copy; {new Date().getFullYear()} Online Exhibition
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

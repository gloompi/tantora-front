import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography color="inherit">
        &copy; {new Date().getFullYear()} Online Exhibition
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 70,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: '0 calc((100vw - 1170px) / 2)',
  },
}));

export default Header;

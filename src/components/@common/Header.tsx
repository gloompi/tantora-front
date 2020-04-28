import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  login: {
    color: '#fff',
    border: 'none',
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu">
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            `Online Exhibition`
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button className={classes.login}>Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;

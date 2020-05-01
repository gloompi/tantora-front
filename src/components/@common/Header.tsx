import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

import useStore from 'hooks/useStore';

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

const Header = observer(() => {
  const { authStore } = useStore();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/admins">
            <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu">
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            `Online Exhibition`
          </Typography>
          {authStore.isAuth
            ? (
              <Link to="/logout" style={{ textDecoration: 'none' }}>
                <Button className={classes.login}>Logout</Button>
              </Link>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button className={classes.login}>Login</Button>
              </Link>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default Header;

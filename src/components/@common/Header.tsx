import React, { useState } from 'react';
import { gql } from 'apollo-boost';
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

import { LogoutResponse } from 'generated/graphql';
import useStore from 'hooks/useStore';
import usePrivateClient from 'hooks/usePrivateClient';
import Menu from 'components/@common/Menu';

const LogoutQuery = gql`
  query ($token: String!){
    logout(token: $token) {
      deleted
    }
  }
`;

const Header = observer(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authStore } = useStore();
  const client = usePrivateClient();
  const classes = useStyles();

  const handleLogout = async () => {
    const res = await client.query<{logout: LogoutResponse}>({
      query: LogoutQuery,
      variables: {
        token: authStore.authToken,
      }
    });

    if (res.data.logout.deleted) {
      client.resetStore();
      authStore.clear();
    }
  };

  const handleToggleMenu = (open: boolean) => () => {
    setMenuOpen(open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Menu open={menuOpen} handleClose={handleToggleMenu(false)} />
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="default"
            aria-label="menu"
            onClick={handleToggleMenu(true)}
          >
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
            ? <Button className={classes.login} onClick={handleLogout}>Logout</Button>
            : (
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

export default Header;

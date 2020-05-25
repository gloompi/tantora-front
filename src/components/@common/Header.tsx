import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import hexToRgb from 'hex-rgb';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { LogoutResponse } from 'generated/graphql';
import useStore from 'hooks/useStore';
import Menu from 'components/@common/Menu';

const LogoutQuery = gql`
  query($token: String!) {
    logout(token: $token) {
      deleted
    }
  }
`;

const Header = observer(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authStore } = useStore();
  const client = useApolloClient();
  const classes = useStyles();
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

  const handleLogout = async () => {
    try {
      await client.query<{ logout: LogoutResponse }>({
        query: LogoutQuery,
        variables: {
          token: authStore.authToken,
        },
      });
    } catch (error) {
      // handle error
    }

    client.resetStore();
    authStore.clear();
  };

  const handleToggleMenu = (open: boolean) => () => {
    setMenuOpen(open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.headerBar}>
        {isTablet && (
          <Menu open={menuOpen} handleClose={handleToggleMenu(false)} />
        )}
        <Toolbar className={classes.headerToolbar}>
          {isTablet && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="default"
              aria-label="menu"
              onClick={handleToggleMenu(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" className={classes.homeBtn}>
              Tantora
            </Typography>
          </Link>
          <div className={classes.loginWrapper}>
            {authStore.isAuth ? (
              <Button className={classes.login} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button className={classes.login}>SignUp</Button>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button className={classes.login}>Login</Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
});

const useStyles = makeStyles((theme) => {
  const { red, green, blue } = hexToRgb(theme.palette.primary.main);

  return {
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 250,
    },
    headerBar: {
      background: `linear-gradient(90deg, rgba(${red}, ${green}, ${blue}, 0.5) 0%, rgba(${blue}, ${green}, ${red}, 0.5) 96%)`,
    },
    headerToolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    homeBtn: {
      color: theme.palette.common.white,
    },
    loginWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    login: {
      color: theme.palette.common.white,
    },
  };
});

export default Header;

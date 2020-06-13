import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import UserIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';

const friends = [
  {
    userName: 'Tik-tak',
  },
  {
    userName: 'Kolobok',
  },
  {
    userName: 'Jiraya',
  },
  {
    userName: 'Kakashi',
  },
];

const FriendList = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h6" color="inherit">
        Friends
      </Typography>
      <List>
        {friends.map(({ userName }, idx) => (
          <>
            <Link to={`/messages/${userName}`} className={classes.link}>
              <ListItem key={userName}>
                <ListItemIcon>
                  <UserIcon />
                </ListItemIcon>
                <ListItemText>{userName}</ListItemText>
              </ListItem>
            </Link>
            {idx < friends.length - 1 && <Divider />}
          </>
        ))}
      </List>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    maxWidth: 350,
    minHeight: '100vh',
    padding: '90px 25px',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
  },
  link: {
    display: 'block',
    color: theme.palette.common.white,
    transition: '.3s',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}));

export default FriendList;

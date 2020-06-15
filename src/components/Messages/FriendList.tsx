import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import UserIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import { Socket } from 'hooks/useSocket';

interface IUser {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
}

interface IProps {
  socket?: Socket;
}

const FriendList: FC<IProps> = ({ socket }) => {
  const [friends, setFriends] = useState<IUser[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (socket) {
      // socket.io?.on('friends', (data: IUser[]) => {
      //   setFriends(data);
      // });

      socket.io?.on('recent messages', (data: IUser[]) => {
        console.log('MESSAGES', data);
        setFriends(data);
      });
    }
  }, [socket]);

  return (
    <div className={classes.container}>
      <Typography variant="h6" color="inherit">
        Recents
      </Typography>
      <List>
        {friends.map(({ userName, userId }, idx) => (
          <Link
            key={userName}
            to={`/messages/${userName}/${userId}`}
            className={classes.link}
          >
            <ListItem key={userName}>
              <ListItemIcon>
                <UserIcon />
              </ListItemIcon>
              <ListItemText>{userName}</ListItemText>
            </ListItem>
            {idx < friends.length - 1 && <Divider />}
          </Link>
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
    maxWidth: 300,
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

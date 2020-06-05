import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import useSocket from 'hooks/useSocket';
import FriendList from 'components/Messages/FriendList';
import Message from 'components/Messages/Message';

const Messages = () => {
  const socket = useSocket();
  const classes = useStyles();

  useEffect(() => {
    socket.connect();
  }, [socket]);

  return (
    <div className={classes.container}>
      <FriendList />
      <Route
        exact={true}
        path="/messages/:username"
        component={() => <Message socket={socket} />}
      />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    backgroundSize: 'cover',

    '&:before': {
      content: `""`,
      position: 'absolute',
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
    },
  },
}));

export default Messages;

import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';

import useStore from 'hooks/useStore';
import useSocket, { Socket } from 'hooks/useSocket';
import FriendList from 'components/Messages/FriendList';
import Message from 'components/Messages/Message';

const Messages = observer(() => {
  const socket = useSocket();
  const { authStore } = useStore();
  const [mainSocket, setMainSocket] = useState<Socket>();
  const classes = useStyles();

  useEffect(() => {
    if (!mainSocket && authStore.isAuth) {
      socket.connect();

      socket.io?.on('connect', () => {
        socket.io?.emit('user joined', authStore.user?.userName);
        setMainSocket(socket);
      });
    }
  }, [mainSocket, socket, authStore.isAuth]);

  return (
    <div className={classes.container}>
      <FriendList />
      <Route
        exact={true}
        path="/messages/:username"
        component={() => <Message socket={mainSocket} />}
      />
    </div>
  );
});

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

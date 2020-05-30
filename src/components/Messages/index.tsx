import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FriendList from 'components/Messages/FriendList';

const Messages = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FriendList />
    </div>
  );
};

const useStyles = makeStyles(() => {
  return {
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      background: `url(${require('assets/images/chat-bg.jpg')}) center no-repeat`,
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
  };
});

export default Messages;

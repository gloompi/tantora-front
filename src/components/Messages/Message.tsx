import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Socket } from 'hooks/useSocket';

interface IProps {
  socket: Socket;
}

const Message: FC<IProps> = ({ socket }) => {
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    const check = socket.io?.emit('enter chat', { roomname: username });
    console.log('CHECK', check);
  }, [socket, username]);

  return (
    <div>
      <h3>Message</h3>
    </div>
  );
};

export default Message;

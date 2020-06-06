import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Socket } from 'hooks/useSocket';

interface IProps {
  socket?: Socket;
}

const Message: FC<IProps> = ({ socket }) => {
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (socket !== undefined) {
      socket?.io!.on('user joined', (data: any) => console.log("USER JOINED", data));
      socket?.io!.emit('enter chat', username);
    }
  }, [socket, username]);

  return (
    <div>
      <h3>Message</h3>
    </div>
  );
};

export default Message;

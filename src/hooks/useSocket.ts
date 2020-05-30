import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import env from '@config/env';

class Socket {
  private _io?: SocketIOClient.Socket;
  public static _instance?: Socket;

  get io(): SocketIOClient.Socket | undefined {
    return this._io;
  }

  public static getInstance = (): Socket => {
    if (Socket._instance === undefined) {
      const socket = new Socket();
      Socket._instance = socket;

      return Socket._instance;
    } else {
      return Socket._instance;
    }
  };

  public connect = async () => {
    if (this._io === undefined) {
      this._io = await io(env.chatUrl);
    }
  };
}

const useSocket = (): Socket | undefined => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const init = async () => {
      const instance = Socket.getInstance();
      await instance.connect();
      setSocket(instance);
    };

    init();
  }, []);

  return socket;
};

export default useSocket;

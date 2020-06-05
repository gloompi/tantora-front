import io from 'socket.io-client';

import env from '@config/env';

export class Socket {
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

  public connect = (room?: string) => {
    if (this._io === undefined) {
      this._io = io(env.chatUrl + (room ? `/${room}` : ''));
    }
  };
}

const useSocket = (): Socket => {
  return Socket.getInstance();
};

export default useSocket;

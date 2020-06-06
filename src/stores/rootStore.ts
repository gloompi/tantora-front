import { ApolloClient } from 'apollo-boost';

import AuthStore from './authStore';
import { client } from 'client';


export class RootStore {
  public authStore = new AuthStore(this);

  constructor(public appClient: ApolloClient<unknown>) {}
}

export default new RootStore(client);

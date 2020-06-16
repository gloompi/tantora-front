import { ApolloClient } from 'apollo-boost';

import AuthStore from './authStore';
import LoginStore from './loginStore';
import RegisterStore from './registerStore';
import { client } from 'client';

export class RootStore {
  public authStore = new AuthStore(this);
  public loginStore = new LoginStore(this);
  public registerStore = new RegisterStore(this);

  constructor(public appClient: ApolloClient<unknown>) {}
}

export default new RootStore(client);

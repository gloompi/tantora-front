import AuthStore from './authStore';

export class RootStore {
  public authStore = new AuthStore();
};

export default new RootStore();

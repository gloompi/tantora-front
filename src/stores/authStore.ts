import { observable, computed, action } from 'mobx';
import isEmpty from 'lodash/isEmpty';

import { User } from 'generated/graphql';

class AuthStore {
  @observable private _authToken: string;
  @observable private _refreshToken: string;
  @observable private _user?: User;

  @computed public get isAuth(): boolean {
    return !isEmpty(this._authToken) ? true : false;
  }

  @computed public get user(): User | undefined {
    return this._user;
  }

  @computed public get authToken(): string {
    const authToken = localStorage.getItem('authToken') || '';

    return this._authToken || authToken;
  }

  @computed public get refreshToken(): string {
    const refreshToken = localStorage.getItem('refreshToken') || '';

    return this._refreshToken || refreshToken;
  }

  constructor() {
    const authToken = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');

    this._authToken = authToken || '';
    this._refreshToken = refreshToken || '';
  }

  @action clear = () => {
    this._authToken = '';
    this._refreshToken = '';
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  };

  @action public setAuthToken = (token: string): void => {
    localStorage.setItem('authToken', token);
    this._authToken = token;
  };

  @action public setRefreshToken = (token: string): void => {
    localStorage.setItem('refreshToken', token);
    this._refreshToken = token;
  };

  @action public setUser = (user: User) => {
    this._user = user;
  };
}

export default AuthStore;

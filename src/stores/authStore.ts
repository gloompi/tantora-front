import { observable, computed, action } from 'mobx';
import isEmpty from 'lodash/isEmpty';

class AuthStore {
  @observable private _authToken: string;
  @observable private _refreshToken: string;

  @computed public get isAuth(): boolean {
    return !isEmpty(this._authToken) ? true : false
  };

  @computed public get authToken(): string {
    return this._authToken;
  };

  @computed public get refreshToken(): string {
    return this._refreshToken;
  };

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
    this._authToken = token;
  };

  @action public setRefreshToken = (token: string): void => {
    this._refreshToken = token;
  };
}

export default AuthStore;

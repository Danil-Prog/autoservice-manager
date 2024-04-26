import { makeAutoObservable } from 'mobx';
import AuthService from '~/core/services/AuthService';
import { toast } from 'react-hot-toast';

class AuthStore {
  token: string | undefined;
  refresh: string | undefined;
  isAuthenticated: boolean = false;
  isLoading: boolean = false;

  constructor() {
    if (localStorage.getItem('token')) {
      this.setAuth(true);
    }
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuthenticated = bool;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(username: string, password: string) {
    try {
      this.setLoading(true);
      const response = await AuthService.login(username, password);
      await localStorage.setItem('token', response.data.token);
      await this.setAuth(true);
      toast.success(`Успешный вход`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---login', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---login', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      this.setLoading(false);
    }
  }

  // async logout() {
  //   try {
  //     this.setLoading(true);
  //     await AuthService.logout();
  //     this.setAuth(false);
  //   } catch (error) {
  //     console.error('*---login', error);
  //   } finally {
  //     this.setLoading(false);
  //   }
  // }

  public clearAll() {
    this.isAuthenticated = false;
  }
}

export default AuthStore;

export interface IAuthStore extends AuthStore {}

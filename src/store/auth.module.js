import { defineStore } from 'pinia';
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore('auth', {
  state: () => ({
    status: initialState.status,
    user: initialState.user,
  }),
  actions: {
    async login(user) {
      try {
        const response = await AuthService.login(user);
        this.loginSuccess(response);
        return response;
      } catch (error) {
        this.loginFailure();
        throw error;
      }
    },
    logout() {
      AuthService.logout();
      this.logoutSuccess();
    },
    async register(user) {
      try {
        const response = await AuthService.register(user);
        this.registerSuccess();
        return response.data;
      } catch (error) {
        this.registerFailure();
        throw error;
      }
    },
    loginSuccess(user) {
      this.status.loggedIn = true;
      this.user = user;
    },
    loginFailure() {
      this.status.loggedIn = false;
      this.user = null;
    },
    logoutSuccess() {
      this.status.loggedIn = false;
      this.user = null;
    },
    registerSuccess() {
      this.status.loggedIn = false;
    },
    registerFailure() {
      this.status.loggedIn = false;
    },
  },
});

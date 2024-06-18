import { ACTION_TYPES } from '../types/index';
import * as localStorage from '../../../utils/helper/localstorage';

function getDefaultState() {
  return {
    authToken: localStorage.getLocalStorageItem('authToken') || undefined,
    isAuthenticated:
      localStorage.getLocalStorageItem('isAuthenticated') === 'true' || false,
    username: localStorage.getLocalStorageItem('username') || '',
    roles: localStorage.getLocalStorageItem('roles') || '',
    isLoading: false,
  };
}

function addAuthDetailsToLocalStorage(authToken, username, roles) {
  localStorage.setLocalStorageItem('authToken', authToken);
  localStorage.setLocalStorageItem('isAuthenticated', !!authToken);
  localStorage.setLocalStorageItem('username', username);
  localStorage.setLocalStorageItem('roles', roles);
}
const session = (state = getDefaultState(), action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTH_LOGIN_FULFILLED: {
      let authToken = action.payload?.authToken;
      let username = action.payload?.username;
      let roles = action.payload?.roles;
      addAuthDetailsToLocalStorage(authToken, username, roles);

      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: undefined,
        authToken: authToken,
        username: username,
        roles: roles,
      };
    }
    case ACTION_TYPES.AUTH_LOGIN_REJECTED: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: { message: 'Authentication Failed', showError: true },
        authToken: '',
        username: '',
        roles: '',
      };
    }

    case ACTION_TYPES.AUTH_LOGOUT_FULFILLED: {
      localStorage.clearAll();
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        // authToken: '',
        error: undefined,
        username: '',
        roles: '',
      };
    }

    case ACTION_TYPES.SHOW_LOADER: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ACTION_TYPES.HIDE_LOADER: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default session;

import { ACTION_TYPES } from '../types';

export const login = (authToken, username, roles) => ({
  type: ACTION_TYPES.AUTH_LOGIN_FULFILLED,
  payload: { authToken, username, roles },
});

export const logout = () => ({
  type: ACTION_TYPES.AUTH_LOGOUT_FULFILLED,
});

export const showLoader = () => ({
  type: ACTION_TYPES.SHOW_LOADER,
});

export const hideLoader = () => ({
  type: ACTION_TYPES.HIDE_LOADER,
});

export const toastMessage = (message, type) => ({
  type: ACTION_TYPES.TOAST_MESSAGE,
  payload: { message: message, type: type },
});

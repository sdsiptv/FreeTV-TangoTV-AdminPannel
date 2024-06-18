export const api_url = 'http://192.168.0.5:3001';
export const blue = '#0088FE';
export const green = '#00C49F';
export const orange = '#FFBB28';
export const yellow = '#FF8042';
export const grey = '#292828';
export const light_grey = '#edf1f2';
export const red = '#f44336';

export const TOKEN_KEY = 'auth_token';

export const base_url = `http://192.168.0.5:3001`;
export const port = `8080`;
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};

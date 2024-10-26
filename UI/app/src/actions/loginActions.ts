import { CancelToken } from 'axios';
import { axiosPrivate } from '../axios/axios';

type LoginResponse = {
  id: string;
  alias: string;
  token: string;
};

export const _refreshToken = async (cancelToken: CancelToken) => {
  try {
    const response = await axiosPrivate.get<LoginResponse>('/auth/refresh', {
      cancelToken: cancelToken,
    });
    return response.data;
  } catch (error: any) {
    console.log('Request error', error.message);
  }
};

export const _logout = async (cancelToken: CancelToken) => {
  return axiosPrivate.get('/auth/logout', { cancelToken: cancelToken });
};

export const _login = async (
  username: string,
  password: string,
  cancelToken: CancelToken
) => {
  try {
    const res = await axiosPrivate.post<LoginResponse>(
      '/auth/login',
      JSON.stringify({ username, password }),
      { cancelToken: cancelToken }
    );
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const _register = async (
  username: string,
  password: string,
  alias: string,
  cancelToken: CancelToken
) => {
  try {
    const res = await axiosPrivate.post<LoginResponse>(
      '/auth/register',
      JSON.stringify({ username, password, alias }),
      { cancelToken: cancelToken }
    );
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

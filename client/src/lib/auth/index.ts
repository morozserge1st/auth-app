import Cookie from 'js-cookie';
import { LoginRes } from '../types/api';
import { LoginUser, User } from '../types/User';
import { fetchGET, fetchPOST } from './api';

type Res<T> = {
  data: T
}

type LogoutData = {
  token: string;
}

export const fetchMe = async (token: string): Promise<User> => {
  const res = await fetchGET<Res<User>>('/users/me', token);
  return res.data;
};

export const fetchSingUp = async (data: User): Promise<User> => {
  const res = await fetchPOST<Res<User>, User>('/auth/registration/', data);
  const user = res.data;
  return user;
};

export const fetchLogin = async (data: LoginUser): Promise<User> => {
  const res = await fetchPOST<LoginRes, LoginUser>('/auth/login/', data);
  Cookie.set('token', res.token);

  const user = await fetchMe(res.token);
  return user;
};

export const fetchLogout = async () => {
  const token = Cookie.get('token');
  Cookie.remove('token');

  await fetchPOST<LoginRes, LogoutData>('/auth/logout/', {
    token,
  });
};

export const fetchInit = async () => {
  const token = Cookie.get('token');
  if (!token) {
    return null;
  }

  const user = await fetchMe(token);
  return user;
};
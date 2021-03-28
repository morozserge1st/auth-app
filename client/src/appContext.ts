import { createContext } from 'react';
import { User } from './lib/types/User';

export type AppContext = {
  isAuth: boolean;
  user?: User;
  setUser?: (userInfo: User | null) => void;
}

export const appContext = createContext<AppContext>({
  isAuth: false,
  user: null,
  setUser: () => null,
});

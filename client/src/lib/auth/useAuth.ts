import { useContext } from 'react';
import { AppContext, appContext } from '../../appContext';

type UseAuth = Pick<AppContext, 'isAuth' | 'user' | 'setUser'>;

export const useAuth = (): UseAuth => {
  const { isAuth, user, setUser } = useContext(appContext);

  return { isAuth, user, setUser };
};

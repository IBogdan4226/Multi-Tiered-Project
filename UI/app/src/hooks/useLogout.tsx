import { _logout } from '../actions/loginActions';
import { useAuthContext } from '../context/AuthProviderContext';
import { useCancelToken } from './useCancelToken';

export const useLogout = () => {
  const { setAuth } = useAuthContext();
  const cancelToken = useCancelToken();

  const logout = async () => {
    try {
      _logout(cancelToken);
      setAuth(null);
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

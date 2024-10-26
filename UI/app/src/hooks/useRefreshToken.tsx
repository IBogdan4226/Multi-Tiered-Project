import { _refreshToken } from '../actions/loginActions';
import { useAuthContext } from '../context/AuthProviderContext';
import { useCancelToken } from './useCancelToken';

export const useRefreshToken = () => {
  const { setAuth } = useAuthContext();
  const cancelToken = useCancelToken();

  const refresh = async () => {
    const res = await _refreshToken(cancelToken);

    if (res) {
      setAuth({
        userId: res.id,
        userAlias: res.alias,
        jwtToken: res.token,
      });

      return res.token;
    }
  };

  return refresh;
};

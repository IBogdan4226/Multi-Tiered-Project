import { useAuthContext } from 'app/src/context/AuthProviderContext';
import { useRefreshToken } from 'app/src/hooks/useRefreshToken';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuthContext();

  useEffect(() => {
    if (!auth?.jwtToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyRefreshToken = async () => {
    try {
      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!persist && <Outlet />}
      {persist && isLoading && <p>Loading...</p>}
      {persist && !isLoading && <Outlet />}
    </>
  );
};

export default PersistLogin;

import { useAuthContext } from 'app/src/context/AuthProviderContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireNoAuth = () => {
  const { auth } = useAuthContext();

  return (
    <>
      {!auth?.jwtToken && <Outlet />}
      {auth?.jwtToken && <Navigate to="/tests" replace />}
    </>
  );
};

export const RequireAuth = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  console.log(auth)
  return auth?.jwtToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

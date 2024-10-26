import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { _login } from 'app/src/actions/loginActions';
import { useAuthContext } from 'app/src/context/AuthProviderContext';
import { useCancelToken } from 'app/src/hooks/useCancelToken';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { checkIsInvalid } from './LoginPage.utils';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, persist, setPersist } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const cancelToken = useCancelToken();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const isInvalid = checkIsInvalid(username, password);
    if (isInvalid) {
      setError(isInvalid);
      return;
    }
    setIsLoading(true);
    try {
      const response = await _login(username, password, cancelToken);
      const { token: jwtToken, id: userId, alias: userAlias } = response;
      
      setAuth({ userId, userAlias, jwtToken });
      navigate(from, { replace: true });
    } catch (err: any) {
      console.log(err);
      setError(!err?.response ? 'No Server Response' : 'Login Failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('remember', String(persist));
  }, [persist]);

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="Username"
          id="username"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          error={Boolean(error)}
          helperText={error}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={persist}
              onChange={(e) => setPersist(e.target.checked)}
              color="primary"
              id="remember"
            />
          }
          label="Remember me"
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginY: 2,
          }}
        >
          <Button
            disabled={isLoading}
            variant="contained"
            color="primary"
            type="submit"
            endIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            Login
          </Button>
          <NavLink to="/../register" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary">
              Need an account? Sign up.
            </Typography>
          </NavLink>
        </Box>
      </form>
    </Box>
  );
};

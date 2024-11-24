import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { _register } from 'app/src/actions/loginActions';
import { useAuthContext } from 'app/src/context/AuthProviderContext';
import { useCancelToken } from 'app/src/hooks/useCancelToken';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { checkIsInvalid } from './RegisterPage.utils';

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, persist } = useAuthContext();
  const navigate = useNavigate();
  const cancelToken = useCancelToken();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alias, setAlias] = useState('');
  const [confirmPwd, setConfirmPwd] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const isInvalid = checkIsInvalid(username, password, alias, confirmPwd);
    if (isInvalid) {
      setError(isInvalid);
      return;
    }
    setIsLoading(true);
    try {
      const response = await _register(username, password, alias, cancelToken);
      const { token: jwtToken, id: userId, alias: userAlias } = response;
      setAuth({ userId, userAlias, jwtToken });
      navigate('/');
    } catch (err: any) {
      if (!err?.response) {
        setError('No Server Response');
      } else if (err.response?.status === 409) {
        setError('Username Taken');
      } else {
        setError('Registration Failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('remember', String(persist));
  }, [persist]);

  return (
    <Box
      sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}
      data-testid="register-page"
    >
      <Typography variant="h4" align="center" gutterBottom data-testid="register-title">
        Register
      </Typography>
      <form onSubmit={handleSubmit} data-testid="register-form">
        <TextField
          fullWidth
          variant="outlined"
          label="Username"
          id="username"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          data-testid="username-input"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Alias"
          id="alias"
          value={alias}
          autoComplete="off"
          onChange={(e) => setAlias(e.target.value)}
          margin="normal"
          data-testid="alias-input"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          id="password"
          type="password"
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          data-testid="password-input"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Password Confirmation"
          id="password-confirm"
          type="password"
          value={confirmPwd}
          autoComplete="off"
          onChange={(e) => setConfirmPwd(e.target.value)}
          margin="normal"
          error={Boolean(error)}
          helperText={error}
          data-testid="password-confirm-input"
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
            data-testid="register-button"
            endIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            Register
          </Button>
          <NavLink to="/../login" style={{ textDecoration: 'none' }} data-testid="login-link">
            <Typography variant="body2" color="primary">
              Have an account? Log in.
            </Typography>
          </NavLink>
        </Box>
      </form>
    </Box>
  );
};
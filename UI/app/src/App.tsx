import { Box } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import PersistLogin from './components/PersistLogin/PersistLogin';
import {
  RequireAuth,
  RequireNoAuth,
} from './components/RequireAuth/RequireAuth';
import { LoginPage } from './components/LoginPage/LoginPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { Tests } from './components/Tests/Tests';

function App() {
  return (
    <Box width="100%" height="100%">
      <Routes>
        <Route path="">
          <Route element={<PersistLogin />}>
            <Route element={<RequireNoAuth />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Navigate to="/tests" />} />
            <Route path="/tests" element={<Tests />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;

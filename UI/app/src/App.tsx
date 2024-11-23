import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './components/LoginPage/LoginPage';
import { Navbar } from './components/NavBar/NavBar';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import PersistLogin from './components/PersistLogin/PersistLogin';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import {
  RequireAuth,
  RequireNoAuth,
} from './components/RequireAuth/RequireAuth';
import { Students } from './components/Students/Students';
import CreateTestPage from './components/Tests/CreateTest/CreateTest';
import TestDetails from './components/Tests/TestDetails/TestDetails';
import { Tests } from './components/Tests/Tests';
import UpdateTestPage from './components/Tests/UpdateTest/UpdateTest';
import { TestStudentDetails } from './components/TestStudentDetails/TestStudentDetails';

export enum AppRoute {
  LOGIN = '/login',
  REGISTER = '/register',
  TESTS = '/tests',
  CREATETEST = '/create-test',
  UPDATETEST = '/update-test',
  STUDENTS = '/students',
  TESTDETAILS = '/test-details',
  TESTSTUDENTDETAILS = '/test-student-details',
}

function App() {
  return (
    <Box width="100%" height="100%">
      <Navbar />
      <Routes>
        <Route path="">
          <Route element={<PersistLogin />}>
            <Route element={<RequireNoAuth />}>
              <Route path={AppRoute.LOGIN} element={<LoginPage />} />
              <Route path={AppRoute.REGISTER} element={<RegisterPage />} />
            </Route>
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Navigate to={AppRoute.TESTS} />} />
            <Route path={AppRoute.TESTS} element={<Tests />} />
            <Route path={AppRoute.CREATETEST} element={<CreateTestPage />} />
            <Route
              path={`${AppRoute.TESTDETAILS}/:testId`}
              element={<TestDetails />}
            />
            <Route
              path={`${AppRoute.UPDATETEST}/:testId`}
              element={<UpdateTestPage />}
            />
            <Route
              path={`${AppRoute.TESTSTUDENTDETAILS}/:testStudentId`}
              element={<TestStudentDetails />}
            />
            <Route path={`${AppRoute.STUDENTS}`} element={<Students />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </Box>
  );
}

export default App;

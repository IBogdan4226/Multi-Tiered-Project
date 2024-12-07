import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { AppRoute } from 'app/src/App';
import { useAuthContext } from 'app/src/context/AuthProviderContext';
import { useLogout } from 'app/src/hooks/useLogout';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

enum Tabs {
  Tests = 'tests',
  CreateTests = 'createTests',
  Students = 'students',
}

export const Navbar = () => {
  const [currentTab, setCurrentTab] = useState<Tabs | null>(Tabs.Tests);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth } = useAuthContext();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<any>(null);

  const signOut = async () => {
    await logout();
    navigate(AppRoute.LOGIN);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === AppRoute.TESTS) setCurrentTab(Tabs.Tests);
    else if (currentPath === AppRoute.CREATETEST)
      setCurrentTab(Tabs.CreateTests);
    else if (currentPath.includes(AppRoute.UPDATETEST))
      setCurrentTab(Tabs.Tests);
    else if (currentPath.includes(AppRoute.TESTDETAILS))
      setCurrentTab(Tabs.Tests);
    else if (currentPath === AppRoute.STUDENTS) setCurrentTab(Tabs.Students);
    else if (currentPath === AppRoute.TESTSTUDENTDETAILS)
      setCurrentTab(Tabs.Students);
    else setCurrentTab(null);
  }, [location.pathname]);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: 'linear-gradient(to right, #80d0c7, #13547a)',
        borderBottom: '1px solid grey',
      }}
      data-testid="navbar"
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            component={NavLink}
            to={AppRoute.TESTS}
            color="inherit"
            sx={{
              fontWeight: currentTab === Tabs.Tests ? 'bold' : 'normal',
              color: currentTab === Tabs.Tests ? 'black' : 'inherit',
            }}
            data-testid="navbar-tests-button"
          >
            See Tests
          </Button>
          <Button
            component={NavLink}
            to={AppRoute.CREATETEST}
            color="inherit"
            sx={{
              fontWeight: currentTab === Tabs.CreateTests ? 'bold' : 'normal',
              color: currentTab === Tabs.CreateTests ? 'black' : 'inherit',
            }}
            data-testid="navbar-create-tests-button"
          >
            Create Test
          </Button>
          <Button
            component={NavLink}
            to={AppRoute.STUDENTS}
            color="inherit"
            sx={{
              fontWeight: currentTab === Tabs.Students ? 'bold' : 'normal',
              color: currentTab === Tabs.Students ? 'black' : 'inherit',
            }}
            data-testid="navbar-students-button"
          >
            Students
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            ref={ref}
            data-testid="navbar-user-icon-button"
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={ref.current}
            open={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            sx={{
              '& .MuiMenu-paper': {
                backgroundColor: '#13547a',
                color: 'white',
                padding: 1,
                boxShadow: 3,
              },
            }}
            data-testid="navbar-dropdown-menu"
          >
            {auth?.jwtToken ? (
              <MenuItem
                onClick={() => {
                  setIsDropdownOpen(false);
                  signOut();
                }}
                data-testid="navbar-signout-item"
              >
                Sign Out
              </MenuItem>
            ) : (
              [
                <MenuItem
                  key="login"
                  onClick={() => {
                    setCurrentTab(null);
                    setIsDropdownOpen(false);
                    navigate(AppRoute.LOGIN);
                  }}
                >
                  Login
                </MenuItem>,
                <MenuItem
                  key="register"
                  onClick={() => {
                    setCurrentTab(null);
                    setIsDropdownOpen(false);
                    navigate(AppRoute.REGISTER);
                  }}
                  data-testid="navbar-register-item"
                >
                  Register
                </MenuItem>,
              ]
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
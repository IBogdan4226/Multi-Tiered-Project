import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

jest.mock('app/src/context/AuthProviderContext', () => ({
  useAuthContext: () => ({
    auth: {
      jwtToken: 'fake-jwt-token',
    },
  }),
}));

jest.mock('app/src/hooks/useLogout', () => ({
  useLogout: () => jest.fn(),
}));

describe('Navbar', () => {
  it('renders the navbar with all buttons', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByTestId('navbar'))
    expect(screen.getByTestId('navbar-tests-button'))
    expect(
      screen.getByTestId('navbar-create-tests-button')
    )
    expect(screen.getByTestId('navbar-students-button'))
    expect(screen.getByTestId('navbar-user-icon-button'))
  });

  it('displays sign out option when authenticated', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const userIconButton = screen.getByTestId('navbar-user-icon-button');
    await userEvent.click(userIconButton);

    expect(screen.getByTestId('navbar-signout-item'))
  });
});

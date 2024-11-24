import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { checkIsInvalid } from './LoginPage.utils';

jest.mock('app/src/context/AuthProviderContext', () => ({
  useAuthContext: () => ({
    setAuth: jest.fn(),
    persist: false,
    setPersist: jest.fn(),
  }),
}));

jest.mock('app/src/hooks/useCancelToken', () => ({
  useCancelToken: () => jest.fn(),
}));

describe('LoginPage', () => {
  it('renders the login page with all fields', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.getByTestId('login-title')).toHaveTextContent('Login');
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('remember-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByTestId('register-link')).toBeInTheDocument();
  });

  it('displays an error when inputs are invalid', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const loginButton = screen.getByTestId('login-button');
    await userEvent.click(loginButton);

    expect(
      screen.getByText('Credentials must have a length greater than 3.')
    ).toBeInTheDocument();
  });

  it('submits the form with valid inputs', async () => {
    const mockLoginFN = jest.spyOn(require('app/src/actions/loginActions'), '_login')
      .mockResolvedValueOnce({
        token: 'fake-token',
        id: '123',
        alias: 'testuser',
      });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usernameInput = screen
      .getByTestId('username-input')
      .querySelector('input') as HTMLInputElement;
    const passwordInput = screen
      .getByTestId('password-input')
      .querySelector('input') as HTMLInputElement;
    const loginButton = screen.getByTestId('login-button');

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    expect(mockLoginFN).toHaveBeenCalledWith(
      'testuser',
      'password123',
      expect.any(Function)
    );
  });

  it('returns an error message if the username or password length is less than or equal to 3', () => {
    expect(checkIsInvalid('abc', 'password123')).toBe(
      'Credentials must have a length greater than 3.'
    );
    expect(checkIsInvalid('user', 'abc')).toBe(
      'Credentials must have a length greater than 3.'
    );
    expect(checkIsInvalid('abc', 'abc')).toBe(
      'Credentials must have a length greater than 3.'
    );
  });

  it('returns an error message if the username or password contains forbidden characters', () => {
    const forbiddenCharacters = [';', "'", '"', '<', '>', '&', '\\', '/'];
    forbiddenCharacters.forEach((char) => {
      expect(checkIsInvalid(`user${char}`, 'password123')).toBe(
        'Username and password contain forbidden characters.'
      );
      expect(checkIsInvalid('username', `pass${char}word`)).toBe(
        'Username and password contain forbidden characters.'
      );
    });
  });

  it('returns false if the username and password are valid', () => {
    expect(checkIsInvalid('validUser', 'validPass')).toBe(false);
    expect(checkIsInvalid('anotherUser', 'anotherPass')).toBe(false);
  });
});
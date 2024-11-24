import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RegisterPage } from './RegisterPage';
import { checkIsInvalid } from './RegisterPage.utils';

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

describe('RegisterPage', () => {
  it('renders all fields and elements correctly', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('register-page')).toBeInTheDocument();
    expect(screen.getByTestId('register-title')).toHaveTextContent('Register');
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('alias-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-confirm-input')).toBeInTheDocument();
    expect(screen.getByTestId('register-button')).toBeInTheDocument();
    expect(screen.getByTestId('login-link')).toBeInTheDocument();
  });

  it('shows an error for invalid input', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const registerButton = screen.getByTestId('register-button');
    await userEvent.click(registerButton);

    expect(
      screen.getByText(
        'Credentials must have a length greater than 3 and less than 20.'
      )
    ).toBeInTheDocument();
  });

  it('submits valid inputs', async () => {
    const mockRegisterFN = jest
      .spyOn(require('app/src/actions/loginActions'), '_register')
      .mockResolvedValueOnce({
        token: 'fake-token',
        id: '123',
        alias: 'testAlias',
      });

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const usernameInput = screen
      .getByTestId('username-input')
      .querySelector('input') as HTMLInputElement;
    const aliasInput = screen
      .getByTestId('alias-input')
      .querySelector('input') as HTMLInputElement;
    const passwordInput = screen
      .getByTestId('password-input')
      .querySelector('input') as HTMLInputElement;
    const passwordConfirmInput = screen
      .getByTestId('password-confirm-input')
      .querySelector('input') as HTMLInputElement;

    await userEvent.type(usernameInput, 'validUser');
    await userEvent.type(aliasInput, 'validAlias');
    await userEvent.type(passwordInput, 'validPass');
    await userEvent.type(passwordConfirmInput, 'validPass');

    const registerButton = screen.getByTestId('register-button');
    await userEvent.click(registerButton);

    expect(mockRegisterFN).toHaveBeenCalledWith(
      'validUser',
      'validPass',
      'validAlias',
      expect.any(Function)
    );
  });
  it('should return error for credentials with length less than or equal to 3 or greater than or equal to 20', () => {
    expect(checkIsInvalid('ab', 'password', 'alias', 'password')).toBe(
      'Credentials must have a length greater than 3 and less than 20.'
    );
    expect(checkIsInvalid('user', 'pwd', 'alias', 'pwd')).toBe(
      'Credentials must have a length greater than 3 and less than 20.'
    );

    expect(
      checkIsInvalid('thisIsAVeryLongUsername', 'password', 'alias', 'password')
    ).toBe('Credentials must have a length greater than 3 and less than 20.');
  });

  it('should return error for forbidden characters in username, password, or alias', () => {
    expect(checkIsInvalid('us;er', 'password', 'alias', 'password')).toBe(
      'Username or password contains forbidden characters.'
    );
  });

  it('should return error for password mismatch', () => {
    expect(
      checkIsInvalid('user', 'password', 'alias', 'differentPassword')
    ).toBe("Password doesn't match.");
  });

  it('should return false for valid inputs', () => {
    expect(
      checkIsInvalid(
        'validUser',
        'validPassword',
        'validAlias',
        'validPassword'
      )
    ).toBe(false);
  });
});

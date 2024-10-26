export const checkIsInvalid = (
  userName: string,
  password: string,
  alias: string,
  confirmPassword: string
) => {
  if (
    userName.length <= 3 ||
    password.length <= 3 ||
    alias.length <= 3 ||
    userName.length >= 20 ||
    password.length >= 20 ||
    alias.length >= 20
  ) {
    return 'Credentials must have a length greater than 3 and less than 20.';
  }

  if (
    /[;'"<>&\\\/]/.test(userName) ||
    /[;'"<>&\\\/]/.test(password) ||
    /[;'"<>&\\\/]/.test(alias)
  ) {
    return 'Username or password contains forbidden characters.';
  }
  if (password !== confirmPassword) {
    return "Password doesn't match.";
  }

  return false;
};

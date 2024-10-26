export const checkIsInvalid = (userName: string, password: string) => {
  if (userName.length <= 3 || password.length <= 3) {
    return 'Credentials must have a length greater than 3.';
  }

  if (/[;'"<>&\\\/]/.test(userName) || /[;'"<>&\\\/]/.test(password)) {
    return 'Username and password contain forbidden characters.';
  }

  return false;
};

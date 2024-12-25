export const passwordValidation = {
  minLength: 8,
  maxLength: 24,
  checkMinLength: (password: string) => password.length >= passwordValidation.minLength,
  checkMaxLength: (password: string) => password.length <= passwordValidation.maxLength,
};

export const emailValidation = {
  regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  checkRegexp: (email: string) => emailValidation.regex.test(email),
};

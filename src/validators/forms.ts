export const validateUsername = (value: string): string | undefined => {
  const regex = /^[a-zA-Z0-9_-]+$/;
  if (!value) return 'Username is required';
  if (!regex.test(value)) return 'Username can only contain Latin letters, numbers, underscores, and hyphens';
  if (value.length > 20 || value.length < 3) return 'Username must be 3-20 characters long';
  return undefined
}

export const validateEmail = (value: string): string | undefined => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  ;
  if (!value) return 'Email is required';
  if (!regex.test(value)) return 'Invalid email format';
  return undefined;
}

export const validatePassword = (value: string): string | undefined => {
  const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
  if (!value) return 'Password is required';
  if (!regex.test(value)) return 'Password can only contain Latin letters, numbers, and symbols';
  if (value.length < 8) return 'Password must be at least 8 characters long';
  return undefined;
}

export const validateConfirmPassword = (value: string, password: string): string | undefined => {
  if (!value) return 'Confirm password is required';
  if (value !== password) return 'Passwords do not match';
  return undefined;
}
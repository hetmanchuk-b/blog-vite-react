import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {resetPassword} from "../../services/api.ts";

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      toast.error("Invalid or missing reset token");
      navigate("/forgot-password");
    } else {
      setToken(tokenFromUrl);
    }
  }, [searchParams, navigate]);

  const validatePassword = (value: string): string | undefined => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    if (!value) return 'Password is required';
    if (!regex.test(value)) return 'Password can only contain Latin letters, numbers, and symbols';
    if (value.length < 8) return 'Password must be at least 8 characters long';
    return undefined;
  }

  const validateConfirmPassword = (value: string, password: string): string | undefined => {
    if (!value) return 'Confirm password is required';
    if (value !== password) return 'Passwords do not match';
    return undefined;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    if (passwordError || confirmPasswordError) {
      setErrors({
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      toast.error('Please fix the errors in the form');
      return
    }

    if (!token) {
      toast.error('Invalid reset token');
      return;
    }

    try {
      const newPassword = password;
      const response = await resetPassword({token, newPassword});
      toast.success(response.message);
      setErrors({});
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to reset password');
    }
  }

  return (
    <div className="mx-auto max-w-md p-4 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({...prev, password: validatePassword(e.target.value)}));
            }}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({
                ...prev,
                confirmPassword: validateConfirmPassword(e.target.value, password),
              }));
            }}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          className="secondary-button"
        >
          Reset Password
        </button>
      </form>
    </div>
  )

}
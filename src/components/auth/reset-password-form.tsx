import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {resetPassword, verifyResetToken} from "../../services/api.ts";
import {useAuth} from "../../hooks/use-auth.ts";
import {validateConfirmPassword, validatePassword} from "../../validators/forms.ts";
import {LoaderSpinner} from "../loader-spinner.tsx";

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {login} = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      toast.error("Invalid or missing reset token");
      navigate("/forgot-password");
      return
    }

    const validateToken = async () => {
      try {
        await verifyResetToken(tokenFromUrl);
        setToken(tokenFromUrl);
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Invalid or expired reset token.');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    }

    validateToken();
  }, [searchParams, navigate]);

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
      login(response.token);
      toast.success('Password reset successfully!');
      setErrors({});
      navigate('/');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to reset password');
    }
  }

  if (isLoading || !token) {
    return (
      <div className="p-4">
        <LoaderSpinner isVisible />
      </div>
    )
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
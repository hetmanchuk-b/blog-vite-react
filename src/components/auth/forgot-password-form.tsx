import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {toast} from "sonner";
import {forgotPassword} from "../../services/api.ts";

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState<{email?: string}>({});

  const validateEmail = (value: string): string | undefined => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  ;
    if (!value) return 'Email is required';
    if (!regex.test(value)) return 'Invalid email format';
    return undefined;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setFormErrors({email: emailError});
      return;
    }

    try {
      await forgotPassword({email});
      toast.success('Password reset link has been sent to your email');
      setFormErrors({});
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to send reset link');
    }
  }
  return (
    <div className="container mx-auto max-w-md p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormErrors((prev) => ({...prev, email: validateEmail(e.target.value)}));
            }}
          className={`mt-1 block w-full px-3 py-2 border ${
          formErrors.email ? 'border-red-500' : 'border-gray-500300'
        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          required
          />
          {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
        </div>
        <button
          type="submit"
          className="secondary-button"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};
import {useState} from "react";
import {toast} from "sonner";
import {register} from "../../services/api.ts";
import {useAuth} from "../../hooks/use-auth.ts";

interface Props {
  onSuccess: () => void;
}

export const RegisterForm = ({onSuccess}: Props) => {
  const {login} = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const validateUsername = (value: string): string | undefined => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    if (!value) return 'Username is required';
    if (!regex.test(value)) return 'Username can only contain Latin letters, numbers, underscores, and hyphens';
    return undefined
  }

  const validateEmail = (value: string): string | undefined => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  ;
    if (!value) return 'Email is required';
    if (!regex.test(value)) return 'Invalid email format';
    return undefined;
  }

  const validatePassword = (value: string): string | undefined => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    if (!value) return 'Password is required';
    if (!regex.test(value)) return 'Password can only contain Latin letters, numbers, and symbols';
    if (value.length < 8) return 'Password must be at least 8 characters long';
    return undefined;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (usernameError || emailError || passwordError) {
      setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
      });
      toast.error('Please fix the errors in the form');
      return
    }

    try {
      const response = await register({username, email, password});
      login(response.token);
      toast.success('Registration successful!');
      setErrors({});
      setUsername('');
      setEmail('');
      setPassword('');
      onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registration failed');
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto w-full">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-400">
          User name
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setErrors((prev) => ({...prev, username: validateUsername(e.target.value)}))
          }}
          className={`${errors.username ? 'border-red-500' : 'border-gray-300'} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          required
        />
        {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
      </div>
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
            setErrors((prev) => ({...prev, email: validateEmail(e.target.value)}));
          }}
          className={`${errors.email ? 'border-red-500' : 'border-gray-300'} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          required
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-400">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrors((prev) => ({...prev, password: validatePassword(password)}));
          }}
          className={`${errors.password ? 'border-red-500' : 'border-gray-300'} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          required
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>
      <button
        type="submit"
        className="secondary-button"
      >
        Register
      </button>
    </form>
  );
};
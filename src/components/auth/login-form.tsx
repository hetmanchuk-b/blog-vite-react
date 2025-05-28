import {useAuth} from "../../hooks/use-auth.ts";
import React, {useState} from "react";
import {toast} from "sonner";
import {login} from "../../services/api.ts";
import {Link} from "react-router-dom";

interface Props {
  onSuccess: () => void;
}

export const LoginForm = ({onSuccess}: Props) => {
  const {login: authLogin} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({username, password});
      authLogin(response.token);
      toast.success('Login successful!');
      onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto w-full">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-400">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-400">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="secondary-button"
      >
        Login
      </button>
      <p className="text-sm text-center">
        <Link to="/forgot-password" className="primary-link">
          Forgot password?
        </Link>
      </p>
    </form>
  );
};
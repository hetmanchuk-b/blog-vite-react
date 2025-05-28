import {LoginForm} from "../components/auth/login-form.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ClientLayout} from "../components/layout/client-layout.tsx";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <ClientLayout>
      <h1 className="text-2xl text-center font-bold">Sign In to Blog Website</h1>
      <p className="text-gray-400 text-center mt-1 mb-4">
        Don't have an account? <Link to="/register" className="primary-link">Sign Up Now</Link>
      </p>
      <LoginForm onSuccess={() => navigate('/')} />
    </ClientLayout>
  );
};
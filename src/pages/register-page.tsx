import {RegisterForm} from "../components/auth/register-form.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ClientLayout} from "../components/layout/client-layout.tsx";

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <ClientLayout>
      <h1 className="text-2xl text-center font-bold">Sign Up to Blog Website</h1>
      <p className="text-gray-400 text-center mt-1 mb-4">
        Already have an account? <Link to="/login" className="primary-link">Sign In</Link>
      </p>
      <RegisterForm onSuccess={() => navigate('/')}/>
    </ClientLayout>
  );
};
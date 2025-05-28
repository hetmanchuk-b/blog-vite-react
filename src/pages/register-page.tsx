import {RegisterForm} from "../components/auth/register-form.tsx";
import {Link, useNavigate} from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-4">
      <h1 className="text-2xl text-center font-bold">Sign Up to Blog Website</h1>
      <p className="text-gray-400 text-center mt-1 mb-4">
        Already have an account? <Link to="/login" className="primary-link">Sign In</Link>
      </p>
      <RegisterForm onSuccess={() => navigate('/')}/>
    </div>
  );
};
import {LoginForm} from "../components/auth/login-form.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ClientLayout} from "../components/layout/client-layout.tsx";
import {PageTitle} from "../components/layout/page-title.tsx";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <ClientLayout>
      <PageTitle
        title={'Sign In to Blog Website'}
        subtitle={<>Do not have an account? <Link to="/register" className="primary-link">Sign Up Now</Link></>}
      />
      <LoginForm onSuccess={() => navigate('/')} />
    </ClientLayout>
  );
};
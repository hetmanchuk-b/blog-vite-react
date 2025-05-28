import {RegisterForm} from "../components/auth/register-form.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ClientLayout} from "../components/layout/client-layout.tsx";
import {PageTitle} from "../components/layout/page-title.tsx";

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <ClientLayout>
      <PageTitle
        title={'Sign Up to Blog Website'}
        subtitle={<>Already have an account? <Link to="/login" className="primary-link">Sign In</Link></>}
      />
      <RegisterForm onSuccess={() => navigate('/')}/>
    </ClientLayout>
  );
};
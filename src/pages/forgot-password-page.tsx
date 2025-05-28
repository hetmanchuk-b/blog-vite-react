import {ClientLayout} from "../components/layout/client-layout.tsx";
import {ForgotPasswordForm} from "../components/auth/forgot-password-form.tsx";
import {PageTitle} from "../components/layout/page-title.tsx";

export const ForgotPasswordPage = () => {
  return (
    <ClientLayout>
      <PageTitle
        title={'Forgot password?'}
        subtitle={'Leave your email and we will send you an email to reset your password'}
      />
      <ForgotPasswordForm />
    </ClientLayout>
  );
};
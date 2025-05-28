import {ClientLayout} from "../components/layout/client-layout.tsx";
import {ResetPasswordForm} from "../components/auth/reset-password-form.tsx";
import {PageTitle} from "../components/layout/page-title.tsx";

export const ResetPasswordPage = () => {
  return (
    <ClientLayout>
      <PageTitle
        title={'Forgot password?'}
        subtitle={'Leave your email and we will send you an email to reset your password'}
      />

      <ResetPasswordForm />
    </ClientLayout>
  );
};
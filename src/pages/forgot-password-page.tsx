import {ClientLayout} from "../components/layout/client-layout.tsx";
import {ForgotPasswordForm} from "../components/auth/forgot-password-form.tsx";

export const ForgotPasswordPage = () => {
  return (
    <ClientLayout>
      <h1 className="text-2xl text-center font-bold">Forgot password?</h1>
      <p className="text-gray-400 text-center mt-1 mb-4">
        Leave your email and we will send you an email to reset your password
      </p>
      <ForgotPasswordForm />
    </ClientLayout>
  );
};
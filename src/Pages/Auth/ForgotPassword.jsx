import AuthLayout from "../../Components/Auth/AuthLayout/AuthLayout";
import ForgotPasswordForm from "../../Components/Auth/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email and we will send you a password reset link."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
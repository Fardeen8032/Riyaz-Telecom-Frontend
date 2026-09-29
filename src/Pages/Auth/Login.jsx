import AuthLayout from "../../Components/Auth/AuthLayout/AuthLayout";
import LoginForm from "../../Components/Auth/LoginForm/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      description="Login to access your account and continue shopping."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
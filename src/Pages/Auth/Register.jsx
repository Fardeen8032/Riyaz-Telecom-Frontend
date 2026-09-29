import AuthLayout from "../../Components/Auth/AuthLayout/AuthLayout";
import RegisterForm from "../../Components/Auth/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <AuthLayout
      title="Create Your Account"
      description="Register to start shopping and manage your account."
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
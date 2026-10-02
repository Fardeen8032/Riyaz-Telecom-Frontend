import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { loginSchema } from "../../../Validation/authSchema";
import { loginUser } from "../../../Utils/api/Api";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onBlur",
  });

  const onSubmit = async (formData) => {
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await loginUser(payload);

      console.log("Login successful:", response);
      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      toast.success(response.message);

      const redirectTo = location.state?.from || "/";

      navigate(redirectTo, {
        replace: true,
      });
    } catch (error) {
      const responseData = error.response?.data;

      if (responseData?.details?.length) {
        responseData.details.forEach((item) => {
          if (item.field) {
            setError(item.field, {
              type: "server",
              message: item.message,
            });
          }
        });

        toast.error(responseData.message);

        return;
      }

      if (responseData?.message) {
        toast.error(responseData.message);
        return;
      }

      toast.error(
        "Something went wrong. Please check your connection and try again."
      );
    }
  };

  const handleGoogleLogin = () => {
    // Google OAuth will be implemented later.
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      {/* Email */}
      <div>
        <label
          htmlFor="login-email"
          className="text-sm font-medium text-text"
        >
          Email
        </label>

        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          {...register("email")}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="login-password"
            className="text-sm font-medium text-text"
          >
            Password
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          {...register("password")}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Login button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-secondary transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-border" />

        <span className="px-3 text-xs text-text-secondary">
          OR
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-text transition-colors hover:bg-background-secondary"
      >
        <span className="text-base font-bold">G</span>

        Continue with Google
      </button>

      {/* Register */}
      <p className="text-center text-sm text-text-secondary">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-primary hover:opacity-80"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
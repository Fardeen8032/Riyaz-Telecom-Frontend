import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { loginSchema } from "../../../Validation/authSchema";
import {loginUser,googleLogin} from "../../../Utils/api/Api";
import { signInWithGoogle } from "../../../service/googleAuthService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../Redux/auth/authSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

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

  const redirectAfterLogin = () => {
    const redirectTo = location.state?.from || "/";

    navigate(redirectTo, {
      replace: true,
    });
  };

  const onSubmit = async (formData) => {
    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      const { accessToken, user } = response.data;

      if (!accessToken || !user) {
        throw new Error("Login response is missing user or access token.");
      }

      dispatch(setCredentials({ accessToken, user }));

      toast.success(response.message);
      redirectAfterLogin();
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

      toast.error(
        responseData?.message ||
          "Something went wrong. Please check your connection and try again."
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleSubmitting(true);

      // Step 1: Sign in with Google through Firebase.
      const { idToken } = await signInWithGoogle();

      // Step 2: Send the Firebase ID token to Express.
      const response = await googleLogin(idToken);

      const { accessToken, user } = response.data;

      if (!accessToken || !user) {
        throw new Error(
          "Google login response is missing user or access token."
        );
      }

      dispatch(setCredentials({ accessToken, user }));

      // Step 3: Store the application JWT.
      localStorage.setItem("accessToken", response.data.accessToken);

      toast.success(response.message || "Google sign-in successful.");

      // Step 4: Redirect after successful login.
      redirectAfterLogin();
    } catch (error) {
      const errorCode = error.code;
      const responseMessage = error.response?.data?.message;

      if (errorCode === "auth/popup-closed-by-user") {
        toast.info("Google sign-in was cancelled.");
        return;
      }

      if (errorCode === "auth/popup-blocked") {
        toast.error("Your browser blocked the Google sign-in popup.");
        return;
      }

      toast.error(
        responseMessage ||
          "Google sign-in failed. Please try again."
      );

      console.error("Google login error:", error);
    } finally {
      setIsGoogleSubmitting(false);
    }
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

      {/* Email/password login */}
      <button
        type="submit"
        disabled={isSubmitting || isGoogleSubmitting}
        className="w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-secondary transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-border" />

        <span className="px-3 text-xs text-text-secondary">OR</span>

        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Google login */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleSubmitting || isSubmitting}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-text transition-colors hover:bg-background-secondary disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        <span className="text-base font-bold">G</span>

        {isGoogleSubmitting
          ? "Signing in with Google..."
          : "Continue with Google"}
      </button>

      {/* Registration */}
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
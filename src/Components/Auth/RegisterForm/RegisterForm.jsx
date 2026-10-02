import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../Validation/authSchema";
import { registerUser } from "../../../Utils/api/Api";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },

    mode: "onBlur",
  });

  const onSubmit = async (formData) => {
    setServerError("");
    try {

      const { confirmPassword, ...payload } = formData;
      const response = await registerUser(payload);
      toast.success(response?.message);

      navigate("/login", {
        state: {
          message: "Registration successful. Please login.",
        },
      });
    } catch (error) {
      const responseData = error.response?.data;
      toast.error(responseData.message);
      if (responseData?.details?.length) {
        responseData.details.forEach((item) => {
          if (item.field) {
            setError(item.field, {
              type: "server",
              message: item.message,
            });
          }
        });

        return;
      }

      if (responseData?.message) {
        setServerError(responseData.message);
        return;
      }

      setServerError(
        "Something went wrong. Please check your connection and try again."
      );
    }
  };

  const handleGoogleRegister = () => {
    // Google OAuth will be implemented later.
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      {/* Server Error */}
      {serverError && (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="register-name"
          className="text-sm font-medium text-text"
        >
          Full Name
        </label>

        <input
          id="register-name"
          type="text"
          placeholder="Enter your name"
          autoComplete="name"
          {...register("name")}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="register-email"
          className="text-sm font-medium text-text"
        >
          Email
        </label>

        <input
          id="register-email"
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

      {/* Phone */}
      <div>
        <label
          htmlFor="register-phone"
          className="text-sm font-medium text-text"
        >
          Phone Number
        </label>

        <input
          id="register-phone"
          type="tel"
          placeholder="Enter your phone number"
          autoComplete="tel"
          {...register("phone")}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="register-password"
          className="text-sm font-medium text-text"
        >
          Password
        </label>

        <input
          id="register-password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          {...register("password")}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="register-confirm-password"
          className="text-sm font-medium text-text"
        >
          Confirm Password
        </label>

        <input
          id="register-confirm-password"
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          {...register("confirmPassword")}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary cursor-pointer px-5 py-3 text-sm font-medium text-secondary transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
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
        onClick={handleGoogleRegister}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-text transition-colors hover:bg-background-secondary"
      >
        <span className="text-base font-bold">G</span>

        Continue with Google
      </button>

      {/* Login */}
      <p className="text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-primary hover:opacity-80"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
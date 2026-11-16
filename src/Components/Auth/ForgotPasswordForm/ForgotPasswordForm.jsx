import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../Utils/api/Api";
import { forgotPasswordSchema } from "../../../Validation/authSchema";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async ({ email }) => {
    const normalizedEmail = email.trim().toLowerCase();

    try {
      const response = await forgotPassword({
        email: normalizedEmail,
      });

      toast.success(response?.message);

      navigate("/verify-otp", {
        state: { email: normalizedEmail },
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            className={`w-full rounded-lg border py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending OTP..." : "Send OTP"}
      </button>

      <Link
        to="/login"
        className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:text-primary"
      >
        Back to Login
      </Link>
    </form>
  );
};

export default ForgotPasswordForm;
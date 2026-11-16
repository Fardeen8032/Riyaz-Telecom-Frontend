import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../../Utils/api/Api";
import { resetPasswordSchema } from "../../../Validation/authSchema";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = location.state?.resetToken;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (formData) => {
    if (!resetToken) {
      navigate("/forgot-password", {
        replace: true,
      });

      return;
    }

    try {
      const response = await resetPassword({
        resetToken,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      toast.success(response?.message);

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-7 text-center">
          <p className="text-sm font-medium text-primary">
            Password Recovery
          </p>

          <h1 className="mt-2 text-3xl font-bold text-text">
            Reset Password
          </h1>

          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Enter your new password and confirm it to reset your account password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="space-y-5 rounded-xl border border-border bg-background-secondary/40 p-5 sm:p-6"
        >
          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-medium text-text"
            >
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              autoComplete="new-password"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.newPassword)}
              aria-describedby={
                errors.newPassword ? "new-password-error" : undefined
              }
              {...register("newPassword")}
              className={`w-full rounded-lg border bg-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary ${
                errors.newPassword ? "border-error" : "border-border"
              }`}
            />

            {errors.newPassword && (
              <p
                id="new-password-error"
                role="alert"
                className="mt-1 text-xs text-error"
              >
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-text"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              autoComplete="new-password"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword
                  ? "confirm-password-error"
                  : undefined
              }
              {...register("confirmPassword")}
              className={`w-full rounded-lg border bg-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary ${
                errors?.confirmPassword ? "border-error" : "border-border"
              }`}
            />

            {errors?.confirmPassword && (
              <p
                id="confirm-password-error"
                role="alert"
                className="mt-1 text-xs text-error"
              >
                {errors?.confirmPassword?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Updating Password..." : "Reset Password"}
          </button>

          <Link
            to="/login"
            className="flex items-center justify-center text-sm font-medium text-text-secondary transition hover:text-primary"
          >
            Back to Login
          </Link>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
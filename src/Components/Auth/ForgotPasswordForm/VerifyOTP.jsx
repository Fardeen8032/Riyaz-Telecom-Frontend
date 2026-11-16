import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { verifyOTP } from "../../../Utils/api/Api";
import { verifyOTPSchema } from "../../../Validation/authSchema";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleVerifyOTP = async ({ otp }) => {
    if (!email) {
      navigate("/forgot-password", {
        replace: true,
      });

      return;
    }

    try {
      const response = await verifyOTP({
        email,
        otp,
      });

      if (!response?.resetToken) {
        toast.error(response?.message);
        return;
      }

      toast.success(response?.message);

      navigate("/reset-password", {
        state: {
          email,
          resetToken: response?.resetToken,
        },
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
            Verification
          </p>

          <h1 className="mt-2 text-3xl font-bold text-text">
            Verify OTP
          </h1>

          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Enter the 6-digit verification code sent to your email address.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleVerifyOTP)}
          className="rounded-xl border border-border bg-background-secondary/40 p-5 sm:p-6"
        >
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="mb-2 block text-sm font-medium text-text"
            >
              Enter OTP
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.otp)}
              aria-describedby={errors.otp ? "otp-error" : undefined}
              {...register("otp", {
                setValueAs: (value) => value.replace(/\D/g, ""),
              })}
              className={`w-full rounded-lg border bg-background px-4 py-3 text-center text-lg font-semibold tracking-[0.5em] text-text outline-none transition focus:border-primary ${
                errors?.otp ? "border-error" : "border-border"
              }`}
            />

            {errors?.otp && (
              <p
                id="otp-error"
                role="alert"
                className="mt-2 text-xs text-error"
              >
                {errors?.otp?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>

          <Link
            to="/forgot-password"
            className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-text-secondary transition hover:text-primary"
          >
            Back to Forgot Password
          </Link>
        </form>
      </div>
    </section>
  );
};

export default VerifyOTP;
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleGoogleRegister = () => {
    // Google OAuth will be implemented later.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="register-name"
          className="text-sm font-medium text-text"
        >
          Full Name
        </label>

        <input
          id="register-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          autoComplete="name"
          required
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="register-email"
          className="text-sm font-medium text-text"
        >
          Email
        </label>

        <input
          id="register-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="email"
          required
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="register-phone"
          className="text-sm font-medium text-text"
        >
          Phone Number
        </label>

        <input
          id="register-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          autoComplete="tel"
          required
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="register-password"
          className="text-sm font-medium text-text"
        >
          Password
        </label>

        <input
          id="register-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          autoComplete="new-password"
          required
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="register-confirm-password"
          className="text-sm font-medium text-text"
        >
          Confirm Password
        </label>

        <input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          autoComplete="new-password"
          required
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-secondary transition-colors hover:bg-primary-hover"
      >
        Create Account
      </button>

      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-border" />

        <span className="px-3 text-xs text-text-secondary">
          OR
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={handleGoogleRegister}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-text transition-colors hover:bg-background-secondary"
      >
        <span className="text-base font-bold">G</span>
        Continue with Google
      </button>

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
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleGoogleLogin = () => {
    // Google OAuth will be implemented later.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="login-email"
          className="text-sm font-medium text-text"
        >
          Email
        </label>

        <input
          id="login-email"
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
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-secondary transition-colors hover:bg-primary-hover"
      >
        Login
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
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-text transition-colors hover:bg-background-secondary"
      >
        <span className="text-base font-bold">G</span>
        Continue with Google
      </button>

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
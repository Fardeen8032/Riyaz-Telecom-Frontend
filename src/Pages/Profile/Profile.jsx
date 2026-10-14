
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogOut, UserRound, Mail, Phone } from "lucide-react";
import { logout } from "../../Redux/auth/authSlice";
import { signOutFromGoogle } from "../../service/googleAuthService";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await signOutFromGoogle();
    } catch (error) {
      console.error("Firebase sign-out failed:", error);
    } finally {
      // Clear the application's session even if Firebase sign-out fails.
      dispatch(logout());
      setIsLoggingOut(false);
      toast.success("You have been logged out.");
      navigate("/login", { replace: true });
    }
  };

  if (!user) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-text">
          Profile unavailable
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Please log in to view your account.
        </p>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-6 rounded-md bg-primary px-5 py-3 text-sm font-medium text-white"
        >
          Go to Login
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="rounded-xl border border-border bg-background p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-text">
              My Account
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Manage your account information.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <div className="flex items-start gap-3">
            <UserRound size={20} className="mt-1 text-text-secondary" />
            <div>
              <p className="text-sm text-text-secondary">Full Name</p>
              <p className="mt-1 font-medium text-text">
                {user.name || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail size={20} className="mt-1 text-text-secondary" />
            <div>
              <p className="text-sm text-text-secondary">Email Address</p>
              <p className="mt-1 font-medium text-text">
                {user.email || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone size={20} className="mt-1 text-text-secondary" />
            <div>
              <p className="text-sm text-text-secondary">Phone Number</p>
              <p className="mt-1 font-medium text-text">
                {user.phone || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-text transition hover:bg-background-secondary disabled:opacity-60 sm:w-auto"
        >
          <LogOut size={18} />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </section>
  );
};

export default Profile;
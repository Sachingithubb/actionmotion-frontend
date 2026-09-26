import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      console.log("Login successful:", data);

      /*
       * Save the logged-in user.
       *
       * localStorage = Remember me enabled
       * sessionStorage = Remember me disabled
       */
      const user = data.user;

      if (rememberMe) {
        localStorage.setItem("actionmotion_user", JSON.stringify(user));
        sessionStorage.removeItem("actionmotion_user");
      } else {
        sessionStorage.setItem("actionmotion_user", JSON.stringify(user));
        localStorage.removeItem("actionmotion_user");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login request failed:", error);

      setError(
        "Unable to connect to the server. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex max-h-[calc(100vh-32px)] min-h-0 w-full items-center justify-center overflow-y-auto rounded-[24px] border border-white/70 bg-white/[0.97] px-4 py-6 shadow-[0_20px_60px_rgba(20,10,35,0.18)] backdrop-blur-xl sm:px-6 sm:py-7 lg:px-7 lg:py-6 xl:px-8">
      <div className="w-full max-w-[560px]">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-[#DDD6FE] bg-[#F5F3FF] px-3 py-1 text-[9px] font-bold tracking-[0.1em] text-[#7C3AED]">
          WELCOME BACK
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-[30px] font-semibold leading-tight tracking-[-0.045em] text-[#17121F] sm:text-[34px]">
          Log in to your account
        </h2>

        <p className="mt-2 text-[13px] leading-5 text-[#756D80]">
          Continue creating amazing videos with ActionMotion.
        </p>

        <form onSubmit={handleSubmit} className="mt-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-[11px] font-semibold text-[#4F4858]"
            >
              Email address
            </label>

            <div className="relative mt-1">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B94A3]"
              />

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="h-[46px] w-full rounded-xl border border-[#E4DEE9] bg-[#FCFBFD] pl-10 pr-4 text-[13px] text-[#17121F] outline-none transition-all placeholder:text-[#A29BAA] focus:border-[#A855F7]/60 focus:bg-white focus:ring-4 focus:ring-[#A855F7]/10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-3.5">
            <label
              htmlFor="password"
              className="text-[11px] font-semibold text-[#4F4858]"
            >
              Password
            </label>

            <div className="relative mt-1">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B94A3]"
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className={`h-[46px] w-full rounded-xl border bg-[#FCFBFD] pl-10 pr-11 text-[13px] text-[#17121F] outline-none transition-all placeholder:text-[#A29BAA] focus:bg-white focus:ring-4 ${
                  error
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-[#E4DEE9] focus:border-[#A855F7]/60 focus:ring-[#A855F7]/10"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9B94A3] transition-colors hover:text-[#7C3AED]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="mt-3 flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="peer sr-only"
              />

              <span className="flex h-4 w-4 items-center justify-center rounded-[4px] border border-[#D8D0E2] bg-white transition-all peer-checked:border-[#7C3AED] peer-checked:bg-[#7C3AED]">
                {rememberMe && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 5L4 7L8 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>

              <span className="text-[11px] text-[#756D80]">
                Remember me
              </span>
            </label>

            <Link
              to="/forgot-password"
              className="text-[11px] font-semibold text-[#7C3AED] transition-colors hover:text-[#6D28D9]"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-[10px] font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group mt-4 flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(124,58,237,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(124,58,237,0.30)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Log in"}

            {!isLoading && (
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#EEEAF2]" />

          <span className="text-[10px] font-medium text-[#A29BAA]">
            OR
          </span>

          <div className="h-px flex-1 bg-[#EEEAF2]" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="flex h-[44px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#E4DEE9] bg-white text-[12px] font-semibold text-[#403A46] transition-all hover:border-[#C4B5FD] hover:bg-[#FAF8FF]"
        >
          <span className="text-[15px] font-bold text-[#4285F4]">G</span>
          Continue with Google
        </button>

        {/* Github */}
        <button
          type="button"
          className="mt-2.5 flex h-[44px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#E4DEE9] bg-white text-[12px] font-semibold text-[#403A46] transition-all hover:border-[#C4B5FD] hover:bg-[#FAF8FF]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.71 5.4-5.29 5.69.42.36.78 1.08.78 2.18v3.24c0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>

          Continue with GitHub
        </button>

        {/* Signup */}
        <div className="mt-4 border-t border-[#EEEAF2] pt-4 text-center">
          <p className="text-[11px] text-[#756D80]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#7C3AED] transition-colors hover:text-[#6D28D9]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
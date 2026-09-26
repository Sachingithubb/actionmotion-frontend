import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create your account.");
        return;
      }

      console.log("Signup successful:", data);

      navigate("/login");
    } catch (error) {
      console.error("Signup request failed:", error);

      setError(
        "Unable to connect to the server. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex max-h-[calc(100vh-32px)] min-h-0 w-full items-center justify-center overflow-y-auto rounded-[24px] border border-white/70 bg-white/[0.97] px-4 py-6 shadow-[0_20px_60px_rgba(20,10,35,0.18)] backdrop-blur-xl sm:px-6 sm:py-7 lg:px-7 lg:py-6 xl:px-8">
      <div className="w-full max-w-[590px]">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-[#DDD6FE] bg-[#F5F3FF] px-3 py-1 text-[9px] font-bold tracking-[0.1em] text-[#7C3AED]">
          ACTIONMOTION ACCOUNT
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-[30px] font-semibold leading-tight tracking-[-0.045em] text-[#17121F] sm:text-[34px]">
          Create your account
        </h2>

        <p className="mt-2 text-[13px] leading-5 text-[#756D80]">
          Sign up to access your history, subscriptions, and more.
        </p>

        <form onSubmit={handleSubmit} className="mt-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="text-[11px] font-semibold text-[#4F4858]"
            >
              Full name
            </label>

            <div className="relative mt-1">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B94A3]"
              />

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                autoComplete="name"
                className="h-[46px] w-full rounded-xl border border-[#E4DEE9] bg-[#FCFBFD] pl-10 pr-4 text-[13px] text-[#17121F] outline-none transition-all placeholder:text-[#A29BAA] focus:border-[#A855F7]/60 focus:bg-white focus:ring-4 focus:ring-[#A855F7]/10"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-3">
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
          <div className="mt-3">
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
                placeholder="Create a password"
                required
                autoComplete="new-password"
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

            <p className="mt-1 text-[9px] text-[#9A93A3]">
              Use at least 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="mt-3">
            <label
              htmlFor="confirmPassword"
              className="text-[11px] font-semibold text-[#4F4858]"
            >
              Confirm password
            </label>

            <div className="relative mt-1">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B94A3]"
              />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                className={`h-[46px] w-full rounded-xl border bg-[#FCFBFD] pl-10 pr-11 text-[13px] text-[#17121F] outline-none transition-all placeholder:text-[#A29BAA] focus:bg-white focus:ring-4 ${
                  error
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-[#E4DEE9] focus:border-[#A855F7]/60 focus:ring-[#A855F7]/10"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((current) => !current)
                }
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9B94A3] transition-colors hover:text-[#7C3AED]"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-[10px] font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Create Account */}
          <button
            type="submit"
            disabled={isLoading}
            className="group mt-4 flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(124,58,237,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(124,58,237,0.30)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Creating Account..." : "Create Account"}

            {!isLoading && (
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </button>

          {/* Terms */}
          <p className="mt-2.5 text-center text-[9px] leading-4 text-[#9A93A3]">
            By creating an account, you agree to our{" "}
            <button
              type="button"
              className="font-medium text-[#7C3AED] hover:underline"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="font-medium text-[#7C3AED] hover:underline"
            >
              Privacy Policy
            </button>
            .
          </p>
        </form>

        {/* Login */}
        <div className="mt-3 border-t border-[#EEEAF2] pt-3 text-center">
          <p className="text-[11px] text-[#756D80]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#7C3AED] transition-colors hover:text-[#6D28D9]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
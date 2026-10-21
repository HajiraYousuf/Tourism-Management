
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Compass,
  ShieldCheck,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUser = JSON.parse(
      localStorage.getItem("registeredUser") || "null"
    );

    if (
      existingUser &&
      existingUser.email.toLowerCase() === email.trim().toLowerCase()
    ) {
      setError("This email is already registered. Please login.");
      return;
    }

    const newUser = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    const { password: savedPassword, ...userInfo } = newUser;

    localStorage.setItem("currentUser", JSON.stringify(userInfo));

    const redirectTo = location.state?.from || "/";

    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f5faf9] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[440px]">

        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-teal-700 p-2 rounded-xl text-white">
            <Compass size={23} />
          </div>

          <span className="text-xl font-bold text-gray-800">
            Travel<span className="text-teal-700">Mate</span>
          </span>
        </Link>

        {/* Register Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_35px_rgba(0,0,0,0.06)] p-7 sm:p-8">

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
              <User size={24} />
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              Create Account
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Join us and start exploring the world.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-700"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-3 py-2.5">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-sm mt-2"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-gray-100 flex-1"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px bg-gray-100 flex-1"></div>
          </div>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="text-teal-700 font-bold hover:text-teal-900"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
          <ShieldCheck size={15} className="text-teal-600" />
          Your information stays private.
        </div>

      </div>
    </div>
  );
};

export default Register;

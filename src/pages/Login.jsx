
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Compass,
  ShieldCheck,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    const registeredUser = JSON.parse(
      localStorage.getItem("registeredUser") || "null"
    );

    if (!registeredUser) {
      setError("Account not found. Please create an account first.");
      return;
    }

    if (
      registeredUser.email.toLowerCase() !== email.trim().toLowerCase() ||
      registeredUser.password !== password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    const { password: savedPassword, ...userInfo } = registeredUser;

    localStorage.setItem("currentUser", JSON.stringify(userInfo));

    const redirectTo = location.state?.from || "/";

    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f5faf9] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px]">

        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-7">
          <div className="bg-teal-700 p-2 rounded-xl text-white">
            <Compass size={23} />
          </div>
          <span className="text-xl font-bold text-gray-800">
            Travel<span className="text-teal-700">Mate</span>
          </span>
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_35px_rgba(0,0,0,0.06)] p-7 sm:p-9">

          <div className="text-center mb-7">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-4">
              <Lock size={23} />
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              Welcome Back!
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Sign in to continue your journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition text-sm"
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

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-3 py-2.5">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-sm"
            >
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-100 flex-1"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px bg-gray-100 flex-1"></div>
          </div>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={location.state}
              className="text-teal-700 font-bold hover:text-teal-900"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
          <ShieldCheck size={15} className="text-teal-600" />
          Your account information is protected.
        </div>

      </div>
    </div>
  );
};

export default Login;

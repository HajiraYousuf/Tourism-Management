
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  UserRound,
  X,
  Menu,
} from "lucide-react";
import tourism_logo from "../assets/tourism_logo.png";

const Header = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Check authenticated user
  useEffect(() => {
    const checkUser = () => {
      const user = JSON.parse(
        localStorage.getItem("currentUser") || "null"
      );
      setCurrentUser(user);
    };

    checkUser();

    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setShowLogoutPopup(false);
    setMobileMenu(false);
    navigate("/", { replace: true });
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          {/* Logo & Title */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 group"
          >
            <img
              src={tourism_logo}
              alt="Tourism Logo"
              className="w-12 h-12 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
            />

            <h2 className="text-2xl font-extrabold tracking-tight text-teal-800">
              Tourism<span className="text-teal-500">.</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <Link
              to="/"
              className="hover:text-teal-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              Home
            </Link>

            <Link
              to="/destinations"
              className="hover:text-teal-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              Destinations
            </Link>

            <Link
              to="/tours"
              className="hover:text-teal-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              Tours
            </Link>

            <Link
              to="/about"
              className="hover:text-teal-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="hover:text-teal-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              Contact
            </Link>

            {currentUser && (
              <Link
                to="/my-bookings"
                className="hover:text-teal-600 hover:-translate-y-0.5 transition-all duration-200"
              >
                My Bookings
              </Link>
            )}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {currentUser ? (
              <>
                <div className="flex items-center gap-2 text-slate-700 mr-2">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                    <UserRound size={17} />
                  </div>

                  <span className="text-xs font-bold max-w-28 truncate">
                    {currentUser.fullName}
                  </span>
                </div>

                <button
                  onClick={() => setShowLogoutPopup(true)}
                  className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-md transition-all duration-200 inline-flex items-center gap-2"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-teal-700 border border-teal-700 hover:bg-teal-50 rounded-xl transition-all duration-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white bg-teal-700 hover:bg-teal-600 rounded-xl shadow-md transition-all duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 rounded-lg text-teal-800 hover:bg-teal-50 transition"
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg px-6 py-5 space-y-4">

            <nav className="flex flex-col gap-4 text-sm font-bold text-slate-600">
              <Link to="/" onClick={closeMobileMenu} className="hover:text-teal-600">
                Home
              </Link>

              <Link to="/destinations" onClick={closeMobileMenu} className="hover:text-teal-600">
                Destinations
              </Link>

              <Link to="/tours" onClick={closeMobileMenu} className="hover:text-teal-600">
                Tours
              </Link>

              <Link to="/about" onClick={closeMobileMenu} className="hover:text-teal-600">
                About
              </Link>

              <Link to="/contact" onClick={closeMobileMenu} className="hover:text-teal-600">
                Contact
              </Link>

              {currentUser && (
                <Link
                  to="/my-bookings"
                  onClick={closeMobileMenu}
                  className="hover:text-teal-600"
                >
                  My Bookings
                </Link>
              )}
            </nav>

            <div className="border-t border-slate-100 pt-4">
              {currentUser ? (
                <div className="space-y-3">
                  <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <UserRound size={17} className="text-teal-600" />
                    {currentUser.fullName}
                  </p>

                  <button
                    onClick={() => {
                      setMobileMenu(false);
                      setShowLogoutPopup(true);
                    }}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold uppercase flex items-center justify-center gap-2 transition"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex-1 text-center py-3 rounded-xl border border-teal-700 text-teal-700 text-xs font-extrabold uppercase"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="flex-1 text-center py-3 rounded-xl bg-teal-700 text-white text-xs font-extrabold uppercase"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-7 shadow-2xl text-center">

            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut size={27} />
            </div>

            <h3 className="text-xl font-black text-slate-900">
              Logout Confirmation
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to logout from your account?
            </p>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

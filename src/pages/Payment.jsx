
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CreditCard,
  Smartphone,
  ShieldCheck,
  Lock,
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Ticket,
  CheckCircle2,
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const locationState = useLocation();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [booking] = useState(() =>
    JSON.parse(localStorage.getItem("pendingBooking") || "null")
  );

  // Check Login
  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser) {
      navigate("/login", {
        replace: true,
        state: { from: locationState },
      });
    }
  }, [navigate, locationState]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm max-w-md w-full">
          <Ticket size={40} className="mx-auto text-teal-600 mb-4" />

          <h2 className="text-xl font-bold text-slate-900">
            No Booking Found
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Please select a tour and complete your booking details first.
          </p>

          <button
            onClick={() => navigate("/tours")}
            className="mt-6 bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition"
          >
            Explore Tours
          </button>
        </div>
      </div>
    );
  }

  const tourName = booking.tourName || booking.title || "Tour";
  const location = booking.location || booking.destination || "Somaliland";

  const image =
    booking.image ||
    booking.tourImage ||
    booking.tour?.images?.[0] ||
    booking.tour?.image ||
    "";

  const guests = Number(booking.guests || 1);

  const total = Number(
    booking.totalPrice ?? booking.total ?? booking.grandTotal ?? 0
  );

  // Handle Payment
  const handlePayment = (e) => {
    e.preventDefault();
    setError("");

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser) {
      navigate("/login", {
        replace: true,
        state: { from: locationState },
      });
      return;
    }

    // Validate Card Details
    if (paymentMethod === "card") {
      if (
        !cardName.trim() ||
        !cardNumber.trim() ||
        !expiry.trim() ||
        !cvv.trim()
      ) {
        setError("Please complete all card details.");
        return;
      }

      if (cardNumber.replace(/\s/g, "").length < 12) {
        setError("Please enter a valid card number.");
        return;
      }

      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        setError("Please enter expiry date in MM/YY format.");
        return;
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        setError("Please enter a valid CVV.");
        return;
      }
    }

    // Validate Mobile Money
    if (
      (paymentMethod === "zaad" || paymentMethod === "edahab") &&
      !mobileNumber.trim()
    ) {
      setError("Please enter your mobile money number.");
      return;
    }

    // Get Existing Bookings
    const savedBookings = JSON.parse(
      localStorage.getItem("myBookings") || "[]"
    );

    // Create Confirmed Booking
    const confirmedBooking = {
      ...booking,
      id: `BK-${Date.now()}`,
      tourName,
      location,
      image,
      guests,
      totalPrice: total,
      userEmail: currentUser.email,
      userName: currentUser.fullName,
      status: "Confirmed",
      paymentStatus: "Paid",
      paymentMethod,
      bookingDate: new Date().toISOString(),
    };

    // Save Booking
    localStorage.setItem(
      "myBookings",
      JSON.stringify([...savedBookings, confirmedBooking])
    );

    // Show Success Popup
    setShowSuccess(true);

    // Remove Pending Booking and Redirect
    setTimeout(() => {
      localStorage.removeItem("pendingBooking");
      navigate("/my-bookings", { replace: true });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">

      {/* Header */}
      <section className="bg-slate-900 text-white py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-teal-400 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
            <Lock size={14} />
            Secure Checkout
          </span>

          <h1 className="text-3xl md:text-4xl font-black mt-4">
            Complete Your <span className="text-teal-400">Payment</span>
          </h1>

          <p className="text-slate-300 text-sm mt-3">
            Choose your preferred payment method to complete your booking.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 mb-6 transition"
        >
          <ArrowLeft size={16} />
          Back to Booking
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handlePayment}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8"
            >
              <div className="mb-7">
                <h2 className="text-xl font-black text-slate-900">
                  Payment Method
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Select how you would like to pay.
                </p>
              </div>

              {/* Payment Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">

                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("card");
                    setError("");
                  }}
                  className={`p-4 rounded-xl border-2 text-left transition ${
                    paymentMethod === "card"
                      ? "border-teal-600 bg-teal-50"
                      : "border-slate-200 hover:border-teal-300"
                  }`}
                >
                  <CreditCard className="text-teal-600 mb-3" size={23} />
                  <p className="font-bold text-sm">Card</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Debit / Credit
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("zaad");
                    setError("");
                  }}
                  className={`p-4 rounded-xl border-2 text-left transition ${
                    paymentMethod === "zaad"
                      ? "border-teal-600 bg-teal-50"
                      : "border-slate-200 hover:border-teal-300"
                  }`}
                >
                  <Smartphone className="text-teal-600 mb-3" size={23} />
                  <p className="font-bold text-sm">ZAAD</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Mobile Money
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("edahab");
                    setError("");
                  }}
                  className={`p-4 rounded-xl border-2 text-left transition ${
                    paymentMethod === "edahab"
                      ? "border-teal-600 bg-teal-50"
                      : "border-slate-200 hover:border-teal-300"
                  }`}
                >
                  <Smartphone className="text-teal-600 mb-3" size={23} />
                  <p className="font-bold text-sm">E-Dahab</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Mobile Money
                  </p>
                </button>
              </div>

              {/* Card Details */}
              {paymentMethod === "card" && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Cardholder Name
                    </label>

                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name on card"
                      autoComplete="cc-name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Card Number
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Enter card number"
                      autoComplete="cc-number"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Expiry Date
                      </label>

                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        autoComplete="cc-exp"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">
                        CVV
                      </label>

                      <input
                        type="password"
                        inputMode="numeric"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="CVV"
                        maxLength={4}
                        autoComplete="cc-csc"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Money */}
              {(paymentMethod === "zaad" || paymentMethod === "edahab") && (
                <div>
                  <label className="block text-sm font-bold mb-2">
                    {paymentMethod === "zaad" ? "ZAAD" : "E-Dahab"} Phone Number
                  </label>

                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter mobile money number"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500"
                  />

                  <p className="text-xs text-slate-500 mt-2">
                    Enter the number associated with your mobile money account.
                  </p>
                </div>
              )}

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mt-5">
                  {error}
                </p>
              )}

              {/* Security */}
              <div className="mt-7 p-4 bg-teal-50 rounded-xl flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="text-teal-600 flex-shrink-0"
                />

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Secure Checkout
                  </p>

                  <p className="text-xs text-slate-600 mt-1">
                    This is a frontend payment demonstration.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={showSuccess}
                className="w-full mt-7 bg-teal-600 hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Lock size={17} />
                Confirm Payment - ${total.toLocaleString()}
              </button>

              <p className="text-center text-xs text-slate-400 mt-4">
                No real payment will be processed.
              </p>
            </form>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden sticky top-24">

              <div className="p-5 border-b border-slate-100">
                <h2 className="font-black text-lg text-slate-900">
                  Booking Summary
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Review your trip details.
                </p>
              </div>

              <div className="p-5">
                {image && (
                  <img
                    src={image}
                    alt={tourName}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                )}

                <h3 className="font-bold text-slate-900">{tourName}</h3>

                <div className="space-y-3 mt-4 text-sm text-slate-500">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-teal-600" />
                    {location}
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-teal-600" />
                    {booking.travelDate || booking.date || "Date not specified"}
                  </p>

                  <p className="flex items-center gap-2">
                    <Users size={16} className="text-teal-600" />
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </p>
                </div>

                <div className="border-t border-slate-100 mt-5 pt-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Booking Total</span>
                    <span className="font-bold">
                      ${total.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100">
                    <span className="font-bold text-slate-900">
                      Total Amount
                    </span>

                    <span className="text-2xl font-black text-teal-600">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl animate-in zoom-in duration-300">

            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={45} className="text-emerald-500" />
            </div>

            <h2 className="text-2xl font-black text-slate-900">
              Booking Successful!
            </h2>

            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              Your booking has been completed successfully. Thank you for choosing us!
            </p>

            <div className="mt-6 bg-teal-50 rounded-xl p-3">
              <p className="text-xs text-teal-700 font-semibold">
                Redirecting to My Bookings...
              </p>
            </div>

            <div className="mt-5 flex justify-center">
              <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;

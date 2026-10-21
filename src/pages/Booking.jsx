
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { tours } from "../data/tours";
import { useState } from "react";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find selected tour using URL ID
  const selectedTour = tours.find(
    (tour) => tour.id === Number(id)
  );

  // Booking form states
  const [guests, setGuests] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Price calculations
  const serviceFee = 15;
  const discount = 0;

  const subtotal = selectedTour
    ? selectedTour.price * guests
    : 0;

  const total = subtotal + serviceFee - discount;

  // Get today's date for date validation
  const today = new Date().toISOString().split("T")[0];

  // Handle booking form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      id: `BK-${Date.now()}`,
      tourId: selectedTour.id,
      tourName: selectedTour.title,
      location: selectedTour.destination,
      image: selectedTour.images?.[0] || selectedTour.image,
      travelDate,
      guests,
      fullName,
      email,
      phone,
      notes,
      subtotal,
      serviceFee,
      discount,
      totalPrice: total,
      bookingDate: new Date().toISOString(),
      status: "Pending",
      paymentStatus: "Unpaid",
    };

    // Save booking temporarily before payment
    localStorage.setItem(
      "pendingBooking",
      JSON.stringify(bookingData)
    );

    // Navigate to payment page
    navigate("/payment");
  };

  // Handle invalid tour ID
  if (!selectedTour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Tour Not Found
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          The selected tour does not exist.
        </p>

        <button
          onClick={() => navigate("/tours")}
          className="mt-5 bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl transition"
        >
          Browse Tours
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen pb-16">

      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-600/10 backdrop-blur-3xl"></div>

        <div className="relative max-w-2xl mx-auto space-y-2">
          <span className="text-teal-400 font-bold text-xs uppercase tracking-widest bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20 inline-flex items-center gap-1.5">
            <Sparkles size={14} />
            Plan Your Trip
          </span>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Book Your <span className="text-teal-400">Adventure</span>
          </h1>

          <p className="text-slate-300 text-xs md:text-sm max-w-md mx-auto">
            Fill in the details below to reserve your tour package instantly with full safety.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Left Column: Booking Form */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Step 1: Tour Selection & Travel Details */}
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2 border-b pb-2">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Select Tour & Dates
                </h3>

                <div className="space-y-4">

                  {/* Select Tour */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Select Tour Package
                    </label>

                    <select
                      value={selectedTour.id}
                      onChange={(e) =>
                        navigate(`/book-tour/${e.target.value}`)
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-500"
                    >
                      {tours.map((tour) => (
                        <option key={tour.id} value={tour.id}>
                          {tour.title} (${tour.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">

                    {/* Travel Date */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Travel Date
                      </label>

                      <div className="relative">
                        <Calendar
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          size={16}
                        />

                        <input
                          type="date"
                          min={today}
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          required
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Number of Guests
                      </label>

                      <div className="relative">
                        <Users
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          size={16}
                        />

                        <select
                          value={guests}
                          onChange={(e) =>
                            setGuests(Number(e.target.value))
                          }
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
                        >
                          <option value={1}>1 Guest</option>
                          <option value={2}>2 Guests</option>
                          <option value={3}>3 Guests</option>
                          <option value={4}>4 Guests</option>
                        </select>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Step 2: Personal Information */}
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2 border-b pb-2">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Personal Details
                </h3>

                <div className="space-y-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        size={16}
                      />

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          size={16}
                        />

                        <input
                          type="email"
                          placeholder="example@mail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number
                      </label>

                      <div className="relative">
                        <Phone
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          size={16}
                        />

                        <input
                          type="tel"
                          placeholder="+252 ..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Special Requests / Notes (Optional)
                    </label>

                    <textarea
                      rows="3"
                      placeholder="Any dietary preferences, pick-up instructions, etc..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-teal-500 resize-none"
                    ></textarea>
                  </div>

                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                Confirm & Proceed to Payment
                <ArrowRight size={16} />
              </button>

            </form>
          </div>

          {/* Right Column: Dynamic Booking Summary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md space-y-5 sticky top-24">

            <h3 className="font-bold text-slate-900 text-base border-b pb-3">
              Booking Summary
            </h3>

            {/* Selected Tour Preview */}
            <div className="flex gap-3 items-center">
              <img
                src={selectedTour.images?.[0] || selectedTour.image}
                alt={selectedTour.title}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div>
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  {selectedTour.title}
                </p>

                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin size={12} className="text-teal-600" />
                  {selectedTour.destination}
                </p>
              </div>
            </div>

            {/* Dynamic Price Breakdown */}
            <div className="space-y-2 text-xs border-t border-b py-3 text-slate-600">

              <div className="flex justify-between">
                <span>
                  Tour Price ({guests} x ${selectedTour.price})
                </span>

                <span className="font-bold text-slate-800">
                  ${subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Service & Permit Fees</span>

                <span className="font-bold text-slate-800">
                  ${serviceFee}
                </span>
              </div>

              <div className="flex justify-between text-teal-600 font-semibold">
                <span>Discount</span>
                <span>-${discount}</span>
              </div>

            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-slate-900 text-sm">
                Total Amount
              </span>

              <span className="text-xl font-black text-slate-900">
                ${total.toLocaleString()}
              </span>
            </div>

            {/* Cancellation Information */}
            <div className="p-3 bg-teal-50 rounded-xl space-y-2 text-[11px] text-teal-800">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 size={14} className="text-teal-600" />
                Free Cancellation
              </div>

              <p className="text-[10px] text-slate-500">
                Cancel up to 24 hours before the tour date for a full refund.
              </p>
            </div>

            {/* Security Information */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck size={16} className="text-teal-600" />
              <span>100% Encrypted & Safe Booking</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

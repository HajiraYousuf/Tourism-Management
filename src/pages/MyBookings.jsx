
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Ticket,
} from "lucide-react";

const MyBookings = () => {
  const navigate = useNavigate();
  const locationState = useLocation();

  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Check Login and Load Current User Bookings
  useEffect(() => {
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

    const savedBookings = JSON.parse(
      localStorage.getItem("myBookings") || "[]"
    );

    // Only show bookings belonging to the logged-in user
    const userBookings = savedBookings.filter(
      (booking) =>
        booking.userEmail?.toLowerCase() ===
        currentUser.email?.toLowerCase()
    );

    const normalizedBookings = userBookings.map((booking, index) => ({
      ...booking,
      id: booking.id || booking.bookingId || `BK-${index + 1}`,
      tourName:
        booking.tourName ||
        booking.tour?.title ||
        booking.tour?.name ||
        booking.title ||
        "Tour",
      location:
        booking.location ||
        booking.destination ||
        booking.tour?.destination ||
        "Not specified",
      image:
        booking.image ||
        booking.tourImage ||
        booking.tour?.images?.[0] ||
        booking.tour?.image ||
        "",
      travelDate:
        booking.travelDate ||
        booking.date ||
        booking.selectedDate ||
        "",
      guests: booking.guests || booking.numberOfGuests || 1,
      totalPrice:
        booking.totalPrice ??
        booking.total ??
        booking.grandTotal ??
        0,
      status: booking.status || "Pending",
      paymentStatus: booking.paymentStatus || "Unpaid",
    }));

    setBookings(normalizedBookings);
    setLoading(false);
  }, [navigate, locationState]);

  // Format Date
  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Format Price
  const formatPrice = (price) => {
    if (typeof price === "string") return price;

    return `$${Number(price).toLocaleString()}`;
  };

  // Format Guests
  const formatGuests = (guests) => {
    if (typeof guests === "string" && guests.includes("Guest")) {
      return guests;
    }

    const count = Number(guests) || 1;
    return `${count} ${count === 1 ? "Guest" : "Guests"}`;
  };

  // Booking Statistics
  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (item) => item.status.toLowerCase() === "confirmed"
  ).length;

  const pendingBookings = bookings.filter(
    (item) => item.status.toLowerCase() === "pending"
  ).length;

  const completedBookings = bookings.filter(
    (item) => item.status.toLowerCase() === "completed"
  ).length;

  // Search and Filter
  const filteredBookings = bookings.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      item.status.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
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
            <Ticket size={14} /> My Travel History
          </span>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            My <span className="text-teal-400">Bookings</span>
          </h1>

          <p className="text-slate-300 text-xs md:text-sm max-w-md mx-auto">
            Manage your upcoming tours, view ticket details, and check your reservation history.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
              <Ticket size={20} />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase">Total</p>
              <p className="text-lg font-black text-slate-900">
                {totalBookings} Bookings
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase">Confirmed</p>
              <p className="text-lg font-black text-slate-900">
                {confirmedBookings} Tours
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase">Pending</p>
              <p className="text-lg font-black text-slate-900">
                {pendingBookings} Tours
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase">Completed</p>
              <p className="text-lg font-black text-slate-900">
                {completedBookings} Tours
              </p>
            </div>
          </div>

        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-3 justify-between items-center">

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search booking ID or tour..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter size={14} className="text-slate-400 hidden sm:block mr-1 flex-shrink-0" />

            {["All", "Confirmed", "Pending", "Completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                  activeFilter === tab
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>

        {/* Bookings List */}
        <div className="space-y-4">

          {filteredBookings.length > 0 ? (
            filteredBookings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >

                {/* Left Side */}
                <div className="flex items-start gap-4">

                  <img
                    src={item.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600"}
                    alt={item.tourName}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover flex-shrink-0"
                  />

                  <div className="space-y-1.5">

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md font-mono">
                        {item.id}
                      </span>

                      {item.status === "Confirmed" && (
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Confirmed
                        </span>
                      )}

                      {item.status === "Pending" && (
                        <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                          <AlertCircle size={12} /> Pending
                        </span>
                      )}

                      {item.status === "Completed" && (
                        <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-blue-200 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Completed
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm md:text-base text-slate-900 leading-snug">
                      {item.tourName}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-teal-600" />
                        {item.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" />
                        Date: {formatDate(item.travelDate)}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex md:flex-col items-center md:items-end justify-between gap-3 flex-shrink-0">

                  <div className="text-left md:text-right">
                    <p className="text-lg font-black text-slate-900">
                      {formatPrice(item.totalPrice)}
                    </p>

                    <p className="text-[11px] text-slate-400 font-medium">
                      {formatGuests(item.guests)} •{" "}
                      <span
                        className={
                          item.paymentStatus === "Paid"
                            ? "text-emerald-600 font-bold"
                            : "text-amber-600 font-bold"
                        }
                      >
                        {item.paymentStatus}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/bookings/${item.id}`}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    >
                      Details
                    </Link>

                    <Link
                      to={`/bookings/${item.id}`}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition inline-flex items-center gap-1"
                    >
                      Ticket <ChevronRight size={14} />
                    </Link>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 px-6 text-center">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket size={28} />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                No Bookings Found
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                {bookings.length === 0
                  ? "You haven't made any bookings yet."
                  : "No bookings match your search or selected filter."}
              </p>

              {bookings.length === 0 && (
                <Link
                  to="/tours"
                  className="inline-flex mt-5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold transition"
                >
                  Explore Tours
                </Link>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MyBookings;


import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Search,
  ArrowRight,
  Sparkles,
  Compass,
  Waves,
  Mountain,
  Landmark,
  Trees,
  X,
} from "lucide-react";
import { destinations } from "../data/destinations";

const Destinations = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Places");

  const categories = [
    { name: "All Places", icon: Compass },
    { name: "Beaches", icon: Waves },
    { name: "Mountains", icon: Mountain },
    { name: "Culture", icon: Landmark },
    { name: "Nature", icon: Trees },
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(search.toLowerCase()) ||
        destination.region.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All Places" ||
        destination.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-slate-900 px-6 py-20 text-center text-white">
        <div className="absolute inset-0 bg-teal-600/10 backdrop-blur-3xl" />

        <div className="relative mx-auto max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-400">
            <Sparkles size={14} />
            Explore The Beauty
          </span>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Discover Top{" "}
            <span className="text-teal-400">Destinations</span>
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Discover beautiful beaches, breathtaking mountains and
            historical places across Somaliland.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5 sm:px-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl">
          <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">

            {/* Search Input */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destination or location..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const active = activeCategory === category.name;

                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                      active
                        ? "bg-teal-700 text-white shadow-md"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-teal-600 hover:text-teal-700"
                    }`}
                  >
                    <Icon size={15} />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">

        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 mx-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Explore Our Places
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Beautiful Destinations
            </h2>
          </div>

          <p className="text-sm text-slate-500">
            {filteredDestinations.length} places found
          </p>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Destination Image */}
                <div className="relative">
                  <Link
                    to={`/destination/${destination.id}`}
                    className="block h-48 overflow-hidden sm:h-52"
                  >
                    <img
                      src={destination.images[0]}
                      alt={destination.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </Link>

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-teal-800 shadow-sm">
                    {destination.category}
                  </span>
                </div>

                {/* Destination Information */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-teal-700">
                    {destination.name}
                  </h3>

                  <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin size={15} className="text-teal-700" />
                    {destination.region}, Somaliland
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {destination.description}
                  </p>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      to={`/destination/${destination.id}`}
                      className="flex items-center justify-between text-sm font-bold text-teal-700 transition hover:text-teal-900"
                    >
                      Explore Destination
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-5 py-16 text-center shadow-sm">
            <Compass className="mx-auto text-teal-600" size={42} />

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No Destinations Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or choose a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All Places");
              }}
              className="mt-5 rounded-lg bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              View All Destinations
            </button>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="mx-5 mb-16 overflow-hidden rounded-3xl bg-teal-900 px-6 py-12 text-center sm:mx-auto sm:max-w-7xl sm:px-12">
        <Compass className="mx-auto text-teal-300" size={35} />

        <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          Ready for Your Next Adventure?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-teal-100">
          Discover our travel packages and find an experience that
          matches your interests.
        </p>

        <Link
          to="/tours"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-teal-900 transition hover:bg-teal-50"
        >
          Explore Our Tours
          <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
};

export default Destinations;

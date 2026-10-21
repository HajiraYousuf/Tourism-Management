
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, MapPin, Clock, Star, ArrowRight,
  Compass, SlidersHorizontal
} from "lucide-react";
import { tours } from "../data/tours";

export default function Tours() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Beaches", "Mountains", "Culture", "Nature"];

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(search.toLowerCase()) ||
      tour.destination.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || tour.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-white min-h-screen text-slate-800">

      {/* Hero */}
      <section className="relative h-[280px] sm:h-[330px] overflow-hidden">
        <img
          src="/images/daallo/main.jpeg"
          alt="Somaliland tours"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative max-w-7xl mx-auto px-5 h-full flex flex-col justify-center text-white">
          <span className="text-teal-300 text-xs font-bold uppercase tracking-[3px]">
            Explore Somaliland
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-3">
            Discover Amazing Tours
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-3 max-w-xl leading-6">
            Explore beautiful destinations, experience local culture and create unforgettable memories.
          </p>
          <div className="flex items-center gap-2 text-sm mt-5">
            <Compass size={18} className="text-teal-300" />
            Discover. Explore. Experience.
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-5 pt-7 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-teal-700 text-xs font-bold uppercase tracking-widest">
              Find Your Adventure
            </p>
            <h2 className="text-2xl font-bold mt-1">Explore Our Tours</h2>
          </div>

          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tours or destinations..."
              className="w-full border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap mt-5">
          <SlidersHorizontal size={17} className="text-gray-400 mr-1" />
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                category === item
                  ? "bg-teal-700 text-white"
                  : "bg-slate-100 text-gray-600 hover:bg-teal-50 hover:text-teal-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Tour Cards */}
      <section className="max-w-7xl mx-auto px-5 pb-12">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-slate-800">{filteredTours.length}</span> tours
          </p>
          <span className="text-xs text-gray-400">Somaliland Experiences</span>
        </div>

        {filteredTours.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTours.map((tour) => (
              <article
                key={tour.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-teal-800 px-3 py-1.5 rounded-full text-xs font-bold">
                    {tour.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
                    <Star size={13} className="text-yellow-400 fill-yellow-400" />
                    {tour.rating}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 text-teal-700 text-xs font-semibold">
                    <MapPin size={14} />
                    {tour.destination}, Somaliland
                  </div>

                  <h3 className="text-lg font-bold mt-2 group-hover:text-teal-700 transition">
                    {tour.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-6 mt-2 line-clamp-2">
                    {tour.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-3">
                    <Clock size={15} className="text-teal-700" />
                    {tour.duration}
                  </div>

                  <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Starting from</p>
                      <p className="text-xl font-extrabold text-teal-800">
                        ${tour.price}
                      </p>
                    </div>

                    <Link
                      to={`/tours/${tour.id}`}
                      className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                    >
                      View Details <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-14 bg-slate-50 rounded-xl">
            <Compass size={35} className="mx-auto text-teal-600" />
            <h3 className="font-bold text-lg mt-3">No Tours Found</h3>
            <p className="text-sm text-gray-500 mt-1">
              Try another search or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-4 text-sm font-semibold text-teal-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-teal-800 py-9">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-white">
          <div>
            <h2 className="text-2xl font-bold">Ready for Your Next Adventure?</h2>
            <p className="text-teal-100 text-sm mt-1">
              Discover the beauty of Somaliland with us.
            </p>
          </div>
          <Link
            to="/destinations"
            className="bg-white text-teal-800 hover:bg-teal-50 px-5 py-3 rounded-lg font-bold text-sm flex items-center gap-2"
          >
            Explore Destinations <ArrowRight size={17} />
          </Link>
        </div>
      </section>

    </main>
  );
}

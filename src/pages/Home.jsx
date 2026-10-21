import { Link } from "react-router-dom";
import Beach from "../assets/Beach.jpg"
import { destinations } from "../data/destinations";
import { ArrowRight } from "lucide-react";
const categories = [
  { 
    name: "Beaches", 
    icon: (
      <svg className="h-6 w-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ) 
  },
  { 
    name: "Mountains", 
    icon: (
      <svg className="h-6 w-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ) 
  },
  { 
    name: "Cities", 
    icon: (
      <svg className="h-6 w-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ) 
  },
  { 
    name: "Adventure", 
    icon: (
      <svg className="h-6 w-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ) 
  },
  { 
    name: "Culture", 
    icon: (
      <svg className="h-6 w-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ) 
  },
  { 
    name: "Nature", 
    icon: (
      <svg className="h-6 w-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ) 
  },
];

const benefits = [
  {
    icon: (
      <svg className="h-6 w-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Trusted & Safe",
    description: "Travel with confidence",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Best Price",
    description: "Affordable and fair prices",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "24/7 Support",
    description: "We're here to help",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* HERO SECTION */}
      <section className="relative isolate min-h-[440px] overflow-hidden sm:min-h-[480px] lg:min-h-[500px]">
        <img
          src={Beach}
          alt="Beautiful tropical turquoise beach"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/75 via-slate-900/35 to-transparent" />

        <div className="mx-auto flex min-h-[440px] max-w-7xl flex-col justify-center px-5 py-14 sm:min-h-[480px] lg:min-h-[500px] lg:px-10">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              Discover your next adventure
            </span>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Beautiful Places Around the World
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/90 sm:text-base">
              Explore amazing destinations, experience new cultures, and
              create unforgettable memories.
            </p>

            {/* SEARCH BAR */}
            <form
              action="/destinations"
              method="GET"
              className="mt-8 flex max-w-xl items-center rounded-full bg-white p-1.5 shadow-xl"
            >
              <svg
                className="ml-4 h-5 w-5 shrink-0 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path
                  d="m16 16 4 4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="search"
                name="search"
                placeholder="Search destinations, tours..."
                aria-label="Search destinations and tours"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                aria-label="Search destinations"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white transition hover:bg-teal-800"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="6.5" strokeWidth="2" />
                  <path
                    d="m16 16 4 4"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-teal-500/70 via-white/30 to-teal-600/70" />
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="font-semibold uppercase tracking-widest text-cyan-700">
            Explore by Category
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Find Your Perfect Experience
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/destinations?category=${category.name}`}
              className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-cyan-600 hover:shadow-md"
            >
              <span className="text-4xl">{category.icon}</span>
              <h3 className="mt-3 font-semibold text-gray-800">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"> 
      {destinations.slice(0, 6).map((destination) => (
        <div
          key={destination.id}
          className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative">
            <Link
              to={`/destination/${destination.id}`}
              className="relative block h-36 overflow-hidden sm:h-48"
            >
              <img
                src={destination.images[0]}
                alt={destination.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </Link>

            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-teal-800 shadow-sm">
              Popular
            </span>
          </div>

          <div className="p-3 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                  {destination.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {destination.region}, Somaliland
                </p>
              </div>

              <span className="shrink-0 text-sm font-extrabold text-teal-700">
                ${destination.price}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                <span className="text-amber-400">★</span>
                {destination.rating}
              </span>

              <Link
                to={`/destination/${destination.id}`}
                className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900"
              >
                Explore <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>

      {/* TRUST AND BENEFITS */}
      <section className="bg-gradient-to-b from-white to-teal-50/80">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-5 py-8 sm:grid-cols-3 sm:gap-6 lg:px-10">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-center gap-4 rounded-2xl p-4 transition hover:bg-white hover:shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-100">
                {benefit.icon}
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
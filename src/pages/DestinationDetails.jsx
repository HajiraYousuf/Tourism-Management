import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin, ArrowLeft, ArrowRight, Camera, Compass,
  Mountain, CalendarDays, Lightbulb, 
  CheckCircle2, Footprints, Sparkles, Navigation, Clock
} from "lucide-react";
import { destinations } from "../data/destinations";
import { tours } from "../data/tours"; // Hubi in jidka tours uu sax yahay

const DestinationDetails = () => {
  const { id } = useParams();
  const destination = destinations.find(item => item.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);

  if (!destination) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800">Destination Not Found</h2>
        <Link to="/destinations" className="mt-4 font-semibold text-teal-700 hover:underline">
          Back to Destinations
        </Link>
      </div>
    );
  }

  // Tours-ka xiriirka la leh meeshan ama guud ahaan tours-ka jira
  const relatedTours = tours
    ? tours.filter(tour => tour.destinationId === destination.id || tour.category === destination.category).slice(0, 3)
    : [];

  const images = destination.images || [];

  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-800">

      {/* Hero (Aan la beddelin sida aad codsatay) */}
      <section className="relative h-[420px] overflow-hidden sm:h-[520px]">
        <img
          src={images[activeImage] || images[0]}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-5 py-7">
          <Link
            to="/destinations"
            className="flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
          >
            <ArrowLeft size={17} /> All Destinations
          </Link>

          <div className="pb-5 sm:pb-10">
            <span className="rounded-full bg-teal-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
              {destination.category}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold text-white sm:text-6xl">
              {destination.name}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/90 sm:text-base">
              <MapPin size={18} />
              {destination.region}, Somaliland
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Gallery */}
        <section className="relative -mt-8 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl sm:-mt-12 sm:p-4">
          <div className="flex items-center justify-between px-2 pb-3">
            <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-slate-800 uppercase">
              <Camera size={18} className="text-teal-600" />
              Destination Gallery
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
              {activeImage + 1} / {images.length}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {images.map((image, index) => (
              <button
                key={image}
                onClick={() => setActiveImage(index)}
                className={`relative h-16 overflow-hidden rounded-xl transition-all duration-300 sm:h-24 ${
                  activeImage === index
                    ? "ring-2 ring-teal-600 ring-offset-2 scale-[0.98]"
                    : "opacity-70 hover:opacity-100 hover:scale-[1.02]"
                }`}
              >
                <img
                  src={image}
                  alt={`${destination.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Overview */}
        <section className="grid gap-8 py-10 lg:grid-cols-3 lg:py-14">
          <div className="lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Welcome To {destination.region}
            </span>
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl leading-tight">
              Discover the beauty of {destination.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {destination.about || destination.description}
            </p>

            {destination.history && (
              <div className="mt-8 rounded-2xl border-l-4 border-teal-600 bg-teal-50/40 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">
                  History & Culture
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {destination.history}
                </p>
              </div>
            )}
          </div>

          <aside className="sticky top-6 h-fit rounded-2xl bg-slate-900 p-6 text-white shadow-xl ring-1 ring-slate-800">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-teal-500/10 p-3 text-teal-400">
                <Compass size={26} />
              </div>
              <h3 className="text-xl font-bold">Explore This Place</h3>
            </div>
            
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Discover the landscapes, culture, and experiences of this beautiful destination.
            </p>

            <div className="my-5 h-px bg-slate-800" />

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Location</span>
                <span className="font-semibold text-slate-200">{destination.region}, Somaliland</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Category</span>
                <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300">
                  {destination.category}
                </span>
              </div>
            </div>

            <Link
              to="/tours"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-500 shadow-lg shadow-teal-600/30"
            >
              Explore Tours <ArrowRight size={17} />
            </Link>
          </aside>
        </section>

        {/* Attractions (Sida Cusub oo loo habeeyay) */}
        {destination.attractions?.length > 0 && (
          <section className="border-t border-slate-200/80 py-12">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-teal-100 p-2.5 text-teal-700">
                <Sparkles size={22} />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
                  Discover More
                </span>
                <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                  Top Attractions
                </h2>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {destination.attractions.map((item, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400 hover:shadow-lg"
                >
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-teal-500 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-600 group-hover:text-white">
                    <Navigation size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-800 group-hover:text-teal-700">{item}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-teal-600">
                    Explore highlight <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Activities (Design casri ah) */}
        {destination.activities?.length > 0 && (
          <section className="border-t border-slate-200/80 py-12">
            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
                Experiences
              </span>
              <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                Things To Do
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {destination.activities.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition-all duration-200 hover:bg-teal-50/50 hover:border-teal-300"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                    <Footprints size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-800">{activity}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Travel Guide (Design aad u nadiif ah) */}
        <section className="border-t border-slate-200/80 py-12">
          <div className="mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
              Plan Your Visit
            </span>
            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              Travel Information
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <CalendarDays size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Best Time To Visit</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {destination.bestTime || "Choose a suitable season with comfortable weather. Check local conditions before travelling."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Lightbulb size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Travel Tips</h3>
              </div>
              {destination.travelTips?.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {destination.travelTips.filter(tip => tip.trim() !== "").map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal-600" />
                      <span className="font-medium">{tip}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Check local travel advice before visiting.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Related Tours (Ugu badalnaa Similar Destinations) */}
        {relatedTours.length > 0 && (
          <section className="border-t border-slate-200/80 py-12">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
                  Book Your Adventure
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                  Available Tours
                </h2>
              </div>
              <Link to="/tours" className="hidden items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 sm:flex">
                View All Tours <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTours.map(tour => (
                <Link
                  key={tour.id}
                  to={`/tours/${tour.id}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={tour.image || (tour.images && tour.images[0])}
                      alt={tour.title || tour.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {tour.price && (
                      <span className="absolute top-3 right-3 rounded-xl bg-slate-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                        ${tour.price}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                      {tour.duration && (
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-teal-600" />
                          {tour.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-teal-600 transition">
                      {tour.title || tour.name}
                    </h3>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-xs font-bold text-teal-600">Book Now</span>
                      <div className="rounded-full bg-teal-50 p-2 text-teal-600 transition group-hover:bg-teal-600 group-hover:text-white">
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mb-12 overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-center shadow-xl sm:px-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400">
            <Mountain size={32} />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Your Next Adventure Starts Here
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
            Discover more beautiful places and explore our travel experiences across Somaliland.
          </p>
          <Link
            to="/tours"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-teal-500 shadow-lg shadow-teal-600/30"
          >
            Discover Our Tours <ArrowRight size={17} />
          </Link>
        </section>

      </div>
    </main>
  );
};

export default DestinationDetails;
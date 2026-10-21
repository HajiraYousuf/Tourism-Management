import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";
import { tours } from "../data/tours";

export default function TourDetail() {
  const { id } = useParams();
  const tour = tours.find((item) => item.id === Number(id));

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">Tour Not Found</h2>

        <Link
          to="/tours"
          className="text-teal-700 mt-3 font-semibold"
        >
          Back to Tours
        </Link>
      </div>
    );
  }

  const images = Array.isArray(tour.images)
    ? tour.images
    : tour.image
      ? [tour.image]
      : [];

  const highlights = tour.highlights || tour.includes || [];
  const included = tour.includes || [];
  const excluded = tour.excludes || [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-5 py-3">
          <Link
            to="/tours"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-teal-700 w-fit"
          >
            <ArrowLeft size={17} />
            Back to Tours
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-5">

        {/* Title */}
        <div className="flex flex-wrap justify-between items-end gap-3 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">

              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-semibold">
                {tour.category}
              </span>

              <span className="flex items-center gap-1 text-gray-500">
                <MapPin size={14} />
                {tour.destination}, Somaliland
              </span>

            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold">
              {tour.title}
            </h1>
          </div>

          <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
            <Star
              size={17}
              className="fill-amber-400"
            />
            {tour.rating}
          </div>
        </div>

        {/* Book Button - Above Gallery */}
        <div className="flex justify-end mb-4">
          <Link
            to={`/book-tour/${tour.id}`}
            className="bg-teal-700 hover:bg-teal-800 text-white px-7 py-3 rounded-lg text-sm font-bold transition shadow-sm"
          >
            Book This Tour
          </Link>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 h-[250px] sm:h-[360px] rounded-xl overflow-hidden">

          <div className="col-span-2 row-span-2">
            <img
              src={images[0]}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
          </div>

          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="overflow-hidden"
            >
              <img
                src={image}
                alt={`${tour.title} ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}

        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-5 mt-5">

          {/* Details */}
          <div className="lg:col-span-2 space-y-4">

            {/* Quick Info */}
            <div className="grid grid-cols-3 bg-white rounded-xl border border-gray-100 p-4 text-center">

              <div>
                <Clock
                  size={19}
                  className="mx-auto text-teal-700 mb-1"
                />

                <p className="text-xs text-gray-400">
                  Duration
                </p>

                <p className="font-bold text-xs mt-1">
                  {tour.duration}
                </p>
              </div>

              <div className="border-x border-gray-100">
                <Users
                  size={19}
                  className="mx-auto text-teal-700 mb-1"
                />

                <p className="text-xs text-gray-400">
                  Group
                </p>

                <p className="font-bold text-xs mt-1">
                  {tour.groupSize || "Small Group"}
                </p>
              </div>

              <div>
                <MapPin
                  size={19}
                  className="mx-auto text-teal-700 mb-1"
                />

                <p className="text-xs text-gray-400">
                  Location
                </p>

                <p className="font-bold text-xs mt-1">
                  {tour.destination}
                </p>
              </div>

            </div>

            {/* Overview */}
            <section className="bg-white rounded-xl border border-gray-100 p-5">

              <h2 className="font-bold text-lg">
                Tour Experience
              </h2>

              <p className="text-sm text-gray-600 leading-6 mt-2">
                {tour.overview || tour.description}
              </p>

            </section>

            {/* Highlights */}
            <section className="bg-white rounded-xl border border-gray-100 p-5">

              <h2 className="font-bold text-lg mb-3">
                Tour Highlights
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">

                {highlights.map((item, index) => (
                  <p
                    key={index}
                    className="flex gap-2 items-start text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={17}
                      className="text-teal-600 shrink-0"
                    />

                    {typeof item === "string"
                      ? item
                      : item.title}
                  </p>
                ))}

              </div>

            </section>

            {/* Itinerary */}
            <section className="bg-white rounded-xl border border-gray-100 p-5">

              <h2 className="font-bold text-lg mb-4">
                Tour Itinerary
              </h2>

              <div className="border-l-2 border-teal-100 ml-2 pl-5 space-y-4">

                {tour.itinerary?.map((step, index) => (
                  <div
                    key={index}
                    className="relative"
                  >

                    <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-teal-600 ring-4 ring-teal-50" />

                    <p className="text-xs font-bold text-teal-700">
                      {step.day ||
                        step.time ||
                        `Day ${index + 1}`}
                    </p>

                    <h3 className="font-bold text-sm mt-1">
                      {step.title}
                    </h3>

                    <p className="text-xs text-gray-500 leading-5 mt-1">
                      {step.description || step.desc}
                    </p>

                  </div>
                ))}

              </div>

            </section>

          </div>

          {/* Right Side Card */}
          <aside className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-fit lg:sticky lg:top-20">

            {/* Price */}
            <div className="pb-4 border-b">

              <p className="text-xs text-gray-400">
                Starting from
              </p>

              <div className="flex items-center gap-1 mt-1">

                <h2 className="text-3xl font-extrabold text-teal-800">
                  ${tour.price}
                </h2>

                <span className="text-xs text-gray-500">
                  / person
                </span>

              </div>

            </div>

            {/* Included */}
            <div className="py-5 border-b">

              <h3 className="font-bold text-sm mb-3">
                What's Included
              </h3>

              <div className="space-y-2">

                {included.length > 0 ? (
                  included.map((item, index) => (
                    <p
                      key={index}
                      className="flex gap-2 text-xs text-gray-600"
                    >
                      <Check
                        size={15}
                        className="text-teal-600 shrink-0"
                      />

                      {typeof item === "string"
                        ? item
                        : item.title}
                    </p>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">
                    No information available.
                  </p>
                )}

              </div>

            </div>

            {/* Excluded */}
            <div className="py-5">

              <h3 className="font-bold text-sm mb-3">
                Not Included
              </h3>

              <div className="space-y-2">

                {excluded.length > 0 ? (
                  excluded.map((item, index) => (
                    <p
                      key={index}
                      className="flex gap-2 text-xs text-gray-500"
                    >
                      <X
                        size={15}
                        className="text-rose-500 shrink-0"
                      />

                      {typeof item === "string"
                        ? item
                        : item.title}
                    </p>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">
                    No information available.
                  </p>
                )}

              </div>

            </div>

            {/* Safety */}
            <div className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4">

              <ShieldCheck
                size={18}
                className="text-teal-600"
              />

              Safe and secure booking

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}
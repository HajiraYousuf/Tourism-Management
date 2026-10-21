import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,

} from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 px-6 text-center relative overflow-hidden">
        <div className="relative max-w-xl mx-auto">
          <span className="text-teal-400 font-bold text-xs uppercase tracking-widest bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-black mt-3">
            Contact <span className="text-teal-400">Us</span>
          </h1>
          <p className="text-slate-300 text-sm mt-2">
            Have questions? Reach out to our team anytime.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: 1 DIV fadhida dhammaan Contact Info-ga */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <h3 className="font-bold text-slate-900 text-lg border-b pb-3">Contact Details</h3>
            
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Location</p>
                <p className="text-xs text-slate-500 mt-0.5">123 Travel Avenue, Somaliland</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Phone</p>
                <p className="text-xs text-slate-500 mt-0.5">+252 (0) 63 0000000</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Email</p>
                <p className="text-xs text-slate-500 mt-0.5">support@tourism.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl flex-shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Working Hours</p>
                <p className="text-xs text-slate-500 mt-0.5">Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Right Column: Name, Phone, Message uun */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-2">
              <MessageSquare size={16} /> Send Message
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              How Can We Help?
            </h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+252 ..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md transition"
              >
                Send Message <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
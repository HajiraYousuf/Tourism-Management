import { Link } from "react-router-dom";
import { Globe2, Compass, Heart, ShieldCheck, MapPin, ArrowRight, Plane, Users, Award, Target, Eye } from "lucide-react";

const About = () => {
  const features = [
    { icon: <Globe2 size={24} />, title: "Explore World", desc: "Discover beautiful destinations and unique cultural experiences." },
    { icon: <ShieldCheck size={24} />, title: "Trusted Services", desc: "Reliable travel info and a completely smooth booking experience." },
    { icon: <Heart size={24} />, title: "Travel Passion", desc: "Every journey creates unforgettable memories that last forever." },
    { icon: <Compass size={24} />, title: "Easy Planning", desc: "Convenient tools to plan your next adventure hassle-free." },
  ];

  const stats = [
    { number: "50+", label: "Destinations", icon: <MapPin size={20} /> },
    { number: "1K+", label: "Travelers", icon: <Users size={20} /> },
    { number: "100+", label: "Packages", icon: <Plane size={20} /> },
    { number: "24/7", label: "Support", icon: <Award size={20} /> },
  ];

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      {/* Hero */}
      <section className="relative h-[420px] flex items-center justify-center bg-slate-900 text-white text-center px-6">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative max-w-3xl">
          <span className="text-teal-400 text-xs font-bold uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">Discover Us</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4">Making Every Journey <span className="text-teal-400">Unforgettable</span></h1>
          <p className="text-slate-300 mt-3 text-sm md:text-base max-w-xl mx-auto">We help you explore amazing places, experience rich cultures, and create lifelong memories.</p>
          <Link to="/destinations" className="inline-flex items-center gap-2 mt-6 bg-teal-600 hover:bg-teal-500 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition">
            Explore Destinations <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 grid grid-cols-2 md:grid-cols-4 p-6 gap-4 text-center">
          {stats.map((s, i) => (
            <div key={i} className="p-2">
              <div className="text-teal-600 flex justify-center mb-1">{s.icon}</div>
              <p className="text-2xl font-extrabold text-slate-900">{s.number}</p>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are & Mission */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800" alt="Travel" className="rounded-2xl h-80 w-full object-cover shadow-lg" />
        <div>
          <span className="text-teal-600 font-bold text-xs uppercase tracking-wider">Who We Are</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">Your Journey Begins With Us</h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">Welcome to our Tourism Management System. We make travel planning effortless, connecting you to top destinations and unforgettable travel experiences.</p>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl">
              <Target className="text-teal-600 mb-2" size={20} />
              <h4 className="font-bold text-sm">Our Mission</h4>
              <p className="text-xs text-slate-500 mt-1">To simplify travel booking with total confidence.</p>
            </div>
            <div className="p-4 bg-slate-100 border border-slate-200/60 rounded-xl">
              <Eye className="text-slate-700 mb-2" size={20} />
              <h4 className="font-bold text-sm">Our Vision</h4>
              <p className="text-xs text-slate-500 mt-1">To inspire global exploration for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-100/60 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-teal-600 font-bold text-xs uppercase">Why Choose Us</span>
            <h2 className="text-2xl font-bold mt-1">What Makes Us Special</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="font-bold text-base">{f.title}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-teal-800 text-white rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold">The World Is Waiting For You</h2>
          <p className="text-teal-100 text-sm mt-2 max-w-md mx-auto">Start planning your next adventure today with ease.</p>
          <Link to="/destinations" className="inline-flex items-center gap-2 mt-6 bg-white text-teal-800 px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-50 transition">
            Explore Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
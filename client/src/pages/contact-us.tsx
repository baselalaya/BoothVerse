import Navigation from "@/components/navigation";
import FooterSection from "@/components/footer-section";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Clock, MapPin, Phone as PhoneIcon } from "lucide-react";
import { useState } from "react";

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    message: "",
  });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Hook up to your backend/email later
    alert("Thanks! We received your message and will be in touch.");
  }

  return (
    <div className="relative min-h-screen text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(112,66,210,0.12),transparent_60%),radial-gradient(60%_40%_at_80%_100%,rgba(34,212,253,0.10),transparent_60%)]" />
      <Navigation />
      <main className="relative z-10">
        {/* Hero */}
        <section className="relative w-full overflow-hidden min-h-[70vh] text-center mb-12 rounded-[28px] flex items-center justify-center">
          <div className="absolute inset-0 -z-10 opacity-30 overflow-hidden">
            <video className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] md:w-[177.78vw] md:h-[56.25vw] max-w-none" autoPlay muted loop playsInline>
              <source src="/videos/contact-hero.mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,0.85)_10%,rgba(0,0,0,0)_40%,rgba(0,0,0,0)_60%,rgba(0,0,0,0.85)_90%,rgba(0,0,0,1)_100%)]" />
            <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_82%)]" />
          </div>
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 lg:py-28 min-h-[70vh] flex flex-col items-center justify-center">
                        <div className="mt-6 mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white/90 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgba(112,66,210,0.25)] ring-1 ring-inset ring-[#7042D2]/25">
                14 Years Experience Since 2011
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black gradient-text px-3">Ready to activate your brand?</h1>
            <p className="text-lg md:text-xl text-white/85 mt-4 max-w-3xl mx-auto px-3">Let’s create something extraordinary together.</p>

          </div>
        </section>

        {/* Get Your Quote (Form) */}
        <section className="max-w-7xl mx-auto px-6 mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Get Your Quote</h2>
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm text-white/80 mb-1">Full Name *</label>
                <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7042D2]" placeholder="Jane Doe" />
              </div>
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm text-white/80 mb-1">Email Address *</label>
                <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7042D2]" placeholder="you@company.com" />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Phone Number</label>
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7042D2]" placeholder="+971 4 44 88 563" />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Company</label>
                <input value={form.company} onChange={(e) => update("company", e.target.value)} className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7042D2]" placeholder="Your Company" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/80 mb-1">Product Interest</label>
                <select value={form.product} onChange={(e) => update("product", e.target.value)} className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7042D2]">
                  <option value="">Select a product</option>
                  <option>Iboothme X</option>
                  <option>Cabine X</option>
                  <option>Glossbooth X</option>
                  <option>AI Technology</option>
                  <option>Personalised Merch</option>
                  <option>Robotics</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/80 mb-1">Message</label>
                <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={6} className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7042D2]" placeholder="Tell us about your event or activation needs…" />
              </div>
              <div className="md:col-span-2 mt-2">
                <Button type="submit" variant="creativePrimary" size="lg">Send Message</Button>
              </div>
            </form>
          </div>
          {/* Offices */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-semibold mb-2">Our Offices</h3>
            <OfficeCard title="UAE" address="Mazaya Business Avenue AA1, 1402, Jumeirah Lakes Towers, Dubai, UAE" phone="+971 4 44 88 563" />
            <OfficeCard title="Qatar" address="Al Mirqab Complex, Ground Floor, Office 01, Doha, Qatar" phone="+974 4001 7012" />
            <OfficeCard title="Saudi Arabia" address="Spring Towers, 3rd Floor, Office 314, Building B, Riyadh, KSA" phone="+966 53 168 5546" />
          </div>
        </section>

        {/* Quick Contact */}
        <section className="max-w-7xl mx-auto px-6 mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickInfo label="Email" value="info@iboothme.com" />
          <QuickInfo label="Phone" value="+971 4 44 88 563" />
          <QuickInfo label="Hours" value="Sun – Thu: 9:00 AM – 6:00 PM" />
        </section>

        {/* Stats */}
        <section className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[
            { k: "14", v: "Years Experience" },
            { k: "45K+", v: "Activations Powered" },
            { k: "AI First", v: "Technology" },
            { k: "Custom", v: "Solutions" },
          ].map((s, i) => (
            <div key={i} className="relative rounded-3xl lg:rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center overflow-hidden transition-all duration-500 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 hover:border-white/20">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_60px_at_50%_0%,rgba(255,255,255,0.12),transparent)]" />
              <div className="text-3xl md:text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">{s.k}</div>
              <div className="text-sm md:text-base text-white/70 tracking-wide uppercase">{s.v}</div>
            </div>
          ))}
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

function OfficeCard({ title, address, phone }: { title: string; address: string; phone: string }) {
  return (
    <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-5 overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18)_0%,transparent_28%,transparent_72%,rgba(255,255,255,0.09)_100%)] opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:translate-y-[-2%]" />
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex items-center justify-center w-8 h-8 text-white/90">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-white/80 text-sm mt-1 mb-2 leading-relaxed max-w-prose">{address}</div>
          <a href={`tel:${phone.replace(/\s+/g,'')}`} className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white">
            <PhoneIcon className="w-4 h-4" />
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
}

function QuickInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 text-center overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_18px_60px_rgba(0,0,0,0.35)] hover:-translate-y-[2px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18)_0%,transparent_28%,transparent_72%,rgba(255,255,255,0.09)_100%)] opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:translate-y-[-2%]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_60px_at_50%_0%,rgba(255,255,255,0.12),transparent)]" />
      <div className="flex flex-col items-center gap-2">
        <span aria-hidden className="inline-flex items-center justify-center w-10 h-10 text-white/90">
          {label.toLowerCase().includes('email') ? (
            <Mail className="w-5 h-5" />
          ) : label.toLowerCase().includes('phone') ? (
            <Phone className="w-5 h-5" />
          ) : (
            <Clock className="w-5 h-5" />
          )}
        </span>
        <div className="text-xs uppercase tracking-wide text-white/70">{label}</div>
        {label.toLowerCase().includes('email') ? (
          <a href={`mailto:${value}`} className="text-xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 underline-offset-4 hover:underline">
            {value}
          </a>
        ) : label.toLowerCase().includes('phone') ? (
          <a href={`tel:${value.replace(/\s+/g,'')}`} className="text-xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 underline-offset-4 hover:underline">
            {value}
          </a>
        ) : (
          <div className="text-xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">{value}</div>
        )}
      </div>
    </div>
  );
}

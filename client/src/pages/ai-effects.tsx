import Navigation from "@/components/navigation";
import FooterSection from "@/components/footer-section";
import Seo from "@/components/seo";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "wouter";
import { applySeoToHead, fetchSeoConfig } from "@/lib/seoOverride";
import { apiRequest } from "@/lib/queryClient";
import { getStoredUtm } from "@/lib/utm";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/ga";
import { validateLeadBasics } from "@/lib/validation";
import Breadcrumbs from "@/components/breadcrumbs";
import { Search, ChevronDown } from "lucide-react";

type Effect = { title: string; tag: string; img1: string; img2: string };

// Using locally downloaded assets under `/images`
const allEffects: Effect[] = [
  {
    title: "Stained Glass",
    tag: "Technology & Digital",
    img1: "/images/ai-effects-02-c681ffa8-902d-4cee-acbb-23da392bb58a.jpg",
    img2: "/images/ai-effects-03-6ff3be51-a401-428c-bb06-3519b3dc824d.jpeg",
  },
  {
    title: "GTA",
    tag: "Brand Specific",
    img1: "/images/ai-effects-12-abc87399-46e6-4499-94a5-24099adc2d0f.jpg",
    img2: "/images/ai-effects-14-e92e477d-7a05-4303-9270-f2c302c099a8.jpg",
  },
  {
    title: "Muppet style",
    tag: "Product Integration",
    img1: "/images/ai-effects-21-5c0c2ccf-7798-45b3-a915-aeb91c58b5b2.jpeg",
    img2: "/images/ai-effects-22-f0a318a5-a6cd-485b-9222-456a55d6d754.jpg",
  },
  {
    title: "Simpson Style",
    tag: "Creative & Artistic",
    img1: "/images/ai-effects-14-e92e477d-7a05-4303-9270-f2c302c099a8.jpg",
    img2: "/images/ai-effects-13-8f9358bf-adeb-4445-96c5-60d3413cffc1.jpeg",
  },
  {
    title: "Christmas",
    tag: "Seasonal & Events",
    img1: "/images/ai-effects-04-85a30eff-f9da-4408-a2b3-3d903af49864.jpg",
    img2: "/images/ai-effects-05-a204058a-88d8-4042-8b34-42528d195155.jpeg",
  },
  {
    title: "Sketch",
    tag: "Automotive & Transportation",
    img1: "/images/ai-effects-12-abc87399-46e6-4499-94a5-24099adc2d0f.jpg",
    img2: "/images/ai-effects-25-34e87f0a-8b2e-4762-92fc-12aa5c136feb.jpg",
  },
  {
    title: "Be Old",
    tag: "Automotive & Transportation",
    img1: "/images/ai-effects-11-578f1090-db2e-432a-a318-cc95d5f9877c.jpeg",
    img2: "/images/ai-effects-10-6697ad3c-9d76-439a-8b77-f4327ef98124.jpg",
  },
  {
    title: "Zombie",
    tag: "Technology & Digital",
    img1: "/images/ai-effects-10-6697ad3c-9d76-439a-8b77-f4327ef98124.jpg",
    img2: "/images/ai-effects-08-b978f07a-8d24-419e-84d9-4488cc9e0281.jpg",
  },
  {
    title: "Ken",
    tag: "Fashion & Beauty",
    img1: "/images/ai-effects-15-15dbc957-a9da-4d77-9674-2e971ba7b014.jpeg",
    img2: "/images/ai-effects-16-691e3667-7c26-459e-9ba7-bd00e258c34a.jpg",
  },
  {
    title: "Cartoon Self",
    tag: "Brand Specific",
    img1: "/images/ai-effects-13-8f9358bf-adeb-4445-96c5-60d3413cffc1.jpeg",
    img2: "/images/ai-effects-24-87a3ecd1-8012-4fff-b172-0fd869fb98d0.jpg",
  },
  {
    title: "Illustration Art",
    tag: "Automotive & Transportation",
    img1: "/images/ai-effects-25-34e87f0a-8b2e-4762-92fc-12aa5c136feb.jpg",
    img2: "/images/ai-effects-18-4d0d7820-be91-4c28-a548-be1941e53889.jpg",
  },
  {
    title: "Bricks Toy",
    tag: "Seasonal & Events",
    img1: "/images/ai-effects-24-87a3ecd1-8012-4fff-b172-0fd869fb98d0.jpg",
    img2: "/images/ai-effects-20-da89e045-5c62-44a0-a935-45af62a096ea.jpg",
  },
];

const filters = [
  "All",
  "Technology & Digital",
  "Brand Specific",
  "Product Integration",
  "Creative & Artistic",
  "Seasonal & Events",
  "Automotive & Transportation",
  "Fashion & Beauty",
  "UAE & Middle East",
];

export default function AiEffectsGallery() {
  useEffect(() => {
    (async () => {
      const cfg = await fetchSeoConfig("/ai-effects");
      if (cfg) applySeoToHead(cfg);
    })();
  }, []);
  const [loc, setLoc] = useLocation();
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const initialTag = searchParams.get("tag") || "All";
  const [active, setActive] = useState(initialTag);

  // Sync to URL when filter changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (active && active !== "All") {
      url.searchParams.set("tag", active);
    } else {
      url.searchParams.delete("tag");
    }
    // Avoid full reload in SPA by using history API
    window.history.replaceState(null, "", url.toString());
  }, [active]);

  const items = useMemo(
    () =>
      active === "All"
        ? allEffects
        : allEffects.filter((e) => e.tag === active),
    [active]
  );
  const [limit, setLimit] = useState(12);
  const [open, setOpen] = useState<{
    title: string;
    tag: string;
    img: string;
  } | null>(null);
  const { toast } =
    useToast?.() || ({ toast: (args: any) => console.log(args) } as any);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    eventDate: "",
    eventType: "",
    guests: "",
    duration: "",
    location: "",
    idea: "",
  });
  const [sent, setSent] = useState(false);
  function upd<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  const formRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const visible = items.slice(0, limit);
  return (
    <div className="relative min-h-screen text-white">
      <Seo
        title="AI Effects Gallery"
        description="Discover curated AI-powered effects for your next brand activation"
        canonical="/ai-effects"
      />
      <Navigation />
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Get Ideas", href: "/get-ideas" },
            { label: "AI Effects Gallery" },
          ]}
        />
        <header className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-5xl font-black">
            AI Effects Gallery
          </h1>
          <p className="text-white/80 mt-2">
            Discover curated AI-powered effects for your next brand activation
          </p>
        </header>

        {/* Mobile-optimized filters */}
        <div className="mb-8">
          <div className="sm:hidden relative">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/70"
              />
              <select
                aria-label="Filter effects"
                className="w-full appearance-none rounded-full bg-white text-black pl-10 pr-10 py-3 text-sm font-semibold border border-white/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={active}
                onChange={(e) => setActive(e.target.value)}
              >
                {filters.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/70"
              />
            </div>
          </div>
          <div className="hidden sm:flex flex-wrap gap-3 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
                  active === f
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-white border-white/20 hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((e, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-2xl bg-white/5 text-white border border-white/10 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative group aspect-video bg-black overflow-hidden rounded-b-none">
                <img
                  src={e.img1}
                  alt={e.title}
                  className="w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                />
                <img
                  src={e.img2}
                  alt={e.title + " alternate"}
                  className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              </div>
              <div className="px-4 pt-4 pb-3">
                <h3 className="font-semibold text-base md:text-lg leading-tight text-white/90">
                  {e.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm mt-1">
                  Tags: {e.tag}
                </p>
              </div>
              <div className="p-4 pt-0">
                <Button
                  onClick={() =>
                    setOpen({ title: e.title, tag: e.tag, img: e.img1 })
                  }
                  variant="creativePrimary"
                  className="w-full"
                >
                  I like it
                </Button>
              </div>
            </article>
          ))}
        </section>

        <div className="flex justify-center mt-8">
          {limit < items.length ? (
            <button
              onClick={() => setLimit((l) => l + 12)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/90 hover:text-white hover:border-white"
            >
              View More
            </button>
          ) : null}
        </div>

        {open &&
          createPortal(
            <div className="fixed inset-0 z-[9999] grid min-h-screen place-items-center p-4">
              <div
                className="absolute inset-0 bg-black/70"
                onClick={() => setOpen(null)}
              />
              <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl will-change-transform">
                <button
                  aria-label="Close"
                  className="absolute top-3 right-3 z-20 h-10 w-10 rounded-full bg-white/90 text-black grid place-items-center shadow"
                  onClick={() => setOpen(null)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-900/95 via-neutral-900/80 to-black/90" />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(147,51,234,0.08),rgba(59,130,246,0.06))]" />
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_-10%,rgba(255,255,255,0.06),transparent_45%)]" />
                <div className="absolute inset-0 -z-10 bg-[url('/images/noise.svg')] opacity-10 mix-blend-overlay" />
                <div className="p-4 sm:p-7 md:p-8">
                  <header className="mb-5">
                    <h3 className="text-2xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-white to-pink-200">
                      Let's Create Something Extraordinary
                    </h3>
                    <p className="text-white/85 text-sm mt-1">
                      Tell us your vision, and we’ll craft a custom activation.
                    </p>
                  </header>
                  <div className="rounded-xl bg-white/5 border border-white/10 ring-1 ring-white/10 p-3 sm:p-5 mb-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={open.img}
                        alt={open.title}
                        className="h-12 w-12 rounded-lg object-cover shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div>
                        <div className="text-white/95 font-semibold leading-snug">
                          {open.title}
                        </div>
                        <div className="text-white/70 text-xs">
                          Tags: {open.tag}
                        </div>
                      </div>
                    </div>
                  </div>
                  <form
                    ref={formRef}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      {
                        const res = validateLeadBasics({ name: form.name, email: form.email, phone: form.phone });
                        if (!res.ok) {
                          toast({ title: 'Invalid input', description: res.message, variant: 'destructive' as any });
                          return;
                        }
                      }
                      try {
                        setSending(true);
                        const params = new URLSearchParams(
                          window.location.search
                        );
                        const stored = getStoredUtm?.();
                        const packed = {
                          ideaTitle: open?.title,
                          ideaTag: open?.tag,
                          ideaNotes: form.idea,
                          eventDate: form.eventDate,
                          eventType: form.eventType,
                          guests: form.guests,
                          duration: form.duration,
                          location: form.location,
                        };
                        await apiRequest("POST", "/api/leads", {
                          name: form.name.trim(),
                          email: form.email.trim(),
                          phone: form.phone.trim() || undefined,
                          company: form.company.trim() || undefined,
                          product: open?.title,
                          message: `[extra] ${JSON.stringify(packed)}`,
                          source_path: window.location.pathname,
                          utm_source:
                            params.get("utm_source") ||
                            stored?.utm_source ||
                            undefined,
                          utm_medium:
                            params.get("utm_medium") ||
                            stored?.utm_medium ||
                            undefined,
                          utm_campaign:
                            params.get("utm_campaign") ||
                            stored?.utm_campaign ||
                            undefined,
                          utm_term:
                            params.get("utm_term") ||
                            stored?.utm_term ||
                            undefined,
                          utm_content:
                            params.get("utm_content") ||
                            stored?.utm_content ||
                            undefined,
                          gclid:
                            params.get("gclid") || stored?.gclid || undefined,
                          fbclid:
                            params.get("fbclid") || stored?.fbclid || undefined,
                        });
                        try {
                          trackEvent("generate_lead", {
                            form_id: "ai_effects_modal",
                            method: "modal",
                            value: 1,
                            currency: "USD",
                            items: [
                              { item_id: open?.title, item_name: open?.title },
                            ],
                          });
                        } catch {}
                        toast({
                          title: "Request sent",
                          description: "We will contact you shortly.",
                        });
                        setSent(true);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          eventDate: "",
                          eventType: "",
                          guests: "",
                          duration: "",
                          location: "",
                          idea: "",
                        });
                      } catch (err: any) {
                        toast({
                          title: "Failed to send",
                          description: err?.message || "Please try again.",
                          variant: 'destructive' as any,
                        });
                      } finally {
                        setSending(false);
                      }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                  >
                    {/* Row 1 */}
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-wide text-white/70">
                        Full Name
                      </span>
                      <input
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => upd("name", e.target.value)}
                        className="mt-1 w-full h-12 md:h-12 rounded-xl bg-white/95 text-black px-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-300/60"
                        placeholder="Your Full Name"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-wide text-white/70">
                        Company (optional)
                      </span>
                      <input
                        autoComplete="organization"
                        value={form.company}
                        onChange={(e) => upd("company", e.target.value)}
                        className="mt-1 w-full h-12 md:h-12 rounded-xl bg-white/95 text-black px-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-300/60"
                        placeholder="Your Company"
                      />
                    </label>
                    {/* Row 2 */}
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-wide text-white/70">
                        Email
                      </span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => upd("email", e.target.value)}
                        className="mt-1 w-full h-12 md:h-12 rounded-xl bg-white/95 text-black px-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-300/60"
                        placeholder="your@email.com"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-wide text-white/70">
                        Phone Number
                      </span>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => upd("phone", e.target.value)}
                        className="mt-1 w-full h-12 md:h-12 rounded-xl bg-white/95 text-black px-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-300/60"
                        placeholder="Phone Number"
                      />
                    </label>
                    {/* Row 3: triplet as nested full-width grid */}
                    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-1">
                      <select
                        value={form.eventType}
                        onChange={(e) => upd("eventType", e.target.value)}
                        className="h-12 md:h-12 rounded-full bg-white/95 text-black px-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-300/60"
                      >
                        <option>Select Event Type</option>
                        <option>Corporate</option>
                        <option>Retail</option>
                        <option>Festival</option>
                      </select>
                      <input
                        inputMode="numeric"
                        value={form.guests}
                        onChange={(e) => upd("guests", e.target.value)}
                        className="h-12 md:h-12 rounded-full bg-white/95 text-black px-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-300/60"
                        placeholder="Expected Guests"
                      />
                      <input
                        value={form.duration}
                        onChange={(e) => upd("duration", e.target.value)}
                        className="h-12 md:h-12 rounded-full bg-white/95 text-black px-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-300/60"
                        placeholder="Duration (e.g., 4 hours)"
                      />
                    </div>
                    {/* Row 4: Date + Location in two columns */}
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-wide text-white/70">
                        Event Date
                      </span>
                      <input
                        type="date"
                        value={form.eventDate}
                        onChange={(e) => upd("eventDate", e.target.value)}
                        className="mt-1 w-full h-11 rounded-xl bg-white/95 text-black px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-purple-300/60"
                      />
                    </label>
                    <div className="block">
                      <span className="text-[11px] uppercase tracking-wide text-white/70">
                        Event Location
                      </span>
                      <input
                        autoComplete="address-level1"
                        value={form.location}
                        onChange={(e) => upd("location", e.target.value)}
                        className="mt-1 w-full h-11 rounded-xl bg-white/95 text-black px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-purple-300/60"
                        placeholder="Event Location"
                      />
                    </div>
                    {/* Row 6: idea full width */}
                    <div className="sm:col-span-2">
                      <label className="text-[11px] uppercase tracking-wide text-white/70">
                        Got a Bold Idea?
                      </label>
                      <textarea
                        value={form.idea}
                        onChange={(e) => upd("idea", e.target.value)}
                        className="mt-1 w-full h-32 rounded-xl bg-white/95 text-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-300/60"
                        placeholder="Describe your idea..."
                      />
                    </div>
                    {sent ? (
                      <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-200">
                        Thank you! Your request has been received. We’ll get
                        back to you shortly.
                      </div>
                    ) : null}
                  </form>
                  {/* Actions moved outside form: trigger submit via requestSubmit() */}
                  <div className="mt-5 pt-4 border-t border-white/10 -mx-4 sm:-mx-6 w-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full px-4 sm:px-6">
                      <div className="sm:col-start-1 sm:col-end-2">
                        <button
                          type="button"
                          onClick={() => setOpen(null)}
                          className="w-full px-4 py-2 rounded-full border border-white/25 text-white/90 hover:bg-white/10"
                        >
                          {sent ? "Close" : "Cancel"}
                        </button>
                      </div>
                      {!sent && (
                        <div className="sm:col-start-2 sm:col-end-3">
                          <Button
                            type="button"
                            onClick={() => formRef.current?.requestSubmit()}
                            disabled={sending}
                            variant="creativePrimary"
                            className="w-full rounded-full px-6"
                          >
                            {sending ? "Sending…" : "Send Request"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>,
            document.body
          )}
      </main>
      <FooterSection />
    </div>
  );
}

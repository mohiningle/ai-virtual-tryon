import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import hero from "@/assets/hero.jpg";
import { Nav, Footer } from "@/components/Nav";
import { DRESSES } from "@/lib/dresses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fitzy — AI Virtual Dress Try-On" },
      { name: "description", content: "Upload your photo and instantly see yourself wearing any dress with photorealistic AI. Shop smarter." },
      { property: "og:title", content: "Fitzy — AI Virtual Dress Try-On" },
      { property: "og:description", content: "See it on you before you buy." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-gradient-soft overflow-hidden">
      <Nav />

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Powered by AI
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6"
          >
            See it <span className="text-gradient italic">on you</span>.<br />
            Before you buy.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-lg mb-8"
          >
            Upload a photo. Pick a dress. Watch yourself wear it in seconds — photorealistic, no fitting room required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/try-on" className="rounded-full px-8 py-4 bg-foreground text-background font-bold hover:scale-105 transition shadow-pop">
              Try it free →
            </Link>
            <Link to="/catalog" className="rounded-full px-8 py-4 border-2 border-foreground font-bold hover:bg-foreground hover:text-background transition">
              Browse dresses
            </Link>
          </motion.div>

          <div className="flex items-center gap-6 mt-12 text-sm text-muted-foreground">
            <div><span className="font-extrabold text-foreground text-2xl">2M+</span><br/>try-ons</div>
            <div><span className="font-extrabold text-foreground text-2xl">98%</span><br/>love it</div>
            <div><span className="font-extrabold text-foreground text-2xl">10s</span><br/>average</div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-wild rounded-[3rem] blur-3xl opacity-50 animate-pulse" />
            <img src={hero} alt="Model in vibrant dress" width={1536} height={1536} className="relative rounded-[2rem] shadow-glow w-full" />
            <motion.div
              animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-4 shadow-pop border-2 border-foreground"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent" />
                <div>
                  <div className="text-xs text-muted-foreground">Just tried on</div>
                  <div className="font-bold text-sm">Pink Satin Slip ✨</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-accent text-foreground rounded-full px-5 py-3 font-extrabold shadow-pop border-2 border-foreground"
            >
              YESS 💅
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-foreground text-background py-6 overflow-hidden border-y-2 border-foreground">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 font-display font-extrabold text-3xl">
              <span>NO MORE GUESSING</span><span className="text-accent">★</span>
              <span>RETURN LESS</span><span className="text-accent">★</span>
              <span>SHOP CONFIDENT</span><span className="text-accent">★</span>
              <span>AI MAGIC</span><span className="text-accent">★</span>
              <span>YOUR FACE, NEW FIT</span><span className="text-accent">★</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-4">How it <span className="text-gradient italic">works</span></h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">Three steps. Ten seconds. Pure magic.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "01", t: "Upload your selfie", d: "Snap or pick a clear front-facing photo. Any background.", c: "bg-magenta" },
            { n: "02", t: "Pick a dress", d: "Browse our curated drops. Your style, your way.", c: "bg-electric" },
            { n: "03", t: "See yourself slay", d: "Our AI dresses you in seconds. Photorealistic.", c: "bg-sunshine" },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-3xl p-8 border-2 border-foreground shadow-pop hover:-translate-y-2 transition"
            >
              <div className={`inline-block ₹{s.c} text-foreground font-display font-extrabold text-3xl rounded-2xl px-4 py-2 mb-6`}>{s.n}</div>
              <h3 className="text-2xl font-extrabold mb-2">{s.t}</h3>
              <p className="text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED DRESSES */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-5xl md:text-6xl font-extrabold">This drop <span className="text-gradient italic">slaps</span></h2>
          <Link to="/catalog" className="hidden md:inline-flex font-bold hover:text-primary">See all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {DRESSES.slice(0, 6).map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to="/try-on" search={{ dress: d.id } as any} className="block group">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-muted mb-3 border-2 border-foreground">
                  <img src={d.image} alt={d.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold">{d.name}</h3>
                  <span className="font-extrabold">₹{d.price}</span>
                </div>
                <span className="text-xs text-muted-foreground">{d.vibe}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="rounded-[2.5rem] bg-gradient-hero p-12 md:p-20 text-center border-2 border-foreground shadow-pop relative overflow-hidden">
          <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-foreground animate-float" />
          <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-background animate-float" style={{ animationDelay: "1s" }} />
          <h2 className="text-5xl md:text-7xl font-extrabold text-background mb-6 relative">Ready to slay?</h2>
          <p className="text-background/90 text-xl mb-8 max-w-xl mx-auto relative">Your closet just got infinite. Try any dress on yourself in seconds.</p>
          <Link to="/try-on" className="relative inline-block rounded-full px-10 py-5 bg-foreground text-background font-extrabold text-lg hover:scale-105 transition">
            Start trying on →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

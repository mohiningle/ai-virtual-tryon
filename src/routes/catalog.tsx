import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav, Footer } from "@/components/Nav";
import { DRESSES } from "@/lib/dresses";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Shop Dresses — Fitzy" },
      { name: "description", content: "Curated dresses you can virtually try on before buying. Bold, playful, and ready for anything." },
      { property: "og:title", content: "Shop Dresses — Fitzy" },
      { property: "og:description", content: "Curated dresses you can try on with AI." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Nav />
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <h1 className="text-6xl md:text-8xl font-extrabold mb-4">The <span className="text-gradient italic">drop</span></h1>
        <p className="text-lg text-muted-foreground max-w-xl">Hand-picked dresses, virtually try-able. Tap any to see it on you.</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DRESSES.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <Link to="/try-on" search={{ dress: d.id } as any} className="block">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-muted border-2 border-foreground shadow-pop">
                  <img src={d.image} alt={d.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute top-4 left-4 bg-background rounded-full px-3 py-1 text-xs font-bold border border-foreground">
                    {d.vibe}
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition flex items-end justify-center p-6 opacity-0 group-hover:opacity-100">
                    <span className="rounded-full bg-background text-foreground px-6 py-3 font-extrabold">Try on me ✨</span>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <h3 className="font-extrabold text-xl">{d.name}</h3>
                    <p className="text-sm text-muted-foreground">{d.color}</p>
                  </div>
                  <span className="font-extrabold text-2xl">₹{d.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/Nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Fitzy" },
      { name: "description", content: "Fitzy is the AI virtual fitting room — try any dress on yourself in seconds." },
      { property: "og:title", content: "About Fitzy" },
      { property: "og:description", content: "We're rewriting the fitting room with AI." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Nav />
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-6xl md:text-8xl font-extrabold mb-8">We hate <span className="text-gradient italic">returns</span>.</h1>
        <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
          Fitzy is the AI fitting room you've always wanted. Upload a selfie, pick a dress, and our model dresses you in seconds — photorealistic, instant, free.
        </p>
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          Our mission: make online dress shopping as confident as walking into a boutique. Less waste. More slay.
        </p>
        <div className="grid md:grid-cols-3 gap-6 my-16">
          {[
            { v: "30%", l: "fewer returns" },
            { v: "10s", l: "to try on" },
            { v: "∞", l: "outfits to test" },
          ].map((s) => (
            <div key={s.l} className="bg-card rounded-3xl p-8 border-2 border-foreground shadow-pop text-center">
              <div className="font-display font-extrabold text-6xl text-gradient">{s.v}</div>
              <div className="mt-2 font-bold">{s.l}</div>
            </div>
          ))}
        </div>
        <Link to="/try-on" className="inline-block rounded-full px-8 py-4 bg-foreground text-background font-extrabold hover:scale-105 transition shadow-pop">
          Try Fitzy now →
        </Link>
      </section>
      <Footer />
    </div>
  );
}

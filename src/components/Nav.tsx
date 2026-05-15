import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-block w-8 h-8 rounded-full bg-gradient-hero animate-spin-slow" />
          <span className="font-display font-extrabold text-2xl tracking-tight">FITZY</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link to="/" activeProps={{ className: "text-primary" }} className="hover:text-primary transition">Home</Link>
          <Link to="/catalog" activeProps={{ className: "text-primary" }} className="hover:text-primary transition">Shop</Link>
          <Link to="/try-on" activeProps={{ className: "text-primary" }} className="hover:text-primary transition">Try On</Link>
          <Link to="/about" activeProps={{ className: "text-primary" }} className="hover:text-primary transition">About</Link>
        </nav>
        <Link
          to="/try-on"
          className="rounded-full px-5 py-2.5 bg-foreground text-background font-bold text-sm hover:bg-primary transition shadow-pop"
        >
          Try it →
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="font-display text-4xl font-extrabold mb-4">FITZY</h3>
          <p className="opacity-70 max-w-sm">See it on you before you buy. AI-powered virtual try-on for the dresses you actually love.</p>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2 opacity-70 text-sm">
            <li>New arrivals</li><li>Bestsellers</li><li>Sale</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">Help</h4>
          <ul className="space-y-2 opacity-70 text-sm">
            <li>Contact</li><li>Size guide</li><li>Returns</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 py-6 text-center text-xs opacity-50">© 2026 Fitzy. All rights reserved.</div>
    </footer>
  );
}

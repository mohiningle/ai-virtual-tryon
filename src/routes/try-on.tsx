import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav, Footer } from "@/components/Nav";
import { DRESSES } from "@/lib/dresses";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/try-on")({
  head: () => ({
    meta: [
      { title: "Virtual Try-On — Fitzy" },
      { name: "description", content: "Upload your photo and try any dress in seconds with photorealistic AI." },
      { property: "og:title", content: "Virtual Try-On — Fitzy" },
      { property: "og:description", content: "Try any dress on yourself with AI." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({ dress: (s.dress as string) || "" }),
  component: TryOn,
});

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function urlToDataUrl(url: string): Promise<string> {
  const r = await fetch(url);
  const blob = await r.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function TryOn() {
  const { dress: initial } = Route.useSearch();
  const [photo, setPhoto] = useState<string | null>(null);
  const [dressId, setDressId] = useState<string>(initial || DRESSES[0].id);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const dress = DRESSES.find((d) => d.id === dressId)!;

  useEffect(() => { if (initial) setDressId(initial); }, [initial]);

  const onUpload = async (f: File) => {
    if (f.size > 8 * 1024 * 1024) {
      toast.error("Image too large. Please use one under 8MB.");
      return;
    }
    setPhoto(await fileToDataUrl(f));
    setResult(null);
  };

  const tryOn = async () => {
    if (!photo) { toast.error("Upload your photo first"); return; }
    setLoading(true);
    setResult(null);
    try {
      const garmentImage = await urlToDataUrl(dress.image);
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const apiKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/try-on`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          apikey: apiKey,
        },
        body: JSON.stringify({ personImage: photo, garmentImage, garmentName: dress.name }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }
      setResult(data.image);
      toast.success("Looking good! 💅");
    } catch (e) {
      toast.error("Network error. Try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Toaster />
      <Nav />
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-3">Virtual <span className="text-gradient italic">try-on</span></h1>
        <p className="text-muted-foreground mb-12 text-lg">Upload your photo. Pick a dress. AI does the rest.</p>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Photo */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-3xl border-2 border-foreground shadow-pop p-6">
              <h2 className="font-extrabold text-xl mb-4">1. Your photo</h2>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="aspect-[3/4] w-full rounded-2xl border-2 border-dashed border-foreground/30 hover:border-primary hover:bg-primary/5 transition flex items-center justify-center overflow-hidden bg-muted"
              >
                {photo ? (
                  <img src={photo} alt="You" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6">
                    <div className="text-5xl mb-2">📸</div>
                    <div className="font-bold">Click to upload</div>
                    <div className="text-xs text-muted-foreground mt-1">Front-facing works best</div>
                  </div>
                )}
              </button>
              {photo && (
                <button onClick={() => fileRef.current?.click()} className="mt-3 text-sm font-bold text-primary hover:underline">
                  Change photo
                </button>
              )}
            </div>
          </div>

          {/* Dress */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-3xl border-2 border-foreground shadow-pop p-6">
              <h2 className="font-extrabold text-xl mb-4">2. Pick your fit</h2>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-muted border border-border">
                <img src={dress.image} alt={dress.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-bold">{dress.name}</span>
                <span className="font-extrabold">₹{dress.price}</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {DRESSES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => { setDressId(d.id); setResult(null); }}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ₹{dressId === d.id ? "border-primary scale-105" : "border-border hover:border-foreground"}`}
                  >
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-3xl border-2 border-foreground shadow-pop p-6">
              <h2 className="font-extrabold text-xl mb-4">3. The reveal</h2>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-wild relative flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="load"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-center text-background"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-background/30 border-t-background animate-spin" />
                      <div className="font-extrabold text-xl">Dressing you up...</div>
                      <div className="text-sm opacity-80 mt-1">~10 seconds</div>
                    </motion.div>
                  ) : result ? (
                    <motion.img
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      src={result} alt="Try-on result" className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-center text-background p-6"
                    >
                      <div className="text-6xl mb-3">✨</div>
                      <div className="font-extrabold text-xl">Your look will appear here</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={tryOn}
                disabled={loading || !photo}
                className="w-full mt-4 rounded-full py-4 bg-foreground text-background font-extrabold text-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition shadow-pop"
              >
                {loading ? "Generating..." : "Try it on me ✨"}
              </button>
              {result && (
                <a
                  href={result}
                  download="fitzy-tryon.png"
                  className="block text-center mt-3 text-sm font-bold text-primary hover:underline"
                >
                  Download image
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

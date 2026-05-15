import d1 from "@/assets/dress-1.jpg";
import d2 from "@/assets/dress-2.jpg";
import d3 from "@/assets/dress-3.jpg";
import d4 from "@/assets/dress-4.jpg";
import d5 from "@/assets/dress-5.jpg";
import d6 from "@/assets/dress-6.jpg";

export type Dress = {
  id: string;
  name: string;
  price: number;
  color: string;
  image: string;
  vibe: string;
};

export const DRESSES: Dress[] = [
  { id: "d1", name: "Pink Satin Slip", price: 4000, color: "Hot Pink", image: d1, vibe: "Date night" },
  { id: "d2", name: "Electric Mini", price: 3500, color: "Cobalt Blue", image: d2, vibe: "Cocktail hour" },
  { id: "d3", name: "Sunshine Pleat", price: 4000, color: "Yellow", image: d3, vibe: "Brunch" },
  { id: "d4", name: "Midnight Sequin", price: 2500, color: "Black", image: d4, vibe: "Party" },
  { id: "d5", name: "Emerald Wrap", price: 3000, color: "Green", image: d5, vibe: "Wedding guest" },
  { id: "d6", name: "indian lahanga", price: 4000, color: "Floral", image: d6, vibe: "wedding" },
];

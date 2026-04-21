export type Season = "summer" | "rainy" | "winter";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  emoji: string;
  bg: string;
}

export const seasonMeta: Record<
  Season,
  { label: string; tagline: string; icon: string }
> = {
  summer: {
    label: "Summer",
    tagline:
      "Breathable fabrics and effortless silhouettes designed for the warmest days of the year.",
    icon: "☀️",
  },
  rainy: {
    label: "Rainy",
    tagline:
      "Water-resistant layers and earthy tones crafted to keep you stylish through every downpour.",
    icon: "🌧️",
  },
  winter: {
    label: "Winter",
    tagline:
      "Luxurious knits and tailored coats engineered for warmth without sacrificing elegance.",
    icon: "❄️",
  },
};

export const productsBySeason: Record<Season, Product[]> = {
  summer: [
    {
      id: 101,
      name: "Sand Linen Dress",
      category: "Summer Essentials",
      price: 185.0,
      image: "/Images/Shop/summer-1.jpg",
      emoji: "👗",
      bg: "#f5f0e8",
    },
    {
      id: 102,
      name: "Pleated Trousers",
      category: "Tailored Goods",
      price: 220.0,
      image: "/Images/Shop/summer-4.jpg",
      emoji: "👖",
      bg: "#f0ede6",
    },
    {
      id: 103,
      name: "Boxy Cotton Shirt",
      category: "Essentials",
      price: 125.0,
      image: "/Images/Shop/summer-2.jpg",
      emoji: "👔",
      bg: "#ededec",
    },
    {
      id: 104,
      name: "Soft Leather Mules",
      category: "Footwear",
      price: 295.0,
      image: "/Images/Shop/summer-5.jpg",
      emoji: "👡",
      bg: "#eee9e0",
    },
  ],

  rainy: [
    {
      id: 201,
      name: "Trench Coat",
      category: "Outerwear",
      price: 395.0,
      image: "/Images/Shop/rainy-1.jpg",
      emoji: "🧥",
      bg: "#e8ece6",
    },
    {
      id: 202,
      name: "Waterproof Boots",
      category: "Footwear",
      price: 310.0,
      image: "/Images/Shop/rainy-2.jpg",
      emoji: "🥾",
      bg: "#e5e8e3",
    },
    {
      id: 203,
      name: "Ribbed Turtleneck",
      category: "Knitwear",
      price: 145.0,
      image: "/Images/Shop/rainy-3.jpg",
      emoji: "🧤",
      bg: "#eae7e2",
    },
    {
      id: 204,
      name: "Waxed Canvas Bag",
      category: "Accessories",
      price: 265.0,
      image: "/Images/Shop/rainy-4.jpg",
      emoji: "👜",
      bg: "#e3e6e1",
    },
  ],

  winter: [
    {
      id: 301,
      name: "Cashmere Overcoat",
      category: "Winter Outerwear",
      price: 695.0,
      image: "/Images/Shop/winter-1.jpg",
      emoji: "🧣",
      bg: "#ece8e3",
    },
    {
      id: 302,
      name: "Merino Wool Sweater",
      category: "Knitwear",
      price: 275.0,
      image: "/Images/Shop/winter-2.jpg",
      emoji: "🧥",
      bg: "#e8e4df",
    },
    {
      id: 303,
      name: "Leather Chelsea Boots",
      category: "Winter Footwear",
      price: 445.0,
      image: "/Images/Shop/winter-3.jpg",
      emoji: "👢",
      bg: "#e4e0da",
    },
    {
      id: 304,
      name: "Quilted Scarf",
      category: "Accessories",
      price: 165.0,
      image: "/Images/Shop/winter-4.jpg",
      emoji: "🧤",
      bg: "#ece7e1",
    },
  ],
};
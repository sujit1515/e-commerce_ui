import { ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Home Essentials",
    desc: "Timeless pieces for modern living",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85",
  },
  {
    name: "Premium Apparel",
    desc: "Crafted from sustainable fabrics",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  },
  {
    name: "Luxury Accessories",
    desc: "The finishing touch for any style",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85",
  },
];

export default function Categories() {
  return (
    <section className="w-screen px-4 md:px-8 lg:px-8 py-10 md:py-14">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Shop by Category
        </h2>
        <a
          href="#"
          className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline"
        >
          View All Categories <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer group"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Text */}
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-white text-lg md:text-xl font-bold">
                {cat.name}
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                {cat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
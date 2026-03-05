const products = [
  {
    id: 1,
    name: "Classic Linen Tee",
    variant: "Optic White",
    price: 750,
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=900&q=85",
  },
  {
    id: 2,
    name: "Urban Runner Elite",
    variant: "Crimson Mesh",
    price: 1500,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85",
  },
  {
    id: 3,
    name: "Chronos Leather Watch",
    variant: "Heritage Brown",
    price: 999,
    img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=85",
  },
  {
    id: 4,
    name: "SoundPro Studio Max",
    variant: "Midnight Black",
    price: 1299,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85",
  },
];

export default function BestSellers() {
  return (
    <section className="w-screen px-4 md:px-8 lg:px-8 py-10 md:py-14">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Our Best Sellers
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
          Discover our most loved pieces, chosen by our community of discerning
          enthusiasts.
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
          <div key={p.id} className="group cursor-pointer">
            <div className="rounded-2xl overflow-hidden bg-gray-50 mb-3 aspect-square">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <h3 className="font-bold text-gray-900 text-sm md:text-base">
              {p.name}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm">
              {p.variant}
            </p>
            <p className="text-blue-600 font-bold text-sm md:text-base mt-1">
              ₹{p.price}.00
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
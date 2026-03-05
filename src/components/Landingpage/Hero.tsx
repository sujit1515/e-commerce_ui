export default function Hero() {
  return (
    <section className="w-screen px-4 md:px-8 lg:px-8 py-8 md:py-12">
      <div className="w-full bg-gray-50 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&q=85"
            alt="Hero Watch"
            className="w-full h-72 md:h-[460px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 px-8 md:px-12 py-10">
          <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
            New Collection 2024
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Elevate Your <br /> Everyday
          </h1>

          <p className="text-gray-500 text-base mb-8 leading-relaxed max-w-md">
            Experience the perfect blend of sophisticated design and premium
            quality with our new seasonal curation.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-gray-900 text-white px-7 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm">
              Shop Now
            </button>
            <button className="border border-gray-300 text-gray-800 px-7 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">
              View Lookbook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
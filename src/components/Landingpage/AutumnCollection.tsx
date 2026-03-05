export default function AutumnCollection() {
  return (
    <section className="w-screen px-4 md:px-8 lg:px-8 py-6 md:py-10">

      <div className="relative w-full rounded-2xl overflow-hidden min-h-[300px] md:min-h-[380px] flex items-center bg-[#0f172a]">

        {/* Background image (right side) */}
        <div
          className="absolute right-0 inset-y-0 w-1/2 opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558618047-f4e30e9cc898?w=1400&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-8 md:px-16 py-14 max-w-xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            The Autumn <br /> Equinox Collection
          </h2>

          <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
            Celebrating the transition of light and shadow with natural textures
            and earthy tones.
          </p>

          <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">
            Explore Collection
          </button>
        </div>

      </div>
    </section>
  );
}
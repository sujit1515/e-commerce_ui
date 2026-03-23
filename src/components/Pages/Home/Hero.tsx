"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const router = useRouter();

  // Banner data with images and content
  const banners = [
    {
      id: 1,
      image: "/Images/Shop/banner-1.jpg",
      title: "EVERYDAY ELEGANCE",
      subtitle: "Comfort Meets Craftsmanship In Every Thread",
      discount: "UP TO 50% OFF",
      buttonText: "SHOP NOW ›",
      buttonAction: () => router.push('/saree/saree-section'),
    },
    {
      id: 2,
      image: "/Images/Shop/banner-2.jpg",
      title: "NEW COLLECTION",
      subtitle: "Discover Our Latest Designs",
      discount: "UP TO 40% OFF",
      buttonText: "EXPLORE ›",
      buttonAction: () => router.push('/kurtis'),
    },
    {
      id: 3,
      image: "/Images/Shop/Banner-3.jpg",
      title: "FESTIVAL SPECIAL",
      subtitle: "Celebrate in Style with Traditional Wear",
      discount: "UP TO 60% OFF",
      buttonText: "SHOP FESTIVAL ›",
      buttonAction: () => router.push('/lehenga'),
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Manual banner navigation
  const goToBanner = (index: number) => {
    setCurrentBanner(index);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section with Sliding Banners */}
      <div className="relative w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] overflow-hidden">
        {/* Banners Container */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full h-full flex-shrink-0 relative">
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={banner.image}
                  alt={`Pareenita ${banner.title}`}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center lg:justify-end px-3 xs:px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                <div className="text-center lg:text-right space-y-2 xs:space-y-3 sm:space-y-4 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                  <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif tracking-wide sm:tracking-wider text-gray-800">
                    {banner.title}
                  </h1>
                  <p className="text-[10px] xs:text-xs sm:text-sm md:text-base tracking-wide sm:tracking-wider text-gray-600 italic">
                    {banner.subtitle}
                  </p>
                  <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide sm:tracking-wider text-gray-800 font-light pt-1 xs:pt-2">
                    {banner.discount}
                  </p>
                  <button 
                    onClick={banner.buttonAction}
                    className="mt-2 xs:mt-3 sm:mt-4 md:mt-6 bg-red-800 hover:bg-red-900 text-white px-4 xs:px-5 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-2.5 md:py-3 text-[10px] xs:text-xs sm:text-sm tracking-wide sm:tracking-wider transition-colors duration-300 cursor-pointer"
                  >
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToBanner(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBanner ? 'bg-red-800 w-6' : 'bg-white/70 hover:bg-white'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => goToBanner((currentBanner - 1 + banners.length) % banners.length)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10"
          aria-label="Previous banner"
        >
          ‹
        </button>
        <button
          onClick={() => goToBanner((currentBanner + 1) % banners.length)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10"
          aria-label="Next banner"
        >
          ›
        </button>
      </div>
    </div>
  );
}
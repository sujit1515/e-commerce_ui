'use client'

import { useEffect, useState } from 'react'

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Hide preloader after minimum display time or when page is loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false)
      }, 1500) // Minimum display time
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="preloader-wrapper">
      <div className="preloader-content">
        {/* Animated Shopping Bag Icon */}
        <div className="shopping-bag-container">
          <div className="shopping-bag">
            <div className="bag-handle"></div>
            <div className="bag-body">
              <div className="bag-shine"></div>
            </div>
          </div>
        </div>

        {/* Animated Dots */}
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <span>Loading</span>
        </div>
      </div>
    </div>
  )
}

export default Preloader;



// 'use client'

// import { useEffect, useState } from 'react'
// import Image from 'next/image'

// const Preloader = () => {
//   const [isLoading, setIsLoading] = useState(true)
//   const [logoError, setLogoError] = useState(false)

//   useEffect(() => {
//     // Hide preloader after minimum display time or when page is loaded
//     const handleLoad = () => {
//       setTimeout(() => {
//         setIsLoading(false)
//       }, 1500) // Minimum display time
//     }

//     if (document.readyState === 'complete') {
//       handleLoad()
//     } else {
//       window.addEventListener('load', handleLoad)
//       return () => window.removeEventListener('load', handleLoad)
//     }
//   }, [])

//   if (!isLoading) return null

//   return (
//     <div className="preloader-wrapper">
//       <div className="preloader-content">
//         {/* Logo Container - Same size and animations as previous bag */}
//         <div className="shopping-bag-container">
//           <div className="shopping-bag" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             {!logoError ? (
//               <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
//                 <Image
//                   src="/Images/logo/logo.png"
//                   alt="Company Logo"
//                   fill
//                   className="object-contain"
//                   priority
//                   onError={() => setLogoError(true)}
//                 />
//               </div>
//             ) : (
//               /* Fallback if logo fails to load */
//               <div className="flex flex-col items-center gap-1">
//                 <div className="flex gap-0.5">
//                   <div className="w-2 h-2 bg-maroon rounded-full" style={{ backgroundColor: "#800000" }} />
//                   <div className="w-2 h-2 bg-maroon rounded-full" style={{ backgroundColor: "#800000", opacity: 0.6 }} />
//                   <div className="w-2 h-2 bg-maroon rounded-full" style={{ backgroundColor: "#800000", opacity: 0.3 }} />
//                 </div>
//                 <span 
//                   className="font-semibold tracking-widest text-xs"
//                   style={{ 
//                     fontFamily: "'Cormorant Garamond', Georgia, serif", 
//                     fontWeight: 600,
//                     color: "#800000"
//                   }}
//                 >
//                   LUXE
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Animated Dots */}
//         <div className="loading-dots">
//           <span className="dot"></span>
//           <span className="dot"></span>
//           <span className="dot"></span>
//         </div>

//         {/* Loading Text */}
//         <div className="loading-text">
//           <span>Loading</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Preloader;
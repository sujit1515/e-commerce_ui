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

export default Preloader
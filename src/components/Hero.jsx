import { useState, useEffect, useRef } from 'react'

// Import all hero background images
import hero1 from '../assets/hero/hero1.jpg'
import hero2 from '../assets/hero/hero2.jpg'
import hero3 from '../assets/hero/hero3.jpg'
import hero4 from '../assets/hero/hero4.jpg'
import hero5 from '../assets/hero/hero5.jpg'

const images = [hero1, hero2, hero3, hero4, hero5]

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef(null)

  // --- Autoplay logic ---
  const startAutoplay = () => {
    stopAutoplay()
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (!isHovered) {
      startAutoplay()
    } else {
      stopAutoplay()
    }
    return stopAutoplay // cleanup on unmount
  }, [isHovered])

  // --- Navigation handlers ---
  const goToSlide = (index) => {
    setCurrentIndex(index)
    // Reset autoplay timer after manual navigation
    if (!isHovered) {
      startAutoplay()
    }
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    if (!isHovered) startAutoplay()
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    if (!isHovered) startAutoplay()
  }

  return (
    <section
      className="relative h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background images with fade transition and Ken Burns zoom */}
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // Ken Burns slow zoom effect on the active slide
            transform: index === currentIndex ? 'scale(1.05)' : 'scale(1)',
            transition: 'opacity 1s ease-in-out, transform 8s ease-out',
          }}
        />
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
            Discover Authentic Homestays & Eco-Tourism Experiences
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-100 mb-10 leading-relaxed">
            Experience sustainable travel at its finest. Stay in eco-friendly homestays nestled
            in nature, connect with local communities, and leave a positive footprint on the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/dashboard"
              className="inline-block px-8 py-4 bg-white text-green-800 font-bold text-lg rounded-full shadow-lg hover:bg-green-50 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            >
              Explore Stays
            </a>
            <a
              href="/about"
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-green-800 hover:scale-105 transition-all duration-300 text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Previous arrow button */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all duration-300 cursor-pointer"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next arrow button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all duration-300 cursor-pointer"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? 'w-8 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom wave shape */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="white" opacity="0.95"/>
        </svg>
      </div>
    </section>
  )
}

export default Hero
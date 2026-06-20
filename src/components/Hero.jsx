const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-teal-500 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Discover Authentic Homestays & Eco-Tourism Experiences
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-100 mb-10 leading-relaxed">
            Experience sustainable travel at its finest. Stay in eco-friendly homestays nestled 
            in nature, connect with local communities, and leave a positive footprint on the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/dashboard"
              className="inline-block px-8 py-4 bg-white text-green-800 font-bold text-lg rounded-full shadow-lg hover:bg-green-50 hover:shadow-xl transition-all duration-300 text-center"
            >
              Explore Stays
            </a>
            <a
              href="/about"
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-green-800 transition-all duration-300 text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Bottom wave shape */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="white" opacity="0.95"/>
        </svg>
      </div>
    </section>
  )
}

export default Hero
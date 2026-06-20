import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About EcoStay Connect</h1>
            <div className="w-16 h-1 bg-green-300 mx-auto rounded-full"></div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                EcoStay Connect is a passionate initiative dedicated to bridging the gap between 
                eco-conscious travelers and sustainable homestay providers. We believe that travel 
                should not come at the cost of our planet — instead, it should enrich both the 
                traveler and the communities they visit.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Our platform connects you with handpicked eco-friendly accommodations that prioritize 
                sustainability, local culture, and authentic experiences. From mountain cottages 
                powered by solar energy to riverside stays that support local conservation efforts, 
                every listing on EcoStay Connect is vetted for its environmental and social impact.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Whether you are a solo traveler seeking a digital detox, a family looking for a 
                meaningful vacation, or a group of friends wanting to explore nature responsibly, 
                EcoStay Connect helps you find the perfect stay that aligns with your values.
              </p>
            </div>

            {/* Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sustainable Travel</h3>
                <p className="text-gray-600">Promoting eco-friendly accommodations that minimize environmental impact.</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Community First</h3>
                <p className="text-gray-600">Supporting local communities and preserving cultural heritage through tourism.</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Authentic Experiences</h3>
                <p className="text-gray-600">Curating unique stays that offer genuine connections with nature and culture.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
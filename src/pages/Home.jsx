import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Footer from '../components/Footer'
import { Button, Loader } from '../components/ui'
import toast from 'react-hot-toast'
import { getHomestays } from '../services/api'

const popularDestinations = [
  { name: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop', stays: '12 Eco Stays' },
  { name: 'Kerala', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=400&fit=crop', stays: '8 Eco Stays' },
  { name: 'Rishikesh', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&h=400&fit=crop', stays: '6 Eco Stays' },
  { name: 'Coorg', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop', stays: '5 Eco Stays' },
]

const Home = () => {
  const navigate = useNavigate()
  const [homestays, setHomestays] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await getHomestays()
        setHomestays(response.data.data)
      } catch (error) {
        toast.error('Failed to load homestays. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchHomestays()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Featured Stays Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Featured Eco-Stays
            </h2>
            <div className="w-20 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Handpicked sustainable accommodations for the conscious traveler
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {homestays.slice(0, 6).map((stay) => (
                <Card
                  key={stay.id}
                  id={stay.id}
                  image={stay.image}
                  title={stay.name}
                  description={stay.description}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/dashboard')}
            >
              View All Stays
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Popular Destinations
            </h2>
            <div className="w-20 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Explore top eco-tourism destinations across India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((dest, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden group cursor-pointer h-64"
                onClick={() => navigate('/ai-planner')}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                  <p className="text-white/80 text-sm">{dest.stays}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Travel Assistant Section */}
      <section className="py-16 bg-green-700 dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">AI Travel Assistant</h2>
          <p className="text-green-100 text-lg max-w-2xl mx-auto mb-8">
            Let our AI recommend the perfect eco-friendly homestay based on your preferences. 
            Tell us your destination, budget, and interests — and we'll do the rest.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/ai-planner')}
          >
            Try AI Planner
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
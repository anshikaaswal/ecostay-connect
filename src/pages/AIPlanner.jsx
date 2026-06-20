import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Input, Spinner } from '../components/ui'
import { showSuccess, showInfo } from '../components/ui'

const recommendationsData = [
  {
    destination: 'Himachal Pradesh, India',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop',
    title: 'Mountain View Cottage',
    price: '₹3,000/night',
    match: '98%',
    description: 'Perfect for nature lovers seeking peace and mountain views.',
    activities: ['Trekking', 'Bonfire', 'Bird Watching'],
  },
  {
    destination: 'Kerala, India',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=400&fit=crop',
    title: 'Forest Retreat',
    price: '₹2,500/night',
    match: '92%',
    description: 'Ideal for wellness seekers with yoga and organic living.',
    activities: ['Yoga', 'Nature Walks', 'Organic Farming'],
  },
  {
    destination: 'Rishikesh, India',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&h=400&fit=crop',
    title: 'River Side Stay',
    price: '₹2,800/night',
    match: '87%',
    description: 'Adventure awaits with kayaking, camping, and river views.',
    activities: ['Kayaking', 'Camping', 'Fishing'],
  },
]

const AIPlanner = () => {
  const [destination, setDestination] = useState('')
  const [budget, setBudget] = useState('')
  const [interests, setInterests] = useState('')
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState(null)
  const [error, setError] = useState('')

  const handleGenerate = (e) => {
    e.preventDefault()
    setError('')

    if (!destination || !budget || !interests) {
      setError('Please fill in all fields to get recommendations.')
      return
    }

    setLoading(true)
    showInfo('Analyzing your preferences...')

    // Simulate AI processing delay
    setTimeout(() => {
      setRecommendations(recommendationsData)
      setLoading(false)
      showSuccess('Recommendations generated successfully!')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-green-700 to-teal-600 dark:from-gray-800 dark:to-gray-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">AI Travel Planner</h1>
            <p className="text-teal-100 text-lg max-w-2xl mx-auto">
              Tell us your preferences and our AI will find the perfect eco-friendly homestay for you.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Input Form */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Your Preferences</h2>
                  <form onSubmit={handleGenerate} className="space-y-5">
                    <Input
                      label="Destination"
                      placeholder="e.g., Mountains, Beach, Forest"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Budget (per night)
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select budget range</option>
                        <option value="budget">Under ₹2,000 - Budget</option>
                        <option value="moderate">₹2,000 - ₹3,500 - Moderate</option>
                        <option value="premium">₹3,500+ - Premium</option>
                      </select>
                    </div>
                    <Input
                      label="Interests"
                      placeholder="e.g., Trekking, Yoga, Wildlife"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                    />

                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center space-x-2">
                          <Spinner size="sm" />
                          <span>Analyzing...</span>
                        </span>
                      ) : (
                        'Generate Recommendations'
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Recommendations */}
              <div className="lg:col-span-2">
                {!recommendations && !loading && (
                  <div className="text-center py-20">
                    <svg className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-2">Your Recommendations Will Appear Here</h3>
                    <p className="text-gray-400 dark:text-gray-500">Fill in your preferences and click generate to get AI-powered recommendations.</p>
                  </div>
                )}

                {loading && (
                  <div className="flex items-center justify-center py-20">
                    <Spinner size="lg" />
                  </div>
                )}

                {recommendations && !loading && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                      Recommended Stays for You
                    </h2>
                    <div className="space-y-6">
                      {recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-72 h-48 md:h-auto flex-shrink-0">
                              <img
                                src={rec.image}
                                alt={rec.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-6 flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{rec.title}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{rec.destination}</p>
                                </div>
                                <div className="text-right">
                                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full">
                                    {rec.match} Match
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">{rec.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                  {rec.activities.map((activity, i) => (
                                    <span
                                      key={i}
                                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                                    >
                                      {activity}
                                    </span>
                                  ))}
                                </div>
                                <p className="text-lg font-bold text-green-700 dark:text-green-400">{rec.price}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AIPlanner
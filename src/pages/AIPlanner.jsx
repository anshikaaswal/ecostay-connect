import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Input, Loader, Spinner } from '../components/ui'
import { showSuccess, showError, showInfo } from '../components/ui'
import { generateTravelPlan } from '../services/api'

const AIPlanner = () => {
  const [destination, setDestination] = useState('')
  const [days, setDays] = useState('')
  const [budget, setBudget] = useState('')
  const [travelStyle, setTravelStyle] = useState('')
  const [loading, setLoading] = useState(false)
  const [travelPlan, setTravelPlan] = useState(null)
  const [error, setError] = useState('')

  const handleGenerate = async (e) => {
    e.preventDefault()
    setError('')
    setTravelPlan(null)

    if (!destination || !days || !budget || !travelStyle) {
      setError('Please fill in all fields to generate your travel plan.')
      return
    }

    setLoading(true)
    showInfo('Generating your personalized eco-travel plan...')

    try {
      const response = await generateTravelPlan({
        destination,
        days: Number(days),
        budget,
        travelStyle,
      })

      if (response.data.success) {
        setTravelPlan(response.data.data)
        showSuccess('Travel plan generated successfully!')
      } else {
        throw new Error(response.data.message || 'Failed to generate plan')
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Unable to generate travel plan. Please try again.'
      setError(message)
      showError(message)
    } finally {
      setLoading(false)
    }
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
              Tell us your preferences and our AI will generate a personalized eco-friendly travel plan for you.
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
                      placeholder="e.g., Manali, Kerala, Rishikesh"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                    <Input
                      label="Number of Days"
                      type="number"
                      placeholder="e.g., 3"
                      min="1"
                      max="30"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select budget range</option>
                        <option value="budget">Budget — Under ₹2,000/night</option>
                        <option value="moderate">Moderate — ₹2,000 - ₹3,500/night</option>
                        <option value="premium">Premium — ₹3,500+/night</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Travel Style
                      </label>
                      <select
                        value={travelStyle}
                        onChange={(e) => setTravelStyle(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select travel style</option>
                        <option value="adventure">Adventure</option>
                        <option value="relaxation">Relaxation</option>
                        <option value="cultural">Cultural</option>
                        <option value="wellness">Wellness & Yoga</option>
                        <option value="family">Family</option>
                        <option value="solo">Solo Travel</option>
                      </select>
                    </div>

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
                          <span>Generating...</span>
                        </span>
                      ) : (
                        'Generate Plan'
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-2">
                {!travelPlan && !loading && (
                  <div className="text-center py-20">
                    <svg className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-2">Your Travel Plan Will Appear Here</h3>
                    <p className="text-gray-400 dark:text-gray-500">Fill in your preferences and click Generate Plan to get an AI-powered eco-travel itinerary.</p>
                  </div>
                )}

                {loading && (
                  <div className="flex items-center justify-center py-20">
                    <Loader size="lg" />
                  </div>
                )}

                {travelPlan && !loading && (
                  <div className="space-y-8">
                    {/* Travel Summary */}
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 shadow-md border border-green-100 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                            {travelPlan.destination}
                          </h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {travelPlan.days} {travelPlan.days === 1 ? 'Day' : 'Days'} &middot; {travelPlan.travelStyle} &middot; {travelPlan.budget}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {travelPlan.travelSummary}
                      </p>
                    </div>

                    {/* Day-wise Itinerary */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Day-wise Itinerary
                      </h3>
                      <div className="space-y-4">
                        {travelPlan.itinerary && travelPlan.itinerary.map((day) => (
                          <div
                            key={day.day}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-green-500"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-lg font-bold text-green-700 dark:text-green-400">
                                Day {day.day}: {day.title}
                              </h4>
                              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                {day.dailyBudget}
                              </span>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                  AM
                                </span>
                                <div>
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Morning</p>
                                  <p className="text-gray-700 dark:text-gray-300">{day.morning}</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                  PM
                                </span>
                                <div>
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Afternoon</p>
                                  <p className="text-gray-700 dark:text-gray-300">{day.afternoon}</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                  EV
                                </span>
                                <div>
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Evening</p>
                                  <p className="text-gray-700 dark:text-gray-300">{day.evening}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Food Recommendations */}
                    {travelPlan.foodRecommendations && travelPlan.foodRecommendations.length > 0 && (
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Local Food Recommendations
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {travelPlan.foodRecommendations.map((food, index) => (
                            <div
                              key={index}
                              className="flex items-center p-3 bg-orange-50 dark:bg-gray-700 rounded-xl"
                            >
                              <span className="w-8 h-8 rounded-full bg-orange-200 dark:bg-orange-800 text-orange-700 dark:text-orange-300 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">{food}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Eco-Friendly Tips */}
                    {travelPlan.ecoFriendlyTips && travelPlan.ecoFriendlyTips.length > 0 && (
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          Eco-Friendly Travel Tips
                        </h3>
                        <ul className="space-y-3">
                          {travelPlan.ecoFriendlyTips.map((tip, index) => (
                            <li
                              key={index}
                              className="flex items-start p-3 bg-green-50 dark:bg-gray-700 rounded-xl"
                            >
                              <span className="w-6 h-6 rounded-full bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                ✓
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
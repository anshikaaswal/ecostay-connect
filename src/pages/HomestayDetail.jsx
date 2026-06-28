import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Loader } from '../components/ui'
import toast from 'react-hot-toast'
import { getHomestayById, createBooking } from '../services/api'

const HomestayDetail = () => {
  const { id } = useParams()
  const [homestay, setHomestay] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState({
    user: '',
    checkIn: '',
    checkOut: ''
  })
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const response = await getHomestayById(id)
        setHomestay(response.data.data)
      } catch (error) {
        toast.error('Failed to load homestay details.')
      } finally {
        setLoading(false)
      }
    }
    fetchHomestay()
  }, [id])

  const handleInputChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value })
  }

  const handleBookNow = async () => {
    if (!booking.user || !booking.checkIn || !booking.checkOut) {
      toast.error('Please fill in all booking fields (Name, Check-in, Check-out)')
      return
    }

    setBookingLoading(true)
    try {
      await createBooking({
        user: booking.user,
        homestayId: parseInt(id),
        checkIn: booking.checkIn,
        checkOut: booking.checkOut
      })
      toast.success(`Booking confirmed at ${homestay.name}! Check your dashboard for details.`)
      setBooking({ user: '', checkIn: '', checkOut: '' })
    } catch (error) {
      toast.error('Booking failed. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader size="lg" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!homestay) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Homestay Not Found</h2>
            <Link to="/" className="text-green-700 hover:text-green-800 font-medium">Back to Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow">
        {/* Image Gallery */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={homestay.image}
            alt={homestay.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <Link to="/" className="text-white/80 hover:text-white text-sm mb-2 inline-block">&larr; Back to Home</Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{homestay.name}</h1>
              <p className="text-white/80 text-lg mt-2">{homestay.location}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">About This Stay</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{homestay.description}</p>
              </div>

              {/* Amenities */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {homestay.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md sticky top-24">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-green-700 dark:text-green-400">₹{homestay.price} / night</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-semibold mr-1">{homestay.rating}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {homestay.location}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Eco-friendly certified
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    name="user"
                    placeholder="Your Name"
                    value={booking.user}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="date"
                    name="checkIn"
                    value={booking.checkIn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="date"
                    name="checkOut"
                    value={booking.checkOut}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleBookNow}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Booking...' : 'Book Now'}
                </Button>

                <p className="text-center text-xs text-gray-400 mt-4">No cancellation fees</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomestayDetail
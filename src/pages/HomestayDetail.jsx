import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui'
import { showSuccess } from '../components/ui'

const homestaysData = [
  {
    id: 'mountain-view-cottage',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&h=800&fit=crop',
    title: 'Mountain View Cottage',
    location: 'Himachal Pradesh, India',
    price: '₹3,000 / night',
    rating: 4.8,
    reviews: 24,
    amenities: ['Free WiFi', 'Organic Breakfast', 'Guided Trekking', 'Bonfire', 'Parking', 'Mountain View'],
    description: 'Nestled in the serene hills, this cozy cottage offers breathtaking mountain views, fresh organic meals, and guided nature trails through lush pine forests. Perfect for a peaceful getaway surrounded by nature.',
    longDescription: 'Experience the tranquility of the Himalayas at our Mountain View Cottage. Wake up to the sight of snow-capped peaks, enjoy organic breakfast made from locally sourced ingredients, and explore the surrounding pine forests on guided treks. Our eco-friendly cottage uses solar power and rainwater harvesting to minimize environmental impact.',
  },
  {
    id: 'forest-retreat',
    image: 'https://images.unsplash.com/photo-1499793983690-e29f59e78f3f?w=1200&h=800&fit=crop',
    title: 'Forest Retreat',
    location: 'Kerala, India',
    price: '₹2,500 / night',
    rating: 4.6,
    reviews: 18,
    amenities: ['Bird Watching', 'Yoga Sessions', 'Handcrafted Cabin', 'Organic Meals', 'Nature Walks'],
    description: 'Immerse yourself in the heart of the wilderness. Enjoy bird watching, yoga sessions at sunrise, and sustainable living in a handcrafted wooden cabin.',
    longDescription: 'Our Forest Retreat offers a unique opportunity to disconnect from the modern world and reconnect with nature. Practice yoga at sunrise, listen to the symphony of birds, and sleep in a beautifully handcrafted wooden cabin built using sustainable materials.',
  },
  {
    id: 'river-side-stay',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=800&fit=crop',
    title: 'River Side Stay',
    location: 'Rishikesh, India',
    price: '₹2,800 / night',
    rating: 4.7,
    reviews: 31,
    amenities: ['Kayaking', 'Fishing', 'Farm-to-Table', 'Campfire', 'River View', 'Tent Camping'],
    description: 'Wake up to the soothing sounds of flowing water. This eco-friendly riverside stay offers kayaking, fishing, and farm-to-table dining experiences.',
    longDescription: 'Located on the banks of the Ganges, our Riverside Stay combines adventure with sustainability. Try your hand at kayaking, enjoy freshly caught fish, and dine on farm-fresh organic produce while listening to the soothing sounds of the river.',
  },
  {
    id: 'himalayan-eco-lodge',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    title: 'Himalayan Eco Lodge',
    location: 'Uttarakhand, India',
    price: '₹3,500 / night',
    rating: 4.9,
    reviews: 42,
    amenities: ['Solar Power', 'Stargazing', 'Digital Detox', 'Trekking', 'Organic Farm', 'Hot Springs'],
    description: 'Perched on a cliff overlooking the valley, this lodge runs entirely on solar power. Perfect for stargazing and digital detox retreats.',
    longDescription: 'Our Himalayan Eco Lodge is a model of sustainable tourism. Entirely powered by solar energy, this lodge offers unparalleled views of the Himalayan range. Stargaze at night, soak in natural hot springs, and enjoy meals prepared with ingredients from our organic farm.',
  },
  {
    id: 'green-valley-homestay',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop',
    title: 'Green Valley Homestay',
    location: 'Coorg, India',
    price: '₹2,000 / night',
    rating: 4.5,
    reviews: 15,
    amenities: ['Coffee Plantation', 'Bird Watching', 'Local Cuisine', 'Nature Trails', 'Campfire'],
    description: 'Stay amidst lush coffee plantations in Coorg. Experience local Kodava culture, freshly brewed coffee, and scenic nature trails.',
    longDescription: 'Green Valley Homestay offers an authentic Coorg experience. Walk through aromatic coffee plantations, learn about the local Kodava culture, enjoy traditional cuisine, and explore the verdant landscapes on guided nature trails.',
  },
]

const HomestayDetail = () => {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)

  const homestay = homestaysData.find((h) => h.id === id)

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

  const handleBookNow = () => {
    showSuccess(`Booking confirmed at ${homestay.title}! Check your dashboard for details.`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow">
        {/* Image Gallery */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={homestay.image}
            alt={homestay.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <Link to="/" className="text-white/80 hover:text-white text-sm mb-2 inline-block">&larr; Back to Home</Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{homestay.title}</h1>
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
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{homestay.longDescription}</p>
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

              {/* Reviews */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Reviews</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                          {['A', 'S', 'R'][i - 1]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{['Arjun M.', 'Sophia K.', 'Rahul D.'][i - 1]}</p>
                          <div className="flex items-center text-yellow-400 text-sm">
                            {'★'.repeat(5 - i + 4)}{'☆'.repeat(i - 1)}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {[
                          'An absolutely breathtaking experience. The views were stunning and the hospitality was unmatched. Highly recommend for anyone seeking peace and quiet.',
                          'Loved the eco-friendly approach. The solar-powered lodge was amazing and the organic food was delicious. Will definitely visit again!',
                          'Perfect getaway from city life. The guided treks were memorable and the staff was incredibly welcoming. A true gem in the mountains.',
                        ][i - 1]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md sticky top-24">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-green-700 dark:text-green-400">{homestay.price}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-semibold mr-1">{homestay.rating}</span>
                    <span>({homestay.reviews} reviews)</span>
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

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleBookNow}
                >
                  Book Now
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
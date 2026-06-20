import { useNavigate } from 'react-router-dom'
import { Button } from './ui'
import { showSuccess } from './ui'

const Card = ({ image, title, description, id }) => {
  const navigate = useNavigate()

  const handleBookNow = (e) => {
    e.stopPropagation()
    showSuccess(`Booking initiated for ${title}! Redirecting to details...`)
    navigate(`/homestay/${id}`)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group cursor-pointer"
      onClick={() => navigate(`/homestay/${id}`)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed line-clamp-3">
          {description}
        </p>
        <Button
          variant="primary"
          size="md"
          className="w-full"
          onClick={handleBookNow}
        >
          Book Now
        </Button>
      </div>
    </div>
  )
}

export default Card
import { useNavigate } from 'react-router-dom'
import { Button } from './ui'

const EmptyState = ({
  icon = '🏡',
  title = 'Nothing Here Yet',
  description = 'There is nothing to display right now.',
  buttonText = 'Browse Homestays',
  buttonLink = '/',
  onButtonClick,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick()
    } else {
      navigate(buttonLink)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 sm:p-12 max-w-md w-full text-center border border-gray-100 dark:border-gray-700">
        <div className="text-6xl sm:text-7xl mb-6 leading-none" role="img" aria-label="Eco icon">
          {icon}
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-8 leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={handleClick}
          className="!px-8 !py-3 !text-base !font-semibold !rounded-xl !shadow-lg !shadow-green-200/50 dark:!shadow-green-900/30 hover:!shadow-xl hover:!shadow-green-200/60 dark:hover:!shadow-green-900/40 !transition-all !duration-300"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default EmptyState
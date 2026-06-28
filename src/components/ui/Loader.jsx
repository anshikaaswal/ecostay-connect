const Spinner = ({ size = 'md', className = '' }) => {
  const sizeMap = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeMap[size] || sizeMap.md}
          border-4 border-gray-200 dark:border-gray-700
          border-t-blue-600 rounded-full
          animate-spin
        `}
      />
    </div>
  )
}

const Skeleton = ({ width = '100%', height = '1rem', className = '', rounded = 'rounded-lg' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${rounded} ${className}`}
      style={{ width, height }}
    />
  )
}

const CardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md">
      <Skeleton width="100%" height="14rem" rounded="rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton width="75%" height="1.5rem" />
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="40%" height="1rem" />
        <Skeleton width="100%" height="2.75rem" rounded="rounded-xl" />
      </div>
    </div>
  )
}

export { Spinner, Skeleton, CardSkeleton }
const variantStyles = {
  primary: 'bg-green-700 text-white hover:bg-green-800 shadow-md hover:shadow-lg',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  outline: 'bg-transparent border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
}

const Button = ({ variant = 'primary', size = 'md', disabled = false, onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-semibold transition-all duration-200 inline-flex items-center justify-center
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button
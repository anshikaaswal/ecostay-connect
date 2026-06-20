import toast from 'react-hot-toast'

const showSuccess = (message) => toast.success(message, {
  style: {
    background: '#065f46',
    color: '#fff',
    borderRadius: '12px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 500,
  },
  iconTheme: {
    primary: '#fff',
    secondary: '#065f46',
  },
})

const showError = (message) => toast.error(message, {
  style: {
    background: '#991b1b',
    color: '#fff',
    borderRadius: '12px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 500,
  },
  iconTheme: {
    primary: '#fff',
    secondary: '#991b1b',
  },
})

const showInfo = (message) => toast(message, {
  style: {
    background: '#1e3a5f',
    color: '#fff',
    borderRadius: '12px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 500,
  },
  icon: 'ℹ️',
})

export { showSuccess, showError, showInfo }
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { registerUser } from '../services/api'
import api from '../services/api'
import { showSuccess, showError } from '../components/ui'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('rememberedEmail'))
  const [googleOAuthAvailable, setGoogleOAuthAvailable] = useState(false)
  const [configLoaded, setConfigLoaded] = useState(false)
  const { login, isAuthenticated, isAdmin, handleOAuthToken } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get('/auth/config')
        setGoogleOAuthAvailable(res.data.data.googleOAuthAvailable)
      } catch (e) {
        setGoogleOAuthAvailable(false)
      } finally {
        setConfigLoaded(true)
      }
    }
    fetchConfig()
  }, [])
  useEffect(() => {
    const remembered = localStorage.getItem('rememberedEmail')
    if (remembered) {
      setEmail(remembered)
      setRememberMe(true)
    }
  }, [])
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/dashboard')
      } else {
        navigate('/my-bookings')
      }
    }
  }, [isAuthenticated, isAdmin, navigate])
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const userData = {
          id: payload.id,
          name: payload.name || 'User',
          email: payload.email || '',
          role: payload.role || 'user',
        }
        handleOAuthToken(token, userData)
        window.history.replaceState({}, document.title, '/login')
        if (userData.role === 'admin') {
          navigate('/dashboard')
        } else {
          navigate('/my-bookings')
        }
      } catch (e) {
        localStorage.setItem('token', token)
        navigate('/dashboard')
      }
    }
  }, [navigate, handleOAuthToken])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (isRegister) {
        await registerUser({ name, email, password })
        showSuccess('Registration successful! Please sign in.')
        setIsRegister(false)
        setName('')
        setPassword('')
      } else {
        await login(email, password)
        showSuccess('Welcome back!')
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email)
        } else {
          localStorage.removeItem('rememberedEmail')
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong.'
      const errors = error.response?.data?.errors
      if (errors && Array.isArray(errors)) {
        showError(errors.map((e) => e.message || e).join(', '))
      } else {
        showError(msg)
      }
    } finally {
      setSubmitting(false)
    }
  }
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'
  }
  const handleForgotPassword = (e) => {
    e.preventDefault()
    showSuccess('Forgot password feature coming soon!')
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                {isRegister ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-500 mt-2">
                {isRegister
                  ? 'Join EcoStay Connect today'
                  : 'Sign in to your EcoStay Connect account'}
              </p>
            </div>
            {}
            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegister && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-800 placeholder-gray-400"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-800 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={isRegister ? 'At least 6 characters' : 'Enter your password'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-800 placeholder-gray-400"
                />
              </div>
              {!isRegister && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-green-700 hover:text-green-800 font-medium cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-green-700 text-white font-bold text-lg rounded-lg hover:bg-green-800 transition-colors shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting
                  ? 'Processing...'
                  : isRegister
                    ? 'Create Account'
                    : 'Sign In'}
              </button>
            </form>
            {}
            {configLoaded && googleOAuthAvailable && (
              <>
                {}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                {}
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </>
            )}
            <p className="text-center text-sm text-gray-500 mt-8">
              {isRegister ? (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsRegister(false)}
                    className="text-green-700 hover:text-green-800 font-medium cursor-pointer"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsRegister(true)}
                    className="text-green-700 hover:text-green-800 font-medium cursor-pointer"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default Login
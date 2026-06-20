import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Input } from '../components/ui'
import { showSuccess } from '../components/ui'

const Settings = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')

  const handleSaveProfile = (e) => {
    e.preventDefault()
    showSuccess('Profile updated successfully!')
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    showSuccess(`Theme switched to ${newMode ? 'dark' : 'light'} mode`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-green-700 to-green-600 dark:from-gray-800 dark:to-gray-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Settings</h1>
            <p className="text-green-100 text-lg">Manage your profile, theme, and preferences.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Profile Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Profile</h2>
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" variant="primary">Save Changes</Button>
              </form>
            </div>

            {/* Theme Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Theme</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
                    darkMode ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                      darkMode ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive booking updates and offers</p>
                  </div>
                  <button
                    onClick={() => {
                      setNotifications(!notifications)
                      showSuccess(`Notifications ${notifications ? 'disabled' : 'enabled'}`)
                    }}
                    className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
                      notifications ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                        notifications ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Settings
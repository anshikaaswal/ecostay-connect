import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Modal, Spinner } from '../components/ui'
import { showSuccess, showError } from '../components/ui'
import EmptyState from '../components/EmptyState'
import { getHomestays, createHomestay, updateHomestay, deleteHomestay, getBookings } from '../services/api'
import { useAuth } from '../context/AuthContext'
const initialFormState = {
  name: '',
  location: '',
  price: '',
  rating: '',
  image: '',
  description: '',
  amenities: '',
}
const Dashboard = () => {
  const [homestays, setHomestays] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingsLoading, setBookingsLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormState)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const { isAdmin, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const fetchHomestays = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getHomestays()
      setHomestays(res.data.data)
    } catch (error) {
      showError('Failed to load homestays.')
    } finally {
      setLoading(false)
    }
  }, [])
  const fetchBookings = useCallback(async () => {
    try {
      setBookingsLoading(true)
      const res = await getBookings()
      setBookings(res.data.data)
    } catch (error) {
      setBookings([])
    } finally {
      setBookingsLoading(false)
    }
  }, [])
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchHomestays()
    fetchBookings()
  }, [isAuthenticated, navigate, fetchHomestays, fetchBookings])
  const openAddModal = () => {
    if (!isAdmin) {
      showError('Only admins can add homestays.')
      return
    }
    setEditingId(null)
    setFormData(initialFormState)
    setModalOpen(true)
  }
  const openEditModal = (homestay) => {
    if (!isAdmin) {
      showError('Only admins can edit homestays.')
      return
    }
    setEditingId(homestay._id)
    setFormData({
      name: homestay.name || '',
      location: homestay.location || '',
      price: homestay.price?.toString() || '',
      rating: homestay.rating?.toString() || '',
      image: homestay.image || '',
      description: homestay.description || '',
      amenities: (homestay.amenities || []).join(', '),
    })
    setModalOpen(true)
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const payload = {
      name: formData.name,
      location: formData.location,
      price: Number(formData.price),
      rating: formData.rating ? Number(formData.rating) : 0,
      image: formData.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
      description: formData.description,
      amenities: formData.amenities.split(',').map((a) => a.trim()).filter(Boolean),
    }
    try {
      if (editingId) {
        await updateHomestay(editingId, payload)
        showSuccess('Homestay updated successfully!')
      } else {
        await createHomestay(payload)
        showSuccess('Homestay created successfully!')
      }
      setModalOpen(false)
      setFormData(initialFormState)
      setEditingId(null)
      await fetchHomestays()
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong.'
      showError(msg)
    } finally {
      setSubmitting(false)
    }
  }
  const handleDelete = async (id) => {
    if (!isAdmin) {
      showError('Only admins can delete homestays.')
      return
    }
    try {
      await deleteHomestay(id)
      showSuccess('Homestay deleted successfully!')
      setDeleteConfirm(null)
      await fetchHomestays()
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete homestay.'
      showError(msg)
    }
  }
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Spinner size="lg" />
        </main>
        <Footer />
      </div>
    )
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        {}
        <section className="bg-gradient-to-r from-green-700 to-green-600 dark:from-gray-800 dark:to-gray-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">
              {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
            </h1>
            <p className="text-green-100 dark:text-gray-300 text-lg">
              {isAdmin
                ? 'Manage homestays — add, edit, or remove listings.'
                : 'Welcome back, explore and manage your eco-stay experience.'}
            </p>
            {user && (
              <div className="mt-4 flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3 w-fit">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-green-200">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </section>
        {}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full sm:w-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-l-4 border-green-500">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Homestays</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{homestays.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-l-4 border-teal-500">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {homestays.length > 0
                      ? (homestays.reduce((sum, h) => sum + (h.rating || 0), 0) / homestays.length).toFixed(1)
                      : '—'}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-l-4 border-amber-500">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">My Bookings</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{bookings.length}</p>
                </div>
              </div>
              {isAdmin && (
                <Button variant="primary" size="lg" onClick={openAddModal} className="flex items-center gap-2 whitespace-nowrap">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Homestay
                </Button>
              )}
            </div>
            {}
            {homestays.length === 0 ? (
              <EmptyState
                icon="🏡"
                title="No Homestays Available"
                description={isAdmin ? "You haven't added any homestays yet. Create your first listing to get started!" : "No eco-friendly homestays are currently listed. Check back soon!"}
                buttonText={isAdmin ? "Add Your First Homestay" : "Browse Homestays"}
                buttonLink={isAdmin ? undefined : "/"}
                onButtonClick={isAdmin ? openAddModal : undefined}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {homestays.map((homestay) => (
                  <div
                    key={homestay._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl group cursor-pointer"
                    onClick={() => navigate(`/homestay/${homestay._id}`)}
                  >
                    {}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={homestay.image}
                        alt={homestay.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      {homestay.rating > 0 && (
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 rounded-full px-3 py-1 text-sm font-bold text-yellow-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {homestay.rating}
                        </div>
                      )}
                    </div>
                    {}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1 truncate">{homestay.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <svg className="w-4 h-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {homestay.location}
                      </div>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">₹{homestay.price}/night</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{homestay.description}</p>
                      {}
                      {homestay.amenities && homestay.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {homestay.amenities.slice(0, 3).map((amenity, i) => (
                            <span key={i} className="px-2 py-0.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                              {amenity}
                            </span>
                          ))}
                          {homestay.amenities.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-full">
                              +{homestay.amenities.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      {}
                      {isAdmin && (
                        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 flex items-center justify-center gap-1.5"
                            onClick={() => openEditModal(homestay)}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            className="flex-1 flex items-center justify-center gap-1.5 !bg-red-600 !hover:bg-red-700"
                            onClick={() => setDeleteConfirm(homestay)}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {}
            {!isAdmin && (
              <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">My Bookings</h2>
                  {bookings.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => navigate('/my-bookings')}>
                      View All
                    </Button>
                  )}
                </div>
                {bookingsLoading ? (
                  <div className="flex justify-center py-8">
                    <Spinner size="md" />
                  </div>
                ) : bookings.length === 0 ? (
                  <EmptyState
                    icon="🧳"
                    title="No Bookings Yet"
                    description="Start exploring and book your first eco-stay! Your next adventure is just a click away."
                    buttonText="Browse Homestays"
                    buttonLink="/"
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.slice(0, 3).map((booking) => (
                      <div
                        key={booking._id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="h-36 overflow-hidden">
                          <img
                            src={booking.homestay?.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop'}
                            alt={booking.homestay?.name || 'Homestay'}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-800 dark:text-gray-200 truncate">
                            {booking.homestay?.name || 'Unknown Homestay'}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {booking.homestay?.location || ''}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                  : booking.status === 'cancelled'
                                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                              }`}
                            >
                              {booking.status || 'Confirmed'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      {}
      {isAdmin && (
        <>
          <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingId(null); setFormData(initialFormState) }} title={editingId ? 'Edit Homestay' : 'Add Homestay'}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Mountain View Cottage"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Nainital"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="e.g. 2500"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="e.g. 4.5"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the homestay..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amenities (comma separated)</label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="WiFi, Parking, Breakfast, Trekking"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="primary" size="md" className="flex-1" disabled={submitting}>
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner size="sm" />
                      {editingId ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    editingId ? 'Update Homestay' : 'Create Homestay'
                  )}
                </Button>
                <Button type="button" variant="secondary" size="md" onClick={() => { setModalOpen(false); setEditingId(null); setFormData(initialFormState) }}>
                  Cancel
                </Button>
              </div>
            </form>
          </Modal>
          {}
          <Modal
            isOpen={!!deleteConfirm}
            onClose={() => setDeleteConfirm(null)}
            title="Confirm Delete"
          >
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Are you sure you want to delete this homestay?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                "{deleteConfirm?.name}" will be permanently removed. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1 !bg-red-600 !hover:bg-red-700"
                  onClick={() => handleDelete(deleteConfirm._id)}
                >
                  Yes, Delete
                </Button>
                <Button variant="secondary" size="md" className="flex-1" onClick={() => setDeleteConfirm(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </>
      )}
      <Footer />
    </div>
  )
}
export default Dashboard
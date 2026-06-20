import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Settings from './pages/Settings'
import HomestayDetail from './pages/HomestayDetail'
import AIPlanner from './pages/AIPlanner'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/homestay/:id" element={<HomestayDetail />} />
      <Route path="/ai-planner" element={<AIPlanner />} />
    </Routes>
  )
}

export default App
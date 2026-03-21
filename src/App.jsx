import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import NavBar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import EventDetails from './pages/EventDetails'
import MyRegistrations from './pages/MyRegistrations' 
import MyAttendance from './pages/MyAttendance'
import CreateEvent from './pages/CreateEvent'
import OrganizerDashboard from './pages/OrganizerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import OrganizerRequests from './pages/OrganizerRequests'

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />
  return children
}

function App() {
  return(
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetails/>} />

          <Route path="/my-registrations" element={
            <ProtectedRoute roles={['STUDENT', 'ORGANIZER']}>
              <MyRegistrations/>
            </ProtectedRoute>
          } />

          <Route path="/my-attendance" element={
            <ProtectedRoute roles={['STUDENT', 'ORGANIZER']}>
              <MyAttendance/>
            </ProtectedRoute>
          } />

          <Route path="/create-event" element={
            <ProtectedRoute roles={['ADMIN', 'ORGANIZER']}>
              <CreateEvent/>
            </ProtectedRoute>
          } />

          <Route path="/organizer-dashboard" element={
            <ProtectedRoute roles={['ORGANIZER']}>
              <OrganizerDashboard/>
            </ProtectedRoute>
          } />

          <Route path="/admin-dashboard" element={
            <ProtectedRoute roles={['ADMIN']}>
              <AdminDashboard/>
            </ProtectedRoute>
          } />

          <Route path="/organizer-requests" element={
            <ProtectedRoute roles={['ADMIN']}>
              <OrganizerRequests/>
            </ProtectedRoute>
          } />

        </Routes>
      </div>
    </div>
  )
}

export default App
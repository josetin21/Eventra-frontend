import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"

export default function Navbar(){
    const { user, logout}  = useAuth()
    const Navigate = useNavigate()

    const handleLogout = () =>{
        logout()
        Navigate('/login')
    }

    return(
        <nav className='bg-blue-600 text-white px-6 py-4 flex items-center justify-between'>

            <Link to="/" className='text-xl font-bold tracking-wide'>
                Eventra
            </Link>

            <div className='flex items-center gap-6 text-sm font-medium'>

                <Link to="/" className='hover:text-blue-200'>Events</Link>

                {!user &&(
                    <>
                        <Link to="/login" className='hover:text-blue-200'>Login</Link>
                        <Link to="/register" className='hover:text-blue-200'>Register</Link>
                    </>
                )}

                {user &&(
                    <>
                        <Link to="/my-registrations" className='hover:text-blue-200'>
                            My Registrations
                        </Link>
                        <Link to="/my-attendance" className='hover:text-blue-200'>
                            My Events
                        </Link>
                        <Link to="/my-attendance" className='hover:text-blue-200'>
                            My Attendance
                        </Link>
                        <Link to="/request-organizer" className='hover:text-blue-200'>
                            Create Event
                        </Link>
                        <Link to="/request-organizer" className='hover:text-blue-200'>
                            Scan QR
                        </Link>
                    </>
                )}

                {user?.role === 'ADMIN' &&(
                    <>
                       <Link to="/admin-dashboard" className='hover:text-blue-200'>
                            Dashboard
                        </Link>
                        <Link to="/organizer-requests" className='hover:text-blue-200'>
                            Approvals
                        </Link>
                    </>
                )}

                {user &&(
                    <div className='flex items-center gap-4'>
                        <span className='text-blue-200'>Hi, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            className='bg-white text-blue-600 px-3 py-1 rounded font-medium hover:bg-blue-50'
                        >
                            Logout
                        </button>
                    </div>
                )}
                
            </div>

        </nav>
    )
}
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from "../context/AuthContext"

export default function Navbar(){
    const { user, logout}  = useAuth()
    const Navigate = useNavigate()

    const handleLogout = () =>{
        logout()
        Navigate('/login')
    }

    const navLinkClass = ({ isActive }) =>
        `px-3 py-1 rounded-md transition ${
            isActive
                ? "bg-white text-blue-700 shadow-sm"
                : "text-white hover:bg-blue-500/40 hover:text-white"
        }`;
    return(
        <nav className='bg-blue-600 text-white px-6 py-4 flex items-center justify-between'>

            <Link to="/" className='text-xl font-bold tracking-wide'>
                Eventra
            </Link>

            <div className='flex items-center gap-6 text-sm font-medium'>

                <NavLink to="/" className={navLinkClass} end>Events</NavLink>

                {!user &&(
                    <>
                        <NavLink to="/login" className={navLinkClass}>Login</NavLink>
                        <NavLink to="/register" className={navLinkClass}>Register</NavLink>
                    </>
                )}

                {user &&(
                    <>
                        <NavLink to="/my-registrations" className={navLinkClass}>
                            My Registrations
                        </NavLink>
                        <NavLink to="/my-events" className={navLinkClass}>
                            My Events
                        </NavLink>
                        <NavLink to="/my-attendance" className={navLinkClass}>
                            My Attendance
                        </NavLink>
                        <NavLink to="/create-event" className={navLinkClass}>
                            Create Event
                        </NavLink>
                    </>
                )}

                {user?.role === 'ADMIN' &&(
                    <>
                       <NavLink to="/admin-dashboard" className={navLinkClass}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/pending-events" className={navLinkClass}>
                            Approvals
                        </NavLink>
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
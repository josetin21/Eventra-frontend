import {Link, NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import {useEffect, useRef, useState} from "react";

export default function Navbar(){
    const { user, logout}  = useAuth()
    const navigate = useNavigate()

    const [openProfile, setOpenProfile] = useState(false)
    const dropdownRef = useRef(null)

    const handleLogout = () =>{
        logout()
        navigate('/login')
    }

    const navLinkClass = ({ isActive }) =>
        `px-3 py-1 rounded-md transition ${
            isActive
                ? "bg-white text-blue-700 shadow-sm"
                : "text-white hover:bg-blue-500/40 hover:text-white"
        }`

    useEffect(() => {
        const handler = (e) =>{
            if (!dropdownRef.current) return
            if (!dropdownRef.current.contains(e.target)){
                setOpenProfile(false)
            }
        }
        if (openProfile) document.addEventListener('mousedown', handler)
        return () => document.removeEventListener(('mousedown'), handler)
    }, [openProfile])

    const intial = user?.name?.trim()?.[0]?.toUpperCase() || "U"

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
                            My Participation
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
                            type="button"
                            onClick={() => setOpenProfile((v) => !v)}
                            className='w-9 h-9 rounded-full bg-white text-blue-700 font-bold flex items-center justify-center shadow-sm hover:bg-blue-50'
                            aria-label="Open profile menu"
                            title="Profile"
                        >
                            {intial}
                        </button>

                        {openProfile && (
                            <div className='absolute right-0 top-12 w-72 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-100 p-4 z-50'>
                                <div className='flex items-start gap-3'>
                                    <div className='w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center'>
                                        {intial}
                                    </div>

                                    <div className='min-w-0'>
                                        <div className='font-semibold truncate'>{user.name}</div>
                                        <div className='text-sm text-gray-500 truncate'>{user.email}</div>
                                    </div>
                                </div>

                                <div className='mt-4 flex flex-col gap-2'>
                                    <button
                                        type='button'
                                        onClick={() =>{
                                            setOpenProfile(false)
                                            navigate('/profile')
                                        }}
                                        className='w-full bg-blue-600 text-white px-3 py-2 rounded font-medium hover:bg-blue-700'
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        )}

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
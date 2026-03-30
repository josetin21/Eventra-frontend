import api from "../api/axios.js"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function AdminDashboard(){
    const [stats, setStats] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        api.get(`/dashboard`)
            .then(res => setStats(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    if(loading) return(
        <div className="text-center py-20 text-gray-500">Loading dashboard...</div>
    )

    if(!stats) return(
        <div className="text-center py-20 text-gray-500">Failed to load dashboard.</div>
    )

    const cards = [
        {label: 'Total Users', value: stats.totalUser, color: 'text-blue-600'},
        {label: 'Total Events', value: stats.totalEvents, color: 'text-purple-600'},
        {label: 'Total Registrations', value: stats.totalRegistration, color: 'text-green-600'},
        {label: 'Total Attendance', value: stats.totalAttendance, color: 'text-orange-600'},
        {label: 'Active Events', value: stats.activeEvents, color: 'text-teal-600'},
        {label: 'Cancelled Events', value: stats.cancelledEvents, color: 'text-red-600'},
        {label: 'Pending Requests', value: stats.pendingEventApprovals, color: 'text-yellow-600'},
    ]

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {cards.map(card => (
                    <div key={card.label} className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-sm text-gray-500 mb-1">{card.label}</p>
                        <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <Link
                        to="/pending-events"
                        className='bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 flex items-center gap-2'
                    >
                        Review Pending Events
                        {stats.pendingApprovals > 0 &&(
                            <span className='bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
                                {stats.pendingApprovals}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    )
}
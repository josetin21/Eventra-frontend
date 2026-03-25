import {useEffect, useState} from "react";
import api from "../api/axios.js"
import {Link} from "react-router-dom";

export default function OrganizerDashboard(){
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get(`/dashboard/organizer`)
            .then(res => setStats(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    if(loading) return(
        <div className="text-center py-20 text-gray-500">Loading dashboard...</div>
    )

    if(!stats) return (
        <div className="text-center py-20 text-gray-500">Failed to load dashboard.</div>
    )

    const cards = [
        {label: "Total Events", value: stats.myTotalEvents},
        {label: "Active Events", value: stats.myActiveEvents},
        {label: "Cancelled Events", value: stats.myCancelledEvents},
        {label: "Total Registrations", value: stats.myTotalRegistrations},
        {label: "Total Attendance", value: stats.myTotalAttendance}
    ]

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
                <Link
                    to="/create-event"
                    className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
                >
                    + Create Event
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cards.map(cards =>(
                    <div key={cards.label} className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-sm text-gray-500 mb-1">{cards.label}</p>
                        <p className="text-3xl font-bold text-blue-600">{cards.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
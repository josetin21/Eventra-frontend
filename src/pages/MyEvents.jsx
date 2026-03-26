import api from '../api/axios.js'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function MyEvents() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get(`/events/my`)
            .then(res => setEvents(res.data))
            .catch(err => console.error(err))
            .then(() => setLoading(false))
    }, [])

    if (loading) return(
        <div className="text-center py-20 text-gray-500">Loading your events...</div>
    )

    if (events.length === 0) return (
        <div className="text-center py-20 text-gray-500">
            <p className="text-xl mb-2">You haven't created any events yet.</p>
            <Link to="/create-event" className="text-blue-600 hover:underline text-sm">
                Create your first event →
            </Link>
        </div>
    )

    const statusStyles = {
        ACTIVE: 'bg-green-100 text-green-700',
        PENDING_APPROVAL: 'bg-yellow-100 text-yellow-700',
        CANCELLED: 'bg-red-100 text-red-700',
        COMPLETED: 'bg-gray-100 text-gray-700',
    }

    const statusLabels = {
        ACTIVE: 'Active',
        PENDING_APPROVAL: 'Pending Approval',
        CANCELLED: 'Cancelled',
        COMPLETED: 'Completed',
    }

    return (
        <div>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Events</h1>
                <Link
                    to="/create-event"
                    className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
                >
                    + Create Event
                </Link>
            </div>

            <div className="space-y-4">
                {events.map(event =>(
                    <div key={event.id} className="bg-white rounded-lg shadow-md p-6">

                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    📅 {new Date(event.eventDate).toLocaleDateString('en-IN',{
                                        day: 'numeric', month: 'long', year:'numeric'
                                })} · 📍 {event.venue}
                                </p>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[event.status]}`}>
                                {statusLabels[event.status]}
                            </span>
                        </div>


                        <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                        {event.status === 'CANCELLED' && event.rejectionReason && (
                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">
                                <span className="font-medium">Rejection reason: </span>
                                {event.rejectionReason}
                            </div>
                        )}

                        {event.status === 'ACTIVE' && (
                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                                <span>👥 {event.registeredCount} / {event.capacity} registered</span>
                            </div>
                        )}

                        {event.status === 'ACTIVE' && (
                            <div className="flex gap-3">
                                <Link
                                    to={`/scan-qr?eventId=${event.id}`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
                                >
                                    📷 Scan QR / Open Session
                                </Link>
                                <Link
                                    to={`/events/${event.id}`}
                                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50"
                                >
                                    View Event
                                </Link>
                            </div>
                        )}

                        {event.status === 'PENDING_APPROVAL' && (
                            <p className="text-yellow-600 text-sm">
                                ⏳ Your event is under review. Admin will approve or reject it shortly.
                            </p>
                        )}

                    </div>
                ))}

            </div>

        </div>
    )
}
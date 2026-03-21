import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";


export default function Home(){
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        api.get('/events')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    },[])

    if(loading) return(
        <div className="text-center py-20 text-gray-500">Loading events...</div>
    )

    if(events.length === 0) return(
        <div className="text-center py-20 text-gray-500">No Events available</div>
    )

    return(
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Events</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event=> (
                    <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                        
                        <div className="bg-blue-600 px-6 py-4">
                            <h2 className="text-white text-xl font-bold">{event.title}</h2>
                            <p className="text-blue-200 text-sm mt-1">{event.organizerName}</p>
                        </div>

                        <div className="px-6 py-4">
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {event.description}
                            </p>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span>📅</span>
                                    <span>{new Date(event.eventDate).toLocaleDateString('en-IN',{
                                        day:'numeric', month:'short', year:'numeric'
                                    })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>📍</span>
                                    <span>{event.venue}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>👥</span>
                                    <span>{event.registeredCount} / {event.capacity} registered</span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    event.status === 'ACTIVE'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                    {event.status}
                                </span>

                                <Link
                                    to={'/events/${event.id}'}
                                    className="text-blue-600 text-sm font-medium hover:underline"
                                >
                                    View Details → 
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
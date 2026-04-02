import { useState,useEffect } from "react";
import api from '../api/axios'


export default function MyParticipation(){
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        api.get(`/attendance/my`)
        .then(res => setAttendance(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }, [])

    if(loading) return(
        <div className="text-center py-20 text-gray-500">Loading attendance...</div>
    )

    if(attendance.length === 0) return(
        <div className="text-center py-20 text-gray-500">
            <p className="text-xl mb-2">No attendance records yet</p>
            <p className="text-sm">Your attendance will appear here after events.</p>
        </div>
    )

    return(
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Attendance</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {attendance.map(record =>(
                    <div key={record.id} className="bg-white rounded-lg shadow-md p-6">

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">{record.eventTitle}</h2>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                ✅ Attended
                            </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span>🕑</span>
                                <span>Marked at {new Date(record.markedAt).toLocaleDateString('en-IN',{
                                    day:'numeric', month:'long', year:'2-digit',
                                    hour:'2-digit', minute:'2-digit'
                                })}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
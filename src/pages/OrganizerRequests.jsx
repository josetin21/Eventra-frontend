import {useEffect, useState} from "react";
import api from '../api/axios.js'


export default function OrganizerRequests(){
    const [request, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(null)

    useEffect(() => {
        fetchRequests()
    }, [])

    const fetchRequests = () =>{
        api.get(`/organizer-requests`)
            .then(res => setRequests(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    const handleApprove = async (id) =>{
        setActionLoading(id)
        try{
            await api.put(`organizer-requests/${id}/approve`)
            fetchRequests()
        } catch (err){
            console.error(err)
        } finally {
            setActionLoading(null)
        }
    }

        const handleReject = async (id) =>{
        const reason = window.prompt("Enter rejection reason:")
        if(!reason) return

        setActionLoading(id)
            try {
                await api.put(`/organizer-requests/${id}/reject`, null, { params:{ reason }})
                fetchRequests()
            } catch (err){
                console.error(err)
            } finally {
                setActionLoading(null)
            }
        }

        const statusStyles = {
            PENDING: 'bg-yellow-100 text-yellow-700',
            APPROVED: 'bg-green-100 text-green-700',
            REJECTED: 'bg-red-100 text-red-700',
        }

        if(loading) return(
            <div className="text-center py-20 text-gray-500">Loading requests...</div>
        )

        if(request.length === 0) return (
            <div className="text-center py-20 text-gray-500">No organizer requests yet.</div>
        )

        return (
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Organizer Request</h1>

                <div className="space-y-4">
                    {request.map(req =>(
                        <div key={req.id} className="bg-white rounded-lg shadow-md p-6">

                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">{req.userName}</h2>
                                    <p className="text-sm text-gray-500">{req.userEmail} · {req.department} · {req.designation} </p>
                                </div>
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[req.status]}`}>
                                    {req.status}
                                </span>
                            </div>

                            <p className="text-gray-700 text-sm mb-3">
                                <span className="font-medium">Reason: </span>{req.reason}
                            </p>

                            {req.rejectionReason && (
                                <p className="text-red-600 text-sm mb-3">
                                    <span className="font-medium">Rejected because: </span>{req.rejectionReason}
                                </p>
                            )}

                            <p className="text-xs text-gray-400 mb-4">
                                Requested on {new Date(req.requestedAt).toLocaleDateString('en-IN',{
                                    day:'numeric', month:'long', year:'numeric'
                            })}
                            </p>

                            {req.status === 'PENDING' && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleApprove(req.id)}
                                        disabled={actionLoading === req.id}
                                        className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {actionLoading === req.id ? 'Processing...' : 'Approve'}
                                    </button>

                                    <button
                                        onClick={() => handleReject(req.id)}
                                        disabled={actionLoading === req.id}
                                        className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 disabled:opacity-50"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}

                        </div>
                    ))}

                </div>
            </div>
        )
}

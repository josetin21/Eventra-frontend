import api from '../api/axios.js'
import {useState} from "react";


export default function OrganizerRequestForm(){
    const [reason, setReason] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            await api.post(`/organizer-requests`, {reason})
            setSuccess('Requested submitted! The admin will review it shortly.')
            setReason('')
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit request")
        } finally {
            setLoading(false)
        }
    }

        return(
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                    <h1 className="text-xl font-bold text-center text-blue-600 mb-2">
                        Become an Organizer
                    </h1>
                    <p className="text-center text-gray-500 mb-6">
                        Tell us why you'd like to organize events
                    </p>

                    {error &&(
                        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    {success &&(
                        <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className='mb-6'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Reason
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={5}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Explain why you want to become an organizer..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 'Submit Request'}

                        </button>
                    </form>

                </div>
            </div>
        )
}

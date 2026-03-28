import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from '../api/axios.js'

export default function CreateEvent(){
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventDate: '',
        venue: '',
        capacity: '',
        registrationDeadline: '',
        idCardUrl: '',
        permissionLetterUrl: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError('')

        if (!formData.idCardUrl.trim() && !formData.permissionLetterUrl.trim()){
            setError('Please provide at least one verification document URL.')
            return
        }

        setLoading(true)
        try{
            await api.post(`/events`,{
                ...formData,
                capacity: parseInt(formData.capacity),
                eventDate: formData.eventDate + ':00',
                registrationDeadline: formData.registrationDeadline + ':00'
            })
            setSubmitted(true)
        }catch (err){
            setError(err.response?.data?.message || 'Failed to create event')
        }finally {
            setLoading(false)
        }
    }

    if (submitted) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md w-full">
                <p className="text-5xl mb-4">🎉</p>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Submitted!</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Your event has been submitted for admin review. You'll be notified once it's approved
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(`/my-events`)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
                    >
                        View My Events
                    </button>
                    <button
                        onClick={() => { setSubmitted(false); setFormData({
                            title: '',
                            description: '',
                            eventDate: '',
                            venue: '',
                            capacity: '',
                            registrationDeadline: '',
                            idCardUrl: '',
                            permissionLetterUrl: ''
                        }) }}
                        className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-50"
                    >
                        Create Another
                    </button>
                </div>
            </div>
        </div>
    )

    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">

                <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">
                    Create Event
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Submit your event for admin approval
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className='mb-4'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Event Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Annual Tech Symposium"
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe what the event is about..."
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Venue
                        </label>
                        <input
                            type="text"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Auditorium Block A"
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Capacity
                        </label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. 100"
                            required
                        />
                    </div>

                    <div className="flex gap-4 mb-6">

                        <div className="flex-1 min-w-0">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Event Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Registration Deadline
                            </label>
                            <input
                                type="datetime-local"
                                name="registrationDeadline"
                                value={formData.registrationDeadline}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-6">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                            Verification Documents
                            <span className="text-red-500 ml-1">*</span>
                        </p>
                        <p className="text-xs text-gray-400 mb-3">
                            Provide at least one document URL. Upload your files to Google Drive or similar and paste the link.
                        </p>

                        <div className="mb-3">
                            <label className="block text-xs text-gray-500 mb-1">🪪 ID Card URL</label>
                            <input
                                type="url"
                                name="idCardUrl"
                                value={formData.idCardUrl}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://drive.google.com/..."
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-xs text-gray-500 mb-1">📄 Permission Letter URL</label>
                            <input
                                type="url"
                                name="permissionLetterUrl"
                                value={formData.permissionLetterUrl}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://drive.google.com/..."
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit for Approval'}
                    </button>

                </form>

            </div>
        </div>
    )
}
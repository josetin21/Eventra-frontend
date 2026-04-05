import api from '../api/axios.js'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Profile(){
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchProfile = async () =>{
            setLoading(true)
            setError('')
            try{
                const res = await api.get('/users/me')
                setProfile(res.data)
            } catch (err){
                setError(err.response?.data?.message || "Failed to load profile")
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    if (loading) return <div className='text-center py-20 text-gray-500'>Loading profile...</div>

    return (
        <div className='max-w-3xl mx-auto'>
            <div className='bg-white rounded-lg shadow-md p-6'>
                <h1 className='text-2xl font-bold text-gray-800'>My Profile</h1>

                {error &&(
                    <div className='mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium'>
                        {error}
                    </div>
                )}

                {!error && profile && (
                    <div className='mt-6 space-y-3 text-gray-700'>
                        <div><span className='font-semibold'>Name:</span> {profile.name}</div>
                        <div><span className='font-semibold'>Email:</span> {profile.email}</div>
                        <div><span className='font-semibold'>Department:</span> {profile.department}</div>
                        <div><span className='font-semibold'>Year:</span> {profile.year}</div>
                    </div>
                )}

                <div className='mt-8 flex gap-3'>
                    <Link
                        to='/profile/edit'
                        className='bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700'
                    >
                        Edit Profile
                    </Link>

                    <Link
                        to='/profile/change-password'
                        className='border border-gray-300 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-50'
                    >
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
    )
}
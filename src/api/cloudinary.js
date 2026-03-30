const CLOUD_NAME = 'dwf8kcsup'
const UPLOAD_PRESET = 'eventra_docs'

export async function uploadToCloudinary(file){
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('folder', 'eventra')

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
            method: 'POST',
            body: formData
        }
    )

    if (!response.ok){
        throw new Error('Upload failed')
    }

    const data = await response.json()
    return data.secure_url
}
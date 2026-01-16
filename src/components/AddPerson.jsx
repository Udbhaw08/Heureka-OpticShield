import { useState } from 'react'
import './AddPerson.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function AddPerson({ onPersonAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        personId: '',
        flag: 'whitelist',
        metadata: '',
        image: ''
    })
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            // Convert to base64
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: reader.result
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.personId) {
            setError('Name and Person ID are required')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_URL}/api/persons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    flag: formData.flag,
                    metadata: formData.metadata,
                    image: formData.image
                })
            })

            if (!response.ok) {
                throw new Error('Failed to add person')
            }

            const newPerson = await response.json()

            // Show success message
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)

            // Reset form
            handleReset()

            // Notify parent component to refresh the table
            if (onPersonAdded) {
                onPersonAdded(newPerson)
            }
        } catch (err) {
            setError(err.message || 'Failed to add person')
            console.error('Error adding person:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        setFormData({
            name: '',
            personId: '',
            flag: 'whitelist',
            metadata: '',
            image: ''
        })
        setImageFile(null)
        setError(null)
        setSuccess(false)
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) fileInput.value = ''
    }

    return (
        <div className="add-person-container">
            <h2 className="add-person-title">Add Person</h2>

            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">Person added successfully!</div>}

            <form className="add-person-content" onSubmit={handleSubmit}>
                <div className="input-row">
                    <div className="input-field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label>Person ID</label>
                        <input
                            type="text"
                            name="personId"
                            value={formData.personId}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label>Flag</label>
                        <select
                            name="flag"
                            value={formData.flag}
                            onChange={handleInputChange}
                        >
                            <option value="whitelist">Whitelist</option>
                            <option value="blacklist">Blacklist</option>
                            <option value="watchlist">Watchlist</option>
                        </select>
                    </div>
                </div>

                <div className="second-row">
                    <div className="metadata-area">
                        <textarea
                            name="metadata"
                            value={formData.metadata}
                            onChange={handleInputChange}
                            placeholder="Optional notes / role / remarks"
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="upload-field">
                        <label>Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <div className="button-row">
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        Use Camera
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleReset}
                        disabled={loading}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddPerson

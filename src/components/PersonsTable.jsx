import { useState, useEffect } from 'react'
import './PersonsTable.css'

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function PersonsTable({ refreshTrigger }) {
    const [persons, setPersons] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch persons from backend
    useEffect(() => {
        fetchPersons()
    }, [refreshTrigger]) // Re-fetch when refreshTrigger changes

    const fetchPersons = async () => {
        try {
            setLoading(true)
            // Replace with your actual API endpoint
            const response = await fetch(`${API_URL}/api/persons`)
            const data = await response.json()
            setPersons(data)
            setError(null)
        } catch (err) {
            setError('Failed to fetch persons')
            console.error('Error fetching persons:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleToggleFlag = async (id, currentFlag) => {
        try {
            const newFlag = currentFlag === 'whitelist' ? 'blacklist' :
                currentFlag === 'blacklist' ? 'watchlist' : 'whitelist'

            const response = await fetch(`${API_URL}/api/persons/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ flag: newFlag })
            })

            if (response.ok) {
                fetchPersons() // Refresh the list
            }
        } catch (err) {
            console.error('Error toggling flag:', err)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this person?')) return

        try {
            const response = await fetch(`${API_URL}/api/persons/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                fetchPersons() // Refresh the list
            }
        } catch (err) {
            console.error('Error deleting person:', err)
        }
    }

    const getTableContent = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan="6" className="table-status">Loading persons...</td>
                </tr>
            )
        }

        if (error) {
            return (
                <tr>
                    <td colSpan="6" className="table-status error">
                        {error}
                        <button className="retry-btn" onClick={fetchPersons}>Retry</button>
                    </td>
                </tr>
            )
        }

        if (persons.length === 0) {
            return (
                <tr>
                    <td colSpan="6" className="no-data">No persons found</td>
                </tr>
            )
        }

        return persons.map((person) => (
            <tr key={person._id}>
                <td>
                    {person.image ? (
                        <img src={person.image} alt={person.name} className="person-img" />
                    ) : (
                        <div className="person-img-placeholder">{person.id}</div>
                    )}
                </td>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.flag}</td>
                <td>{person.metadata || '-'}</td>
                <td>
                    <div className="action-buttons">
                        <button
                            className="btn-action btn-toggle"
                            onClick={() => handleToggleFlag(person._id, person.flag)}
                        >
                            Toggle Flag
                        </button>
                        <button
                            className="btn-action btn-delete"
                            onClick={() => handleDelete(person._id)}
                        >
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        ))
    }

    return (
        <div className="persons-container">
            <h2 className="persons-title">Persons</h2>

            <div className="table-wrapper">
                <table className="persons-table">
                    <thead>
                        <tr>
                            <th>Img</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Flag</th>
                            <th>Metadata</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTableContent()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PersonsTable

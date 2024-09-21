import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StatePage = () => {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [stateToDelete, setStateToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    // Fetch states from the backend API
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/states'); // Adjust the API endpoint based on your backend
                if (!response.ok) {
                    throw new Error('Failed to fetch states');
                }
                const data = await response.json();
                setStates(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStates();
    }, []);

    const handleDeleteClick = (id) => {
        setStateToDelete(id);
        setConfirmDelete(true);
    };

    const confirmDeletion = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/states/${stateToDelete}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete state');
            }
            setStates(states.filter(state => state._id !== stateToDelete));
            setConfirmDelete(false);
            setStateToDelete(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const cancelDeletion = () => {
        setConfirmDelete(false);
        setStateToDelete(null);
    };

    // Filtered states based on search term
    const filteredStates = states.filter(state =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading states...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <i className="fa-solid fa-map text-purple-700 text-xl"></i>
                    <h1 className="text-3xl font-bold text-gray-800">State</h1>
                </div>
                {/* Search Bar */}
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        placeholder="Search by State Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                    />
                </div>
                {/* Add New Button */}
                <Link to="/dashboard/addstate" className="bg-purple-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-purple-700 transition duration-300">
                    Add New State
                </Link>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-purple-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Id</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">State Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">State Code</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStates.length > 0 ? (
                            filteredStates.map((state) => (
                                <tr key={state._id} className="hover:bg-gray-100 transition duration-150">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{state.stateID}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{state.name}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{state.code}</td>
                                    <td className="py-4 px-6 text-sm">
                                        <span className={state.status === 'Active' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                            {state.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm flex gap-4">
                                        <Link to={`/dashboard/editstate/${state._id}`} className="text-blue-500 hover:text-blue-700 transition duration-200">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => handleDeleteClick(state._id)} className="text-red-500 hover:text-red-700 transition duration-200">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                                    No states found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Dialog */}
            {confirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this state?</p>
                        <div className="mt-4 flex justify-end">
                            <button onClick={cancelDeletion} className="mr-2 bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
                            <button onClick={confirmDeletion} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatePage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditState() {
    const { id } = useParams(); // Get the state id from the URL params
    const [stateName, setStateName] = useState('');
    const [stateCode, setStateCode] = useState('');
    const [status, setStatus] = useState('active');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [originalState, setOriginalState] = useState(null); // Store the original state data

    const navigate = useNavigate();

    // Fetch the state details by id when the component mounts
    useEffect(() => {
        const fetchStateData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/states/${id}`); // Replace with your backend API URL
                if (!response.ok) {
                    throw new Error('Failed to fetch state data');
                }
                const state = await response.json();
                setStateName(state.name);
                setStateCode(state.code);
                setStatus(state.status);
                setOriginalState(state); // Save the original state data
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStateData();
    }, [id]);

    const handleBackClick = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const handleSaveClick = async () => {
        // Check if there are any changes before saving
        if (
            stateName === originalState.name &&
            stateCode === originalState.code &&
            status === originalState.status
        ) {
            alert('No changes made.');
            return; // Exit the function if no changes were made
        }

        if (stateName && stateCode) {
            try {
                const response = await fetch(`http://localhost:5000/api/states/${id}`, {
                    method: 'PUT', // Use PUT for updates
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: stateName,
                        code: stateCode,
                        status,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update state');
                }

                alert('State updated successfully');

                navigate('/dashboard/state'); // Navigate to state listing after saving
            } catch (err) {
                alert(`Error: ${err.message}`);
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    if (loading) {
        return <div>Loading state data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='p-6'>
            <div className='flex items-center gap-4'>
                <i className="fa-solid fa-arrow-left rounded-full p-2 hover:bg-gray-300 cursor-pointer" onClick={handleBackClick}></i>
                <div className='text-xl font-bold'>Edit State</div>
            </div>

            <div className='mt-6 flex gap-8'>
                <input
                    type="text"
                    placeholder="State name"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                />
                <input
                    type="text"
                    placeholder="State code"
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div className='flex gap-6 mt-12'>
                <button
                    className='bg-gray-300 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-400 transition duration-300'
                    onClick={handleBackClick}
                >
                    Cancel
                </button>
                <button
                    className='bg-purple-600 px-4 py-2 rounded-xl text-white hover:bg-purple-700 transition duration-300'
                    onClick={handleSaveClick}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditState;

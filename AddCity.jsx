import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCity() {
    const [cityName, setCityName] = useState('');
    const [cityCode, setCityCode] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]); // State to hold the list of states
    const navigate = useNavigate();

    // Fetch the list of states
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/states'); // Adjust the endpoint as necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch states');
                }
                const data = await response.json();
                setStates(data); // Set the fetched states
                if (data.length > 0) {
                    setSelectedState(data[0].name); // Set the first state as the default selected state
                }
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        fetchStates();
    }, []);

    const handleBackClick = () => {
        navigate(-1); // This takes the user to the previous route
    };

    const handleSaveClick = async () => {
        if (cityName && cityCode && selectedState) {
            try {
                const response = await fetch('http://localhost:5000/api/cities', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: cityName,
                        code: cityCode, // Assuming cityCode is intended to be cityID
                        state: selectedState,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add city');
                }

                const newCity = await response.json();
                console.log('City added successfully:', newCity);
                navigate('/dashboard/city'); // Navigate to city listing or relevant page after saving
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className='p-6'>
            <div className='flex items-center gap-4'>
                <i className="fa-solid fa-arrow-left rounded-full p-2 hover:bg-gray-300 cursor-pointer" onClick={handleBackClick}></i>
                <div className='text-xl font-bold'>Add City</div>
            </div>
            <div className='mt-6 flex gap-8'>
                <input
                    type="text"
                    placeholder="City name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                />
                <input
                    type="text"
                    placeholder="City code"
                    value={cityCode}
                    onChange={(e) => setCityCode(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                />
                <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                >
                    {states.map((state) => (
                        <option key={state._id} value={state.name}>{state.name}</option>
                    ))}
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

export default AddCity;

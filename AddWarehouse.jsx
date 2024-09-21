import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddWarehouse() {
    const [warehouseName, setWarehouseName] = useState('');
    const [states, setStates] = useState([]); // State for states
    const [cities, setCities] = useState([]); // State for cities
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    // Fetch states and cities on component mount
    useEffect(() => {
        const fetchStatesAndCities = async () => {
            try {
                const statesResponse = await fetch('http://localhost:5000/api/states'); // Adjust the API endpoint as necessary
                const statesData = await statesResponse.json();
                setStates(statesData);

                const citiesResponse = await fetch('http://localhost:5000/api/cities'); // Adjust the API endpoint as necessary
                const citiesData = await citiesResponse.json();
                setCities(citiesData);

                // Set the default selected state and city
                if (statesData.length > 0) setSelectedState(statesData[0].name);
                if (citiesData.length > 0) setSelectedCity(citiesData[0].name);
            } catch (error) {
                console.error('Error fetching states or cities:', error);
            }
        };

        fetchStatesAndCities();
    }, []);

    const handleBackClick = () => {
        navigate(-1); // This takes the user to the previous route
    };

    const handleSaveClick = async () => {
        if (warehouseName && selectedState && selectedCity) {
            try {
                const response = await fetch('http://localhost:5000/api/warehouses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: warehouseName,
                        state: selectedState,
                        city: selectedCity,
                        status: 'Active', // Default status
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add warehouse');
                }

                const data = await response.json();
                console.log('Warehouse added:', data);
                navigate('/dashboard/warehouse'); // Navigate to warehouse listing or relevant page after saving
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
                <div className='text-xl font-bold'>Add Warehouse</div>
            </div>
            <div className='mt-6 flex gap-8'>
                <input
                    type="text"
                    placeholder="Warehouse name"
                    value={warehouseName}
                    onChange={(e) => setWarehouseName(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                />
                <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                >
                    {states.map((state) => (
                        <option key={state.id} value={state.name}>{state.name}</option> // Assuming 'id' and 'name' are available
                    ))}
                </select>
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                >
                    {cities.map((city) => (
                        <option key={city.id} value={city.name}>{city.name}</option> // Assuming 'id' and 'name' are available
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

export default AddWarehouse;

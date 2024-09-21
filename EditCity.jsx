import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditCity() {
    const { id } = useParams(); // Get city ID from URL parameters
    const [cityName, setCityName] = useState('');
    const [cityCode, setCityCode] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [status, setStatus] = useState('active');
    const [states, setStates] = useState([]);
    const navigate = useNavigate();

    // Fetch city data and states on component mount
    useEffect(() => {
        const fetchCityData = async () => {
            try {
                console.log(id);

                const response = await fetch(`http://localhost:5000/api/cities/${id}`);
                if (!response.ok) throw new Error('Failed to fetch city data');
                const city = await response.json();
                setCityName(city.name);
                setCityCode(city.code);
                setSelectedState(city.state);
                setStatus(city.status);
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        };

        const fetchStates = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/states'); // Adjust API endpoint as needed
                if (!response.ok) throw new Error('Failed to fetch states');
                const data = await response.json();
                setStates(data); // Assuming the response is an array of states
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        fetchCityData();
        fetchStates();
    }, [id]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSaveClick = async () => {
        if (cityName && cityCode) {
            const cityData = { name: cityName, code: cityCode, state: selectedState, status };
            try {
                const response = await fetch(`http://localhost:5000/api/cities/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cityData),
                });

                if (!response.ok) throw new Error('Failed to update city');

                alert('City updated successfully');
                navigate('/dashboard/city');
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
                <div className='text-xl font-bold'>Edit City</div>
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
                    {states.map(state => (
                        <option key={state._id} value={state.name}>{state.name}</option>
                    ))}
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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

export default EditCity;

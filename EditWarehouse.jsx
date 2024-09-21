import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditWarehouse() {
    const { id } = useParams(); // Get the warehouse ID from the URL parameters
    const [warehouseName, setWarehouseName] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [status, setStatus] = useState('Active');
    const [originalData, setOriginalData] = useState(null);
    const [states, setStates] = useState([]); // For storing states
    const [cities, setCities] = useState([]); // For storing cities
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/states');
                if (!response.ok) {
                    throw new Error('Failed to fetch states');
                }
                const data = await response.json();
                setStates(data);
                setSelectedState(data[0]?.name || ''); // Set default state
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cities');
                if (!response.ok) {
                    throw new Error('Failed to fetch cities');
                }
                const data = await response.json();
                setCities(data);
                setSelectedCity(data[0]?.name || ''); // Set default city
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        const fetchWarehouse = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/warehouses/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch warehouse data');
                }
                const data = await response.json();
                setWarehouseName(data.name);
                setSelectedState(data.state);
                setSelectedCity(data.city);
                setStatus(data.status);
                setOriginalData(data);
            } catch (error) {
                console.error('Error fetching warehouse:', error);
            }
        };

        fetchStates();
        fetchCities();
        fetchWarehouse();
    }, [id]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSaveClick = async () => {
        if (warehouseName && selectedState && selectedCity) {
            if (
                warehouseName !== originalData.name ||
                selectedState !== originalData.state ||
                selectedCity !== originalData.city ||
                status !== originalData.status
            ) {
                try {
                    const response = await fetch(`http://localhost:5000/api/warehouses/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: warehouseName,
                            state: selectedState,
                            city: selectedCity,
                            status: status,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to update warehouse');
                    }

                    navigate('/dashboard/warehouse');
                } catch (error) {
                    alert(error.message);
                }
            } else {
                alert('No changes made to the warehouse data.');
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className='p-6'>
            <div className='flex items-center gap-4'>
                <i className="fa-solid fa-arrow-left rounded-full p-2 hover:bg-gray-300 cursor-pointer" onClick={handleBackClick}></i>
                <div className='text-xl font-bold'>Edit Warehouse</div>
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
                        <option key={state.id} value={state.name}>{state.name}</option>
                    ))}
                </select>
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border w-[30%] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                >
                    {cities.map((city) => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
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

export default EditWarehouse;

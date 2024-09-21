import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddState() {
    const [stateName, setStateName] = useState('');
    const [stateCode, setStateCode] = useState('');
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // This takes the user to the previous route
    };

    const handleSaveClick = async () => {
        if (stateName && stateCode) {
            try {
                const response = await fetch('http://localhost:5000/api/states', { // Replace YOUR_PORT with your actual port
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: stateName,
                        code: stateCode,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to save state');
                }

                const data = await response.json();
                console.log(`Saved State:`, data);
                alert("New state added")
                navigate(-1); // Navigate to state listing or relevant page after saving
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    const handleCancelClick = () => {
        setStateName('');
        setStateCode('');
    };

    return (
        <div className="p-6">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4">
                <i
                    className="fa-solid fa-arrow-left rounded-full p-2 hover:bg-gray-300 cursor-pointer"
                    onClick={handleBackClick}
                ></i>
                <h1 className="text-xl font-bold">Add State</h1>
            </div>

            {/* Form Inputs */}
            <div className="mt-6 flex gap-8">
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
            </div>

            {/* Action Buttons */}
            <div className="flex gap-6 mt-12">
                <button
                    onClick={handleCancelClick}
                    className="bg-gray-300 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-400 transition duration-300"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSaveClick}
                    className="bg-purple-600 px-4 py-2 rounded-xl text-white hover:bg-purple-700 transition duration-300"
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default AddState;

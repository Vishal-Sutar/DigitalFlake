import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CityPage = () => {
    const [cities, setCities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [cityToDelete, setCityToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    // Fetch all cities from the backend API
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cities');
                if (!response.ok) {
                    throw new Error('Failed to fetch cities');
                }
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    // Handle deletion of a city
    const handleDeleteClick = (cityId) => {
        setCityToDelete(cityId);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/cities/${cityToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete city');
            }

            // Remove the deleted city from the state
            setCities(cities.filter(city => city._id !== cityToDelete));
            alert('City deleted successfully');
        } catch (error) {
            alert(error.message);
        } finally {
            setShowModal(false);
            setCityToDelete(null);
        }
    };

    // Filtered cities based on search term
    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6 bg-gray-100">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <i className="fa-solid fa-city text-purple-700 text-xl"></i>
                    <h1 className="text-3xl font-bold text-gray-800">City</h1>
                </div>

                {/* Search Bar */}
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        placeholder="Search by City or State"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                    />
                </div>

                {/* Add New Button */}
                <Link to={"/dashboard/addcity"} className="bg-purple-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-purple-700 transition duration-300">
                    Add New City
                </Link>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-purple-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Id</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">City Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">City Code</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">State Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCities.length > 0 ? (
                            filteredCities.map((city) => (
                                <tr key={city._id} className="hover:bg-gray-100 transition duration-150">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{city.cityID}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{city.name}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{city.code}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{city.state}</td>
                                    <td className="py-4 px-6 text-sm">
                                        <span className={city.status === 'Active' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                            {city.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm flex gap-4">
                                        <Link to={`/dashboard/editcity/${city._id}`} className="text-blue-500 hover:text-blue-700 transition duration-200">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => handleDeleteClick(city._id)} className="text-red-500 hover:text-red-700 transition duration-200">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                                    No cities found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Confirmation */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this city?</p>
                        <div className="flex justify-end mt-6">
                            <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded-md">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CityPage;

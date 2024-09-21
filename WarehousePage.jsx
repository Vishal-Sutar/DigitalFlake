import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WarehousePage = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [warehouseToDelete, setWarehouseToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    // Fetch all warehouses from the backend API
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/warehouses');
                if (!response.ok) {
                    throw new Error('Failed to fetch warehouses');
                }
                const data = await response.json();
                setWarehouses(data);
            } catch (error) {
                console.error('Error fetching warehouses:', error);
            }
        };

        fetchWarehouses();
    }, []);

    // Handle deletion of a warehouse
    const handleDeleteClick = (warehouseId) => {
        setWarehouseToDelete(warehouseId);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/warehouses/${warehouseToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete warehouse');
            }

            // Remove the deleted warehouse from the state
            setWarehouses(warehouses.filter(warehouse => warehouse._id !== warehouseToDelete));
            alert('Warehouse deleted successfully');
        } catch (error) {
            alert(error.message);
        } finally {
            setShowModal(false);
            setWarehouseToDelete(null);
        }
    };

    // Filtered warehouses based on search term
    const filteredWarehouses = warehouses.filter(warehouse =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6 bg-gray-100">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <i className="fa-solid fa-warehouse text-purple-700 text-xl"></i>
                    <h1 className="text-3xl font-bold text-gray-800">Warehouse</h1>
                </div>

                {/* Search Bar */}
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        placeholder="Search by Name, State, or City"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                    />
                </div>

                {/* Add New Button */}
                <Link to={"/dashboard/addwarehouse"} className="bg-purple-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-purple-700 transition duration-300">
                    Add New Warehouse
                </Link>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-purple-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Id</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Warehouse Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">State</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">City</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredWarehouses.length > 0 ? (
                            filteredWarehouses.map((warehouse) => (
                                <tr key={warehouse._id} className="hover:bg-gray-100 transition duration-150">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{warehouse.warehouseID}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{warehouse.name}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{warehouse.state}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{warehouse.city}</td>
                                    <td className="py-4 px-6 text-sm">
                                        <span className={warehouse.status === 'Active' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                            {warehouse.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm flex gap-4">
                                        <Link to={`/dashboard/editwarehouse/${warehouse._id}`} className="text-blue-500 hover:text-blue-700 transition duration-200">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => handleDeleteClick(warehouse._id)} className="text-red-500 hover:text-red-700 transition duration-200">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                                    No warehouses found
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
                        <p>Are you sure you want to delete this warehouse?</p>
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

export default WarehousePage;

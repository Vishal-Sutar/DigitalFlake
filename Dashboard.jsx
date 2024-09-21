import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo2.png";

const Dashboard = () => {
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');

        // Optionally, you can also clear any user-related state here if applicable

        // Redirect to the login page
        navigate('/', { replace: true });
    };

    return (
        <div className='h-screen flex flex-col'>
            {/* Navbar */}
            <nav className='bg-purple-700 px-8 py-4 flex justify-between items-center shadow-md'>
                <img src={Logo} className='w-40' alt="Logo" />

                <div className='relative'>
                    <div
                        className='profile text-white bg-purple-500 hover:bg-purple-600 transition-colors duration-300 rounded-full px-4 py-2 cursor-pointer'
                        onClick={() => setShowDialog(!showDialog)}
                    >
                        <i className="fa-regular fa-user"></i>
                    </div>

                    {/* Dropdown Menu */}
                    {showDialog && (
                        <div className='absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg'>
                            <p className='px-4 py-2 text-sm'>Do you want to logout?</p>
                            <div className='flex justify-around p-2'>
                                <button
                                    className='bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 transition-colors duration-300'
                                    onClick={handleLogout} // Call handleLogout on Yes
                                >
                                    Yes
                                </button>
                                <button
                                    className='bg-gray-300 px-4 py-1 rounded hover:bg-gray-400 transition-colors duration-300'
                                    onClick={() => setShowDialog(false)} // Close the dialog on No
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className='flex flex-1 overflow-hidden'>
                {/* Sidebar */}
                <div className="menus w-1/5 bg-purple-100 p-5 h-full">
                    {/* Menu Items */}
                    <MenuLink to="/dashboard/home" icon="fa-house" label="Home" />
                    <MenuLink to="/dashboard/state" icon="fa-map" label="State" />
                    <MenuLink to="/dashboard/city" icon="fa-city" label="City" />
                    <MenuLink to="/dashboard/warehouse" icon="fa-warehouse" label="Warehouse" />
                </div>

                {/* Content Section */}
                <div className="section w-4/5 bg-gray-100 p-8 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

// Reusable Menu Link component
const MenuLink = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex justify-between items-center gap-4 rounded-lg p-4 mb-4 
                ${isActive ? 'bg-purple-500 text-white' : 'bg-purple-200 hover:bg-purple-500 hover:text-white'} 
                transition-colors duration-300`
            }
        >
            <div className='flex gap-4 items-center'>
                <i className={`fa-solid ${icon} text-lg`}></i>
                <div className='text-lg font-medium'>{label}</div>
            </div>
            <i className="fa-solid fa-caret-right text-gray-400 hover:text-white"></i>
        </NavLink>
    );
};

export default Dashboard;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError(''); // Clear previous errors
        setLoading(true); // Set loading state to true

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Registration failed');
            }

            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="p-10 shadow-lg bg-white rounded-lg w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Register</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <div className="mb-5">
                    <input
                        type="text"
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring focus:ring-purple-300 transition duration-200"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        aria-label="Name"
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="email"
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring focus:ring-purple-300 transition duration-200"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-label="Email"
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="password"
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring focus:ring-purple-300 transition duration-200"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-label="Password"
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring focus:ring-purple-300 transition duration-200"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        aria-label="Confirm Password"
                    />
                </div>

                <p className='text-center'>Already have an account? <Link to="/" className='text-purple-500 hover:underline'>Login</Link></p>

                <button
                    type="submit"
                    className={`w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading} // Disable button when loading
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;

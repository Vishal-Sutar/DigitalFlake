import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';// Import an icon for closing

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Login failed. Please try again.');
            }

            const res = await response.json();
            localStorage.setItem('token', res.token);
            navigate('/dashboard/home', { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className={`p-10 shadow-lg bg-white rounded-lg w-full max-w-sm `}>
                <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Login</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

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

                <div className="mb-4">
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



                <p className="text-center">
                    Don't have an account? <a href="/register" className="text-purple-500 hover:underline">Register</a>
                </p>


                <button
                    type="submit"
                    className={`w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>





        </div>
    );
};

export default Login;

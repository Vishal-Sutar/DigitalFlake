import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error occurred while sending the password reset link');
            }

            const resData = await response.json();
            setMessage(resData.message || 'A password reset link has been sent to your email');
            setError('');
        } catch (err) {
            console.error(err);
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="p-8 shadow-lg bg-white rounded-lg">
                <h1 className="text-2xl mb-4">Forgot Password</h1>
                {message && <p className="text-green-500 mb-4">{message}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="email"
                    className="border p-2 w-full mb-4"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Request Reset Link
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;

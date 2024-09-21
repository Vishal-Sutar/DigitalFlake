import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import stateRoutes from './routes/stateRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import warehouseRoutes from './routes/warehouseRoutes.js';
import authRoutes from './routes/authRoutes.js'

import cors from 'cors';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/warehouses', warehouseRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

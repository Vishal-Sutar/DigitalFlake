import express from 'express';
import City from '../models/City.js'; // Adjust the path as necessary

const router = express.Router();

// POST endpoint to add a new city
router.post('/', async (req, res) => {
    try {
        const city = new City(req.body);
        const id = await City.countDocuments() + 1;
        city.cityID = id;
        await city.save();
        res.status(201).json(city);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating city' });
    }
});

router.get('/', async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// PUT endpoint to edit a city by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findByIdAndUpdate(id, req.body, { new: true });

        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json(city);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating city' });
    }
});

// GET endpoint to get a city by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findById(id);

        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json(city);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE endpoint to delete a city by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const city = await City.findByIdAndDelete(id);

        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

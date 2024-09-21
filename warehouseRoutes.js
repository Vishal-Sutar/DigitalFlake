import express from 'express';
import Warehouse from '../models/Warehouse.js'; // Adjust the path as necessary

const router = express.Router();

// POST endpoint to add a new warehouse
router.post('/', async (req, res) => {
    try {
        const warehouse = new Warehouse(req.body);
        const id = await Warehouse.countDocuments() + 1;
        warehouse.warehouseID = id;
        await warehouse.save();
        res.status(201).json(warehouse);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating warehouse' });
    }
});

// GET endpoint to fetch all warehouses
router.get('/', async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.status(200).json(warehouses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT endpoint to edit a warehouse by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const warehouse = await Warehouse.findByIdAndUpdate(id, req.body, { new: true });

        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        res.status(200).json(warehouse);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating warehouse' });
    }
});

// GET endpoint to fetch a warehouse by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const warehouse = await Warehouse.findById(id);

        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        res.status(200).json(warehouse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE endpoint to delete a warehouse by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const warehouse = await Warehouse.findByIdAndDelete(id);

        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        res.status(200).json({ message: 'Warehouse deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

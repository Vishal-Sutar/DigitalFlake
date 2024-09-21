import express from 'express';
import State from '../models/State.js'; // Ensure the correct file path and extension

const router = express.Router();

// Create a new state
router.post('/', async (req, res) => {
    const { name, code } = req.body;

    try {
        // Get the count of states to assign a new stateID
        const stateCount = await State.countDocuments();
        const stateID = stateCount + 1;

        // Log the stateID for debugging purposes
        console.log(`Assigned stateID: ${stateID}`);

        const newState = new State({
            stateID,
            name,
            code,
        });

        // Save the new state to the database
        const savedState = await newState.save();
        res.status(201).json(savedState);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error saving state:', error);
        res.status(500).json({ message: 'Failed to create state' });
    }
});

// Get all states
router.get('/', async (req, res) => {
    try {
        const states = await State.find();
        res.status(200).json(states);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching states:', error);
        res.status(500).json({ message: 'Failed to retrieve states' });
    }
});

// Get a single state by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find state by stateID
        const state = await State.findById(id);

        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }

        res.status(200).json(state);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching state:', error);
        res.status(500).json({ message: 'Failed to retrieve state' });
    }
});

// Edit an existing state
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, code, status } = req.body;

    try {
        // Find the state by its stateID and update it

        const updatedState = await State.findByIdAndUpdate(id, { name, code, status })

        if (!updatedState) {
            return res.status(404).json({ message: 'State not found' });
        }

        res.status(200).json(updatedState);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error updating state:', error);
        res.status(500).json({ message: 'Failed to update state' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the state by ID
        const state = await State.findByIdAndDelete(id);

        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }

        res.status(200).json({ message: 'State deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the router
export default router;

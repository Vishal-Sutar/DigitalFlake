import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
    stateID: {
        type: Number,
        required: true // Make sure stateID is required
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    }
});

const State = mongoose.model('State', stateSchema);

export default State;

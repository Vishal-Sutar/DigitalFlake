import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
    warehouseID: {
        type: Number,
        required: true // Make sure stateID is required
    },
    name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    }
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

export default Warehouse;

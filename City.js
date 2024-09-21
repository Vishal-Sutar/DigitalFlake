import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    cityID: {
        type: Number,
        required: true // Make sure stateID is required
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    }
});


const City = mongoose.model('City', citySchema);

export default City;

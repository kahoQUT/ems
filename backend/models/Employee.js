
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

module.exports = mongoose.model('Employee', employeeSchema);
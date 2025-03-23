
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String },
    salary: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    hireDate: { type: Date },
    status: { type: String, enum: ['Active', 'Inactive', 'Terminated'], default: 'Active' }
});

module.exports = mongoose.model('Employee', employeeSchema);
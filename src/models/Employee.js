const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  salary: { type: Number, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
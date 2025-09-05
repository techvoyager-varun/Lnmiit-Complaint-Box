const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['student', 'warden', 'maintenance'], default: 'student' },
    // student
    rollNumber: { type: String },
    roomNumber: { type: String },
    building: { type: String },
    // warden
    assignedBuilding: { type: String },
    // maintenance
    profession: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = { User };



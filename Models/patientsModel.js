const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, "Name is required"]
     },
     address: {
          type: String,
          required: [true, "Address is required"],
          minlength: 10
     },
     email: {
          type: String,
          required: [true, "Email is required"],
          unique: true,
          validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     },
     phone_number: {
          type: String,
          required: [true, "Phone number is required"],
          validate: /^\+\d{1,3}\d{10}$/
     },
     password: {
          type: String,
          required: [true, "Password is required"],
     },
     patient_photo: {
          type: String,
          required: [true, "Patient photo is required"],
     },
     psychiatrist: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Psychiatrist',
          required: true
     },
     hospital: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Hospital',
          required: true
     },
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;

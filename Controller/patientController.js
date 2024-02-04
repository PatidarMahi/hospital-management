const Patient = require("../Models/patientsModel");
const { catchError } = require('../Middleware/CatchError');
const ErrorHandler = require('../Utils/ErrorHandler');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'uploads/'); // Create an 'uploads' directory in your project
     },
     filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname));
     },
});

// Multer upload configuration
exports.upload = multer({ storage: storage });

exports.addPatient = catchError(async (req, res, next) => {
     const { name, address, email, phone_number, password } = req.body;
     const psychiatrist = req.psychiatrist;
     console.log({ psychiatrist });
     const existingPatient = await Patient.findOne({ email });
     const hashedPassword = await bcrypt.hash(password, 5);
     if (existingPatient) return next(new ErrorHandler('Patient with this email already exists', 400));

     const newPatient = new Patient({
          name,
          address,
          email,
          phone_number,
          password: hashedPassword,
          psychiatrist: psychiatrist._id,
          hospital: psychiatrist.hospital,
          patient_photo: req.file ? req.file.filename : '', // Save the filename of the uploaded photo
     });

     // Save the patient to the database
     await newPatient.save();
     const patientWithImagePath = {
          ...newPatient._doc,
          patient_photo: req.file ? `/uploads/${req.file.filename}` : '',
     };

     res.status(200).json({ success: true, message: 'New patient added successfully', patient: patientWithImagePath });
});


exports.getAllPatients = catchError(async (req, res, next) => {
     const patients = await Patient.find()
          .populate('psychiatrist', 'name')
          .populate('hospital', 'name');
     const patientsWithImagePath = patients.map(patient => ({
          ...patient._doc,
          patient_photo: patient.patient_photo ? `/uploads/${patient.patient_photo}` : '',
     }));
     res.status(200).json({ "success": true, message: 'all patients', patients: patientsWithImagePath });
});


exports.getPatientById = catchError(async (req, res, next) => {
     const patientId = req.params.patientId;
     const patient = await Patient.findById(patientId);
     if (!patient) return next(new ErrorHandler("Patient Not found!", 404));
     res.status(200).json({ "success": true, message: 'get patient by id', patient });
});


exports.deletePatient = catchError(async (req, res, next) => {
     const patientId = req.params.patientId;
     const patient = await Patient.findById(patientId);
     if (!patient) return next(new ErrorHandler('Patient not found!', 404));
     const deletedPatient = await Patient.findByIdAndDelete(patientId);
     res.status(200).json({ "success": true, message: 'Patient deleted successfully!', patient: deletedPatient });
});


exports.updatePatientDetails = catchError(async (req, res, next) => {
     const { patientId } = req.params;
     const dataToUpdate = req.body;
     const patient = await Patient.findById(patientId);
     if (!patient) return next(new ErrorHandler('Patient not found!', 404));
     // Update patient details
     Object.keys(dataToUpdate).forEach((key) => {
          patient[key] = dataToUpdate[key];
     });
     const updated = await patient.save();
     const patientsWithImagePath = {
          ...updated._doc,
          patient_photo: updated.patient_photo ? `/uploads/${updated.patient_photo}` : '',
     };
     res.status(200).json({ "success": true, message: 'Patient details updated successfully', patient: patientsWithImagePath });
});

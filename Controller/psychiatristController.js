const Patient = require("../Models/patientsModel");
const { catchError } = require('../Middleware/CatchError');
const ErrorHandler = require('../Utils/ErrorHandler');
const Hospital = require('../Models/hospitalModel');
const Psychiatrist = require('../Models/psychiatristModel');
const jwt = require('jsonwebtoken');

// Controller to add a new psychiatrist
exports.addPsychiatrist = catchError(async (req, res, next) => {
     const { name, hospitalId } = req.body;
     console.log({ name, hospitalId });
     // Check if the hospital exists
     const hospital = await Hospital.findById(hospitalId);
     if (!hospital) return next(new ErrorHandler('Hospital not found', 400));

     const newPsychiatrist = new Psychiatrist({
          name,
          hospital: hospitalId,
     });

     await newPsychiatrist.save();
     res.status(200).json({ success: true, message: 'New psychiatrist added successfully', psychiatrist: newPsychiatrist });
});



exports.login = catchError(async (req, res, next) => {
     const { name } = req.body;
     const psychiatrist = await Psychiatrist.findOne({ name });
     if (!psychiatrist) return next(new ErrorHandler('Psychiatrist does not exist!', 404));
     const token = jwt.sign({ psychiatrist }, process.env.JWT_SECRET || 'SecretKey', {
          expiresIn: '1y',
     });
     res.json({ "success": true, message: 'Login successful!', token, psychiatrist });
});

// Controller to get all psychiatrists with counts and patient details for a hospital
exports.getAllPsychiatristsForHospital = catchError(async (req, res, next) => {
     const hospitalId = req.params.hospitalId;

     // Check if the hospital exists
     const hospital = await Hospital.findById(hospitalId);
     if (!hospital) return next(new ErrorHandler('Hospital not found', 400));

     // Fetch all psychiatrists for the specified hospital
     const psychiatrists = await Psychiatrist.find({ hospital: hospitalId });

     // Prepare response data
     const psychiatristsDetails = await Promise.all(
          psychiatrists.map(async (psychiatrist) => {
               const patientsCount = await getPatientsCountForPsychiatrist(psychiatrist._id);
               return {
                    id: psychiatrist._id,
                    name: psychiatrist.name,
                    patientsCount,
               };
          })
     );

     const totalPsychiatristCount = psychiatrists.length;
     const totalPatientsCount = await getTotalPatientsCountForHospital(hospitalId);

     res.status(200).json({
          success: true,
          hospitalName: hospital.name,
          totalPsychiatristCount,
          totalPatientsCount,
          psychiatristDetails: psychiatristsDetails,
     });
});


const getPatientsCountForPsychiatrist = async (psychiatristId) => {
     const patients = await Patient.find({ psychiatrist: psychiatristId });
     console.log({ patients });
     if (patients) return patients.length;
     else return 0;
};


const getTotalPatientsCountForHospital = async (hospitalId) => {
     const patients = await Patient.find({ hospital: hospitalId });
     console.log({ patients });
     if (patients) return patients.length;
     else return 0;
};


exports.getAllPsychiatrists = catchError(async (req, res, next) => {
     const allPsychiatrists = await Psychiatrist.find();
     res.json({ "success": true, message: 'All Psychiatrists', allPsychiatrists });
});

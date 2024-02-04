const { catchError } = require('../Middleware/CatchError');
const ErrorHandler = require('../Utils/ErrorHandler');
const Hospital = require('../Models/hospitalModel');


// Controller to add a new psychiatrist
exports.addHospital = catchError(async (req, res, next) => {
     const { name } = req.body;
     // Check if the hospital exists
     const hospital = await Hospital.findOne({ name });
     if (hospital) return next(new ErrorHandler('Hospital already exist', 400));

     const newHospital = new Hospital({ name });
     await newHospital.save();
     res.status(200).json({ success: true, message: 'New hospital added successfully', hospital: newHospital });
});


exports.getAllHospital = catchError(async (req, res, next) => {
     const hospitals = await Hospital.find();
     res.status(200).json({
          success: true,
          message: "All hospital list",
          hospitals,
     });
});


exports.getHospitalById = catchError(async (req, res, next) => {
     const hospitalId = req.params.hospitalId;
     const hospital = await Hospital.findById(hospitalId);
     if (!hospital) return next(new ErrorHandler("Hospital Not found!", 404));
     res.status(200).json({ "success": true, message: 'get hospital by id', hospital });
});


exports.deleteHospital = catchError(async (req, res, next) => {
     const hospitalId = req.params.hospitalId;
     const hospital = await Hospital.findById(hospitalId);
     if (!hospital) return next(new ErrorHandler('Hospital not found!', 404));
     const deletedHospital = await Hospital.findByIdAndDelete(hospitalId);
     res.status(200).json({ "success": true, message: 'Hospital deleted successfully!', hospital: deletedHospital });
});


exports.updateHospitalName = catchError(async (req, res, next) => {
     const { hospitalId } = req.params;
     const dataToUpdate = req.body;
     const hospital = await Hospital.findById(hospitalId);
     if (!hospital) return next(new ErrorHandler('Hospital not found!', 404));
     Object.keys(dataToUpdate).forEach((key) => {
          hospital[key] = dataToUpdate[key];
     });
     const updated = await hospital.save();
     res.status(200).json({ "success": true, message: 'Hospital name updated successfully', hospital: updated });
});

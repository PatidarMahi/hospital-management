const express = require('express');
const { addPatient, getAllPatients, updatePatientDetails, getPatientById, deletePatient, upload } = require('../Controller/patientController');
const { AuthValidator } = require('../Middleware/AuthValidation');
const patientRoutes = express.Router();

patientRoutes.get('/api/v1/get-all-patients', getAllPatients);
patientRoutes.get('/api/v1/get-patient-by-id/:patientId', getPatientById);

// patientRoutes.use(AuthValidator);
patientRoutes.delete('/api/v1/delete-patient/:patientId', AuthValidator, upload.single('patient_photo'), deletePatient);
patientRoutes.put('/api/v1/update-patients-details/:patientId', AuthValidator, upload.single('patient_photo'), updatePatientDetails);
patientRoutes.post('/api/v1/add-new-patient', AuthValidator, upload.single('patient_photo'), addPatient);


module.exports = patientRoutes;

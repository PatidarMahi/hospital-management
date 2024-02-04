const express = require('express');
const { upload } = require('../Controller/patientController');
const { addHospital, getAllHospital, getHospitalById, deleteHospital, updateHospitalName } = require('../Controller/hospitalController');
const hospitalRoutes = express.Router();

hospitalRoutes.post('/api/v1/add-new-hospital', upload.single('patient_photo'), addHospital);
hospitalRoutes.get('/api/v1/get-all-hospitals', getAllHospital);
hospitalRoutes.get('/api/v1/get-hospital-by-id/:hospitalId', getHospitalById);
hospitalRoutes.delete('/api/v1/delete-hospital/:hospitalId', upload.single('patient_photo'), deleteHospital);
hospitalRoutes.put('/api/v1/update-hospital/:hospitalId', upload.single('patient_photo'), updateHospitalName);


module.exports = hospitalRoutes;

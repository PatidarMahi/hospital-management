const express = require('express');
const { upload } = require('../Controller/patientController');
const { addPsychiatrist, getAllPsychiatristsForHospital, login, getAllPsychiatrists } = require('../Controller/psychiatristController');
const psychiatristRoutes = express.Router();

psychiatristRoutes.post('/api/v1/psychiatrist-login', upload.single('patient_photo'), login);
psychiatristRoutes.get('/api/v1/get-all-psychiatrists', getAllPsychiatrists);
psychiatristRoutes.post('/api/v1/add-psychiatrist', upload.single('patient_photo'), addPsychiatrist);
psychiatristRoutes.get('/api/v1/get-all-psychiatrists/:hospitalId', getAllPsychiatristsForHospital);


module.exports = psychiatristRoutes;

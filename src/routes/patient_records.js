const express = require('express');
const router = express.Router();
const PatientRecordsController = require('../controllers/PatientRecordsController');


router.get('/patient_records/search', PatientRecordsController.searchPatientRecords);
router.get('/patient_records', PatientRecordsController.getAllPatientRecords);
router.get('/patient_records/:id', PatientRecordsController.getPatientRecordById);
router.post('/patient_records', PatientRecordsController.createPatientRecord);
router.put('/patient_records/:id', PatientRecordsController.updatePatientRecord);
router.delete('/patient_records/:id', PatientRecordsController.deletePatientRecord);

module.exports = router;

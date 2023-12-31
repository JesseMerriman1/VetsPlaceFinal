require('dotenv').config();
const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Database config
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, //Connection to Heroku
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});


app.use(express.static(path.join(__dirname, 'client')));

// API routes 
const appointmentsRoutes = require('./src/routes/appointments');
const clientsRoutes = require('./src/routes/clients');
const patientRecordsRoutes = require('./src/routes/patient_records');
const patientsRoutes = require('./src/routes/patients');
const userAuthRoutes = require('./src/routes/user_authentication');
const usersRoutes = require('./src/routes/users');

app.use('/api/appointments', appointmentsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/patient_records', patientRecordsRoutes); 
app.use('/api/patients', patientsRoutes);
app.use('/api/auth', userAuthRoutes);
app.use('/api/users', usersRoutes);


app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
        res.sendFile(path.join(__dirname, 'client', 'index.html'));
    } else {
        res.status(404).send('API route not found');
    }
});

// Error handling info
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

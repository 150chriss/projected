const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Trigger DB connection check on startup
require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/cars', require('./routes/carRoutes'));
app.use('/services', require('./routes/serviceRoutes'));
app.use('/records', require('./routes/recordRoutes'));
app.use('/payments', require('./routes/paymentRoutes'));
app.use('/reports', require('./routes/reportRoutes'));

app.get('/', (req, res) => res.json({ message: 'CRPMS API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

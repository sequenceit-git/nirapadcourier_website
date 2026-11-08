// One env file for the whole project, at the repo root (absent inside Docker; compose passes env vars)
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/parcels', require('./routes/parcelRoutes'));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Nirapad Courier REST API',
    version: '1.0.0',
    time: new Date()
  });
});

// Root friendly response
app.get('/', (req, res) => {
  res.send('Nirapad Courier API is running. Check /api/v1/health');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`[Nirapad Courier Server] Running on http://localhost:${PORT}`);
});

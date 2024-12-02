const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse incoming requests
app.use(express.json());

// Enable CORS for only specific origin (frontend)
app.use(cors({
    origin: process.env.FRONTEND_URL // Allow only requests from the specified frontend URL
}));
// Routes
app.use('/api', routes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err);
    });

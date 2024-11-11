import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from './src/routes/authRoutes.js';
import { userRoutes } from './src/routes/userRoutes.js';
import { profileRoutes } from './src/routes/profileRoutes.js';
import { mealLogRoutes } from './src/routes/mealLogRoutes.js';
import { verifyToken } from './src/middleware/authMiddleware.js';
import { WebSocketServer } from 'ws'; // Correct import

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
origin: [
    'https://fit-track-steel.vercel.app',
    'https://fit-track-git-main-shubhamkarampures-projects.vercel.app',
    'https://fit-track-8fkwcbcc5-shubhamkarampures-projects.vercel.app'
  ],
  credentials: true, 
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'], // Allowed methods
};

// Middleware setup
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Define your routes
app.use('/api/v1/auth', authRoutes); // Authentication routes for login/register
app.use('/api/v1/users', verifyToken, userRoutes); // General user management
app.use('/api/v1/profile', verifyToken, profileRoutes); // Profile actions for the authenticated user
app.use('/api/v1/meals', verifyToken, mealLogRoutes); // Meal logging for the authenticated user

const wss = new WebSocketServer({
  noServer: true // Handle WebSocket upgrade requests using the same server
});
// Handling WebSocket connections
wss.on('connection', (ws) => {
  
  // Function to send heart rate data
  const sendHeartRate = () => {
  // Start with a base heart rate value (e.g., 80)
  let baseHeartRate = 80;

  // Generate a random fluctuation within a small range (-5 to +5)
  let fluctuation = Math.floor(Math.random() * (5 - (-5) + 1)) + (-5);

  // Add the fluctuation to the base heart rate
  const heartRate = baseHeartRate + fluctuation;

  // Ensure the heart rate stays within a sensible range (e.g., 60-120)
  const finalHeartRate = Math.max(60, Math.min(120, heartRate));

  ws.send(JSON.stringify({ heartRate: finalHeartRate }));
};


  // Function to send blood pressure data
  const sendBloodPressure = () => {
    const systolic = Math.floor(Math.random() * (130 - 100 + 1)) + 100; // Random systolic pressure between 100 and 130
    const diastolic = Math.floor(Math.random() * (90 - 60 + 1)) + 60; // Random diastolic pressure between 60 and 90
    ws.send(JSON.stringify({ bloodPressure: { systolic, diastolic } }));
  };

  // Send heart rate every second (1000ms)
  const heartRateInterval = setInterval(sendHeartRate, 1000);

  // Send blood pressure every 30 seconds (30000ms)
  const bloodPressureInterval = setInterval(sendBloodPressure, 30000);

  // Close the connection when the client disconnects
  ws.on('close', () => {
    clearInterval(heartRateInterval);
    clearInterval(bloodPressureInterval);
  });
});




// Integrate WebSocket with the Express server
app.server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// Handling WebSocket upgrade requests
app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes.js';
import { userRoutes } from './routes/userRoutes.js'
import { profileRoutes } from './routes/profileRoutes.js';
import { testRoutes } from './routes/test.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
}));

mongoose.connect(process.env.MONGO_URI, {
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/users/profile', profileRoutes);
app.use('/api/v1/users/auth', authRoutes);
app.use('/api/v1/test', testRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

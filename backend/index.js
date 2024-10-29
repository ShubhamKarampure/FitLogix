import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes.js';


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET:', JWT_SECRET);

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/v1/users/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

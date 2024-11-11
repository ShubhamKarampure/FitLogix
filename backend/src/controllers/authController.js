import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ email, passwordHash });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000,
    });

    // Send user data excluding passwordHash
    const { passwordHash: _, ...userInfo } = newUser.toObject();
    res.status(201).json({ user: userInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Find user by email
     const user = await User.findOne({email}).populate('profile');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
   res.cookie('token', token, {
  httpOnly: true,
  sameSite: 'None',  // Allow cross-origin requests to send the cookie
  secure: true,      // Ensure the cookie is sent over HTTPS
  maxAge: 3600000,   // Cookie expiry of 1 hour
});
    // Send user data excluding passwordHash
     
    const { passwordHash, ...userInfo } = user.toObject();
    const fullUserInfo = { ...userInfo, profile: user.profile };

    return res.status(200).json({ user: fullUserInfo }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const checkAuth = async (req, res) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Await the user lookup
    const user = await User.findById(decoded.userId).populate('profile');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { passwordHash, ...userInfo } = user.toObject();
    const fullUserInfo = { ...userInfo, profile: user.profile };

    return res.status(200).json({ user: fullUserInfo }); 
  });
};

// Logout User
export const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'Strict', // Helps to prevent CSRF
  });
  
  res.status(200).json({ message: 'Logged out successfully' });
};

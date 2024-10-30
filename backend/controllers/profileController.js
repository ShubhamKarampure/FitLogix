import Profile from '../models/Profile.js';
import User from '../models/User.js'; // Import the User model
import cloudinary from '../config/cloudinary.js';

export const createProfile = async (req, res) => {
  try {
    const profileData = Object.assign({}, req.body);

    const { user, name, age, weight, height, gender } = profileData; 
    const avatarFile = req.file; 

    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    let avatarUrl = null;
    
    if (avatarFile) {
  avatarUrl = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          return reject(new Error('Cloudinary upload error'));
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(avatarFile.buffer);
  });
} 
    // Create a new profile
    const newProfile = new Profile({
      user, // Assumes user ID is sent from the client
      name,
      age,
      weight,
      height,
      gender,
      avatar: avatarUrl,
    });

    // Save the profile
    await newProfile.save();

    // Update the user document to reference the new profile
    await User.findByIdAndUpdate(user, { profile: newProfile._id }, { new: true });

    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Error creating profile', error });
  }
};

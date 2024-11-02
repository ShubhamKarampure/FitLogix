import Profile from '../models/Profile.js';
import User from '../models/User.js'; // Import the User model
import cloudinary from '../config/cloudinary.js';

// Create a new profile
export const createProfile = async (req, res) => {
  try {
    const { name, age, weight, height, gender } = req.body;
    const avatarFile = req.file;
    const userId = req.userId;
    // Check if the profile already exists for the user
    const existingProfile = await Profile.findOne({ user: userId  });
    
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    let avatarUrl = null;

    // Upload avatar to Cloudinary if provided
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
      user:userId, 
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
    await User.findByIdAndUpdate(userId, { profile: newProfile._id }, { new: true });

    res.status(200).json({ message: 'Profile Created Successfully' });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Error creating profile', error });
  }
};

// Get a profile by user ID
export const getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a profile by user ID
export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
    const profile = await Profile.findOneAndUpdate({ user: userId }, updates, {
      new: true,
      runValidators: true,
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile updated sucessfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a profile by user ID
export const deleteProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Profile.findOneAndDelete({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(204).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

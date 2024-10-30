// controllers/userController.js
import User from '../models/User.js';

export const getUser = async (req, res) => {
    try {
        // Get user ID from request parameters
        const userId = req.params.id; // Assumes the route is defined to include the user ID

        // Find user by ID and populate the profile
        const user = await User.findById(userId).populate('profile');

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Exclude sensitive information before sending the response
        const { passwordHash, jwtToken, ...userData } = user.toObject();

        // Send user data in response, including populated profile data
        res.status(200).json({ ...userData, profile: user.profile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

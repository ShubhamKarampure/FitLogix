// services/profileService.js
import { API_ROUTES } from './apiRoutes'; // Import API_ROUTES

const profileService = {
  createProfile: async (profileData) => {
    const formData = new FormData();
  
    // Append all profile fields to the form data
    formData.append('name', profileData.name);
    formData.append('age', profileData.age);
    formData.append('weight', profileData.weight);
    formData.append('height', profileData.height);
    formData.append('gender', profileData.gender);

    if (profileData.avatar) {
      formData.append('avatar', profileData.avatar);
    }

    const response = await fetch(API_ROUTES.CREATEPROFILE, { 
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    console.log(response)

    if (!response.ok) {
      throw new Error('Error creating profile');
    }

    return await response.json();
  },
};

export default profileService;

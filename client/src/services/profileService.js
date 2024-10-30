// services/profileService.js
const API_URL = 'http://localhost:4000/api/v1/users/profile/setup';

const profileService = {
  createProfile: async (profileData) => {
    const formData = new FormData();
    console.log(profileData.user);

    // Append all profile fields to the form data
    formData.append('user', profileData.user);
    formData.append('name', profileData.name);
    formData.append('age', profileData.age);
    formData.append('weight', profileData.weight);
    formData.append('height', profileData.height);
    formData.append('gender', profileData.gender);

    if (profileData.avatar) {
      formData.append('avatar', profileData.avatar);
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error creating profile');
    }

    return await response.json();
  },
};

export default profileService;
 
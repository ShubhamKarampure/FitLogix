export const API_BASE_URL = 'http://localhost:4000/api/v1';

export const API_ROUTES = {
    // Login-related routes
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    STATUS: `${API_BASE_URL}/auth/status`,

    // User-related routes
    GETUSER: (userId) => `${API_BASE_URL}/users/${userId}`, 
    UPDATEUSER: (userId) => `${API_BASE_URL}/users/${userId}`, 
    DELETEUSER: (userId) => `${API_BASE_URL}/users/${userId}`, 
    GETALLUSERS: `${API_BASE_URL}/users`, 
    
    // Profile-related routes
    CREATEPROFILE: `${API_BASE_URL}/profile`, // For creating a profile
    GETPROFILE: (userId) => `${API_BASE_URL}/profile/${userId}`, // For getting a profile by user ID
    UPDATEPROFILE: (userId) => `${API_BASE_URL}/profile/${userId}`, // For updating a profile by user ID
    DELETEPROFILE: (userId) => `${API_BASE_URL}/profile/${userId}`, // For deleting a profile by user ID
    GETALLPROFILES: `${API_BASE_URL}/profile`, // For getting all profiles (if needed)

    GEMINI : "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key"

};

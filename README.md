# Fitness Tracker Web Application

## Project Overview

The Fitness Tracker Web Application allows users to log their workouts and meals, track their fitness progress, and receive personalized health tips. This application aims to help users achieve their fitness goals by providing an intuitive interface for logging activities and a robust backend for data management.

### Key Features

- **User Registration and Login**: Users can create accounts and log in using secure JWT (JSON Web Tokens) for session management.
- **Workout Logging**: Log workouts including type, duration, and calories burned, categorized by types like cardio, strength, and flexibility.
- **Meal Logging**: Log meals with ingredients and portion sizes, integrated with a nutrition API for calorie and nutrient breakdowns.
- **Progress Tracking**: Visual graphs to show weight, workout frequency, and meal logs over time, along with the ability to set and track fitness goals.
- **Health Tips and Articles**: Crawled content from reputable health blogs to provide users with tips and articles for better health management.
- **User Profile Management**: Users can update their profile information, fitness goals, and preferences.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **API Integration**: Mulesoft
- **Testing**: Selenium for UI testing, JUnit for backend testing

## Getting Started

Follow the steps below to set up and run the project on your local machine.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running locally or a cloud-based instance)
- Git (for version control)

### Clone the Repository

1. Clone the project repository to your local machine:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

### Frontend Setup

1. **Navigate to the Client Directory**:
   ```bash
   cd client
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm start
   ```

### Backend Setup

1. **Navigate to the Server Directory**:
   ```bash
   cd server
   ```

2. **Install Backend Dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` File**:
   - In the `server` directory, create a `.env` file and add your MongoDB connection string and JWT secret:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the Backend**:
   ```bash
   npm run dev
   ```

### Running Both Frontend and Backend

To run both the frontend and backend simultaneously, you can navigate back to the root project directory and use:

```bash
npm run dev
```

### Access the Application

Once both the frontend and backend servers are running, you can access the application by navigating to:

```
http://localhost:3000
```

### Database Configuration

Ensure that your MongoDB database is set up correctly. You can either use a local instance or connect to a cloud-based service like MongoDB Atlas. Update the connection string in your `.env` file accordingly.

## Testing

### UI Testing

Run Selenium tests to ensure the UI functions correctly. Follow the instructions in the Selenium documentation to set up and execute your tests.

### Backend Testing

Run JUnit tests for backend functionalities. Ensure your backend server is running, and execute the tests using your preferred IDE or command line.

## Future Enhancements

- Implement social features for users to share workouts and meals.
- Add push notifications for reminders to log workouts or meals.
- Include a community forum for users to discuss fitness tips.

# Current Tasks

---

### **Routing Enable in Frontend and Backend**

- **Frontend:**

  - Navigation (Login , Register, Home)

- **Backend:**
  - Routes

---

### **Login/Register**

- **Frontend:**

  - Login Page
  - Register Page
  - Auth Service

- **Backend:**

  - Login API
  - Register API
  - Auth Middleware
  - Logout API

- **Database:**
  - User Model

---

### **Assessment**

---

### **Dashboard**

---

### **Planning for 30, 60, 90 Days**

---

### **Logout**

---

# Development Process

## Phase 1: Project Planning & Setup

### Define Requirements:

- Detail the app's features: registration, personality assessment, task generation, task tracking, etc.
- Document features as user stories using platforms like Jira, Trello, or GitHub Projects.
- Create a timeline with milestones for major features.

### Design Database Schema:

- Define database schema for MongoDB, including tables for `User`, `Task`, and `Assessment`.
- Establish relationships like linking tasks to user accounts.

### Define Folder Structure:

- **Backend:** Organize folders for controllers, models, routes, and middlewares.
- **Frontend:** Use feature-based folder organization (e.g., `auth`, `tasks`, `profile`).
- Commit the initial structure to version control (GitHub/GitLab).

### Set Up Project Environment:

- **Backend:** Initialize Node.js project, set up Express, and connect MongoDB.
- **Frontend:** Initialize React Native project with basic navigation.
- Create environment variables for sensitive data (e.g., JWT secret, database credentials).
- Set up Git with a branching strategy like feature branching.

### Design the UI/UX:

- Create wireframes or mockups (registration, home, tasks, profile screens).
- Use tools like Figma or Adobe XD and share designs with the team.

---

## Phase 2: Backend API Development

### User Authentication:

- Implement JWT-based authentication for registration and login.
- Create routes in `authController.js` for login, registration, and logout.

### Assessment & Task Generation:

- Create an API endpoint for personality assessments.
- Develop logic for 30-day task generation based on assessments.
- Implement routes in `taskController.js` for task operations.

### Testing & Documentation:

- Test endpoints for functionality and error handling.
- Document APIs (e.g., `POST /api/register`, `GET /api/tasks`) with parameters and responses.

### Database Testing:

- Validate data storage and retrieval using Postman or similar tools.

---

## Phase 3: Frontend Development

### Implement Core Screens:

- **Auth Screens:** Login and registration screens.
- **Personality Assessment Screen:** Collect responses via form.
- **Home Screen:** Summarize tasks and user progress.
- **Task Screens:** List and detail tasks, allowing completion marking.

### Integrate APIs:

- Use Axios or Fetch for backend API integration.
- Implement proper error handling and user feedback.

### UI Enhancements:

- Create reusable components (`Button`, `Card`, `TaskItem`).
- Add loaders and status messages for better UX.

### Navigation:

- Implement stack and tab navigation using React Navigation.

---

## Phase 4: Quality Assurance (QA) and Testing

### Testing Functionalities:

- Verify features (registration, task generation, task completion) across devices.
- Write test cases for user flows using Jest or React Native Testing Library.

### Bug Tracking:

- Log and prioritize bugs using platforms like Jira or GitHub Issues.

### Performance Testing:

- Optimize API response times, app load time, and navigation smoothness.

---

## Phase 5: Final Adjustments & Deployment

### Final Code Review & Documentation:

- Conduct a final code review for consistent quality.
- Document complex logic (e.g., task generation) and update README.

### App Store Preparation (Optional):

- Set up accounts for App Store/Play Store (if publishing).
- Generate app builds using Expo or React Native CLI.

### Backend Deployment:

- Deploy backend on platforms like AWS, Heroku, or DigitalOcean.
- Set up MongoDB Atlas and implement security measures.

### Launch & Feedback:

- Share the app with a small group for feedback.
- Fix minor bugs and prepare for a larger release.

---

# Colour Code

## CSS HEX:

- `--governor-bay`: #3230be
- `--moon-raker`: #dbc5f4
- `--jacksons-purple`: #292799
- `--haiti`: #08081f
- `--lucky-point`: #1c1b6c
- `--bunting`: #14144b
- `--manatee`: #8c8cab
- `--lilac-bush`: #9d74d6
- `--comet`: #585778
- `--east-bay`: #4c4c79

## SCSS HEX:

- `$governor-bay`: #3230be
- `$moon-raker`: #dbc5f4
- `$jacksons-purple`: #292799
- `$haiti`: #08081f
- `$lucky-point`: #1c1b6c
- `$bunting`: #14144b
- `$manatee`: #8c8cab
- `$lilac-bush`: #9d74d6
- `$comet`: #585778
- `$east-bay`: #4c4c79

## SCSS RGB:

- `--governor-bay`: rgba(50,48,190,1)
- `--moon-raker`: rgba(219,197,244,1)
- `--jacksons-purple`: rgba(41,39,153,1)
- `--haiti`: rgba(8,8,31,1)
- `--lucky-point`: rgba(28,27,108,1)
- `--bunting`: rgba(20,20,75,1)
- `--manatee`: rgba(140,140,171,1)
- `--lilac-bush`: rgba(157,116,214,1)
- `--comet`: rgba(88,87,120,1)
- `--east-bay`: rgba(76,76,121,1)

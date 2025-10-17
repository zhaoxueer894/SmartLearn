# SmartLearn PolyU Extension - Minimal Runnable Demo

This document outlines the steps to run the extended SmartLearn project with multi-role support (Lecturer/Student).

## Prerequisites

1.  Java Development Kit (JDK) 17+
2.  Node.js (LTS)
3.  PostgreSQL or MySQL database (or use an in-memory database like H2 for a quick start)
4.  Maven (or use the included wrapper)

## Setup and Run Instructions

### 1. Backend (Spring Boot)

The backend has been extended with new models, repositories, and controllers for multi-role auth, courses, announcements, quizzes, and enrollment.

1.  **Navigate to the backend directory:**
    \`\`\`bash
    cd backend
    \`\`\`

2.  **Configure Database:**
    *   The project assumes you have a configured Spring Boot application.properties/yaml.
    *   **For a quick start**, if your original project uses an in-memory database (like H2), the new entities will be created automatically.
    *   If you are using PostgreSQL/MySQL, ensure your `application.properties` or `application.yml` is configured correctly.

3.  **Build and Run the Backend:**
    \`\`\`bash
    # Build
    ./mvnw clean install

    # Run (assuming your main class is com.smartlearn.SmartLearnApplication)
    ./mvnw spring-boot:run
    \`\`\`
    The backend should start on `http://localhost:8080`.

### 2. Frontend (React + Vite)

The frontend has been extended with new pages, components, and routing for Lecturer and Student roles.

1.  **Navigate to the frontend directory:**
    \`\`\`bash
    cd frontend
    \`\`\`

2.  **Install Dependencies:**
    \`\`\`bash
    pnpm install
    # or npm install
    # or yarn install
    \`\`\`

3.  **Run the Frontend:**
    \`\`\`bash
    pnpm run dev
    # or npm run dev
    # or yarn dev
    \`\`\`
    The frontend should start on `http://localhost:5173` (or another port specified by Vite).

## Demo Usage

### Registration and Login

1.  Go to the `/auth` page.
2.  **Register a Lecturer:** Choose role `lecturer`, enter a username (e.g., `L1001`), and register. This will automatically log you in.
3.  **Register a Student:** Log out, go back to `/auth`, choose role `student`, enter a username (e.g., `S2001`), and register.

### Lecturer Workflow (e.g., L1001)

1.  **Create Course:** Navigate to "My Courses (L)" -> "Create New Course".
    *   Course Code: `COMP1001`
    *   Course Name: `Introduction to Programming`
2.  **Manage Course:** Click "Manage Course" for the newly created course.
    *   **Post Announcement:** Post a new announcement (e.g., Title: "Welcome", Content: "Welcome to COMP1001!").
    *   **Create Quiz:** Create a new quiz (e.g., Title: "Quiz 1", Content: "First quiz on basic syntax").
    *   **Import Students:** In the "Import Students" section, enter the ID of a registered student (e.g., `2` if `S2001` was the second user registered, as the backend uses `Long` IDs) and click "Import/Enroll".

### Student Workflow (e.g., S2001)

1.  **View Courses:** Log in as the student and navigate to "My Courses (S)". The course created by the lecturer should appear (Note: Due to the minimal backend, the student is currently shown all courses, but the intent is to show enrolled courses).
2.  **View Course Details:** Click "View Course" for the course.
    *   **View Announcements:** The announcement posted by the lecturer should be visible.
    *   **Participate in Quiz:** Click "Participate (Placeholder)" for the quiz. An alert will confirm the participation.

---
**Note on Backend IDs:** The minimal backend uses in-memory auto-incrementing Long IDs. The first user registered will have ID 1, the second ID 2, and so on. When enrolling students, use these numeric IDs.
\`\`\`

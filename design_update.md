# SmartLearn PolyU Extension Design Document

## 1. Database Schema Updates (Incremental)

Assuming an existing `User` table, the following tables and modifications are required:

| Table Name | Field | Data Type | Description | Constraints |
| :--- | :--- | :--- | :--- | :--- |
| **User** (Modification) | `role` | VARCHAR(20) | User role: 'lecturer' or 'student'. | NOT NULL |
| **Course** (New) | `id` | BIGINT | Primary Key. | PK, AUTO_INCREMENT |
| | `course_code` | VARCHAR(20) | e.g., COMP1001 | UNIQUE, NOT NULL |
| | `course_name` | VARCHAR(255) | Full name of the course. | NOT NULL |
| | `lecturer_id` | BIGINT | Foreign Key to `User.id` (Lecturer). | FK (User.id), NOT NULL |
| **Enrollment** (New) | `id` | BIGINT | Primary Key. | PK, AUTO_INCREMENT |
| | `course_id` | BIGINT | Foreign Key to `Course.id`. | FK (Course.id), NOT NULL |
| | `student_id` | BIGINT | Foreign Key to `User.id` (Student). | FK (User.id), NOT NULL |
| **Announcement** (New) | `id` | BIGINT | Primary Key. | PK, AUTO_INCREMENT |
| | `course_id` | BIGINT | Foreign Key to `Course.id`. | FK (Course.id), NOT NULL |
| | `title` | VARCHAR(255) | Announcement title. | NOT NULL |
| | `content` | TEXT | Announcement description/body. | NOT NULL |
| | `posted_at` | TIMESTAMP | Time of posting. | NOT NULL |
| **Quiz** (New) | `id` | BIGINT | Primary Key. | PK, AUTO_INCREMENT |
| | `course_id` | BIGINT | Foreign Key to `Course.id`. | FK (Course.id), NOT NULL |
| | `title` | VARCHAR(255) | Quiz title. | NOT NULL |
| | `description` | TEXT | Simple quiz description/instructions. | NOT NULL |
| | `due_date` | TIMESTAMP | Quiz due date. | Optional |

## 2. API Endpoints Design (Restful)

All APIs will be prefixed with `/api/v1`. Authentication/Authorization is assumed to be handled by Spring Security based on the user's `role`.

| Feature | HTTP Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- | :--- |
| **Authentication** | POST | `/api/v1/auth/register` | Register a new user. Request body must include `role`. | ALL |
| | POST | `/api/v1/auth/login` | Login and receive a token. | ALL |
| **Course Management** | POST | `/api/v1/courses` | Create a new course. | LECTURER |
| | GET | `/api/v1/courses` | Get all courses created by the lecturer (LECTURER) or all enrolled courses (STUDENT). | ALL |
| | PUT | `/api/v1/courses/{id}` | Update course details. | LECTURER |
| | DELETE | `/api/v1/courses/{id}` | Delete a course. | LECTURER |
| | GET | `/api/v1/courses/{id}` | Get a specific course's details. | ALL |
| **Enrollment** | POST | `/api/v1/courses/{courseId}/enrollments` | Import students by ID list. Request body: `{"student_ids": ["S1234567", "S7654321"]}`. | LECTURER |
| | GET | `/api/v1/courses/{courseId}/students` | Get list of enrolled students. | LECTURER |
| **Announcements** | POST | `/api/v1/courses/{courseId}/announcements` | Post a new announcement. | LECTURER |
| | GET | `/api/v1/courses/{courseId}/announcements` | View all announcements for a course. | ALL |
| **Quizzes** | POST | `/api/v1/courses/{courseId}/quizzes` | Create a new quiz. | LECTURER |
| | GET | `/api/v1/courses/{courseId}/quizzes` | View all quizzes for a course. | ALL |
| | POST | `/api/v1/quizzes/{quizId}/submit` | Simple placeholder for quiz participation. Request body: `{"status": "completed"}`. | STUDENT |

## 3. Frontend Routes

| Path | Component | Role | Description |
| :--- | :--- | :--- | :--- |
| `/` | Home/Dashboard | ALL | Landing page after login, showing relevant courses. |
| `/lecturer/courses` | LecturerCourseList | LECTURER | List of courses managed by the lecturer. |
| `/lecturer/courses/new` | CourseCreationForm | LECTURER | Form to create a new course. |
| `/lecturer/courses/:id` | LecturerCourseDetail | LECTURER | Course management view (announcements, quizzes, enrollment). |
| `/student/courses` | StudentCourseList | STUDENT | List of courses the student is enrolled in. |
| `/student/courses/:id` | StudentCourseDetail | STUDENT | Course view (announcements, quizzes). |
| `/student/quizzes/:id` | QuizParticipation | STUDENT | Simple quiz participation placeholder. |

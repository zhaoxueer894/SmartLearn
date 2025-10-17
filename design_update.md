# SmartLearn Platform - Technical Design Document

## 1. Current Database Schema (Implemented)

The current implementation includes the core user authentication system with the following schema:

| Table Name | Field | Data Type | Description | Constraints |
| :--- | :--- | :--- | :--- | :--- |
| **users** (Implemented) | `id` | BIGINT | Primary Key. | PK, AUTO_INCREMENT |
| | `username` | VARCHAR(255) | Unique username for login. | UNIQUE, NOT NULL |
| | `password` | VARCHAR(255) | BCrypt encrypted password. | NOT NULL |
| | `role` | VARCHAR(20) | User role: 'lecturer' or 'student'. | NOT NULL |

## 2. Planned Database Extensions (Future Implementation)

The following tables will extend the current system for full course management functionality:

| Table Name | Field | Data Type | Description | Constraints |
| :--- | :--- | :--- | :--- | :--- |
| **courses** (Planned) | `id` | BIGINT | Primary Key. | PK, AUTO_INCREMENT |
| | `course_code` | VARCHAR(20) | e.g., COMP1001, unique identifier | UNIQUE, NOT NULL |
| | `course_name` | VARCHAR(255) | Full name of the course. | NOT NULL |
| | `description` | TEXT | Detailed course description. | NULL |
| | `lecturer_id` | BIGINT | Foreign Key to `users.id` (Lecturer). | FK (users.id), NOT NULL |
| | `created_at` | TIMESTAMP | Course creation timestamp. | NOT NULL |
| | `updated_at` | TIMESTAMP | Last modification timestamp. | NOT NULL |
| **enrollments** (Planned) | `id` | BIGINT | Primary Key. | PK, AUTO_INCREMENT |
| | `course_id` | BIGINT | Foreign Key to `courses.id`. | FK (courses.id), NOT NULL |
| | `student_id` | BIGINT | Foreign Key to `users.id` (Student). | FK (users.id), NOT NULL |
| | `enrolled_at` | TIMESTAMP | Enrollment timestamp. | NOT NULL |
| | `status` | VARCHAR(20) | 'active', 'dropped', 'completed' | NOT NULL |
| **announcements** (Planned) | `id` | BIGINT | Primary Key. | PK, AUTO_INCREMENT |
| | `course_id` | BIGINT | Foreign Key to `courses.id`. | FK (courses.id), NOT NULL |
| | `title` | VARCHAR(255) | Announcement title. | NOT NULL |
| | `content` | TEXT | Announcement description/body. | NOT NULL |
| | `posted_at` | TIMESTAMP | Time of posting. | NOT NULL |
| | `posted_by` | BIGINT | Foreign Key to `users.id` (Lecturer). | FK (users.id), NOT NULL |
| **quizzes** (Planned) | `id` | BIGINT | Primary Key. | PK, AUTO_INCREMENT |
| | `course_id` | BIGINT | Foreign Key to `courses.id`. | FK (courses.id), NOT NULL |
| | `title` | VARCHAR(255) | Quiz title. | NOT NULL |
| | `description` | TEXT | Quiz description/instructions. | NOT NULL |
| | `due_date` | TIMESTAMP | Quiz due date. | NULL |
| | `created_at` | TIMESTAMP | Quiz creation timestamp. | NOT NULL |
| | `created_by` | BIGINT | Foreign Key to `users.id` (Lecturer). | FK (users.id), NOT NULL |
| **quiz_attempts** (Planned) | `id` | BIGINT | Primary Key. | PK, AUTO_INCREMENT |
| | `quiz_id` | BIGINT | Foreign Key to `quizzes.id`. | FK (quizzes.id), NOT NULL |
| | `student_id` | BIGINT | Foreign Key to `users.id` (Student). | FK (users.id), NOT NULL |
| | `status` | VARCHAR(20) | 'in_progress', 'completed', 'submitted' | NOT NULL |
| | `submitted_at` | TIMESTAMP | Submission timestamp. | NULL |

## 2. Current API Endpoints (Implemented)

The following REST APIs are currently implemented and operational:

| Feature | HTTP Method | Endpoint | Description | Role | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Authentication** | POST | `/api/v1/auth/register` | Register new user with role selection | ALL | ✅ Implemented |
| | POST | `/api/v1/auth/login` | User login with JWT token response | ALL | ✅ Implemented |
| **Health Check** | GET | `/api/hello` | System health and connectivity check | ALL | ✅ Implemented |
| **AI Features** | POST | `/api/ai/generateQuestion` | AI-powered question generation | LECTURER | ✅ Implemented |
| | POST | `/api/ai/clusterAnswers` | Intelligent answer clustering | LECTURER | ✅ Implemented |
| **Interactive** | POST | `/api/wordcloud/submit` | Submit words for collaborative word clouds | ALL | ✅ Implemented |
| | GET | `/api/wordcloud/data` | Retrieve aggregated word cloud data | ALL | ✅ Implemented |

## 3. Planned API Extensions (Future Implementation)

The following endpoints will be added to support full course management functionality:

| Feature | HTTP Method | Endpoint | Description | Role | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Course Management** | POST | `/api/v1/courses` | Create a new course | LECTURER | High |
| | GET | `/api/v1/courses` | Get courses by role (created/enrolled) | ALL | High |
| | PUT | `/api/v1/courses/{id}` | Update course details | LECTURER | Medium |
| | DELETE | `/api/v1/courses/{id}` | Delete a course | LECTURER | Medium |
| | GET | `/api/v1/courses/{id}` | Get specific course details | ALL | High |
| **Enrollment** | POST | `/api/v1/courses/{courseId}/enrollments` | Enroll students by ID list | LECTURER | High |
| | GET | `/api/v1/courses/{courseId}/students` | Get enrolled students list | LECTURER | High |
| | DELETE | `/api/v1/courses/{courseId}/enrollments/{studentId}` | Remove student enrollment | LECTURER | Medium |
| **Announcements** | POST | `/api/v1/courses/{courseId}/announcements` | Create new announcement | LECTURER | High |
| | GET | `/api/v1/courses/{courseId}/announcements` | Get course announcements | ALL | High |
| | PUT | `/api/v1/announcements/{id}` | Update announcement | LECTURER | Low |
| | DELETE | `/api/v1/announcements/{id}` | Delete announcement | LECTURER | Low |
| **Quizzes** | POST | `/api/v1/courses/{courseId}/quizzes` | Create new quiz | LECTURER | High |
| | GET | `/api/v1/courses/{courseId}/quizzes` | Get course quizzes | ALL | High |
| | POST | `/api/v1/quizzes/{quizId}/attempts` | Start/submit quiz attempt | STUDENT | Medium |
| | GET | `/api/v1/quizzes/{quizId}/attempts` | Get quiz attempts (lecturer view) | LECTURER | Medium |

## 4. Frontend Routes and Components

### Current Implementation (Completed)

| Path | Component | Role | Description | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Home (redirects to Dashboard if authenticated) | ALL | Landing page with feature showcase | ✅ Implemented |
| `/auth` | AuthPage | ALL | Registration and login forms | ✅ Implemented |
| `Dashboard` | Dashboard (embedded in Home) | ALL | Role-based modular dashboard | ✅ Implemented |

### Dashboard Modules (Current Implementation)

| Module | Component | Role | Description | Status |
| :--- | :--- | :--- | :--- | :--- |
| Overview | OverviewContent | ALL | Dashboard summary with quick actions | ✅ Implemented |
| Courses | CoursesContent | ALL | Course management/viewing | ✅ Implemented |
| Quizzes | QuizzesContent | ALL | Interactive quiz system | ✅ Implemented |
| AI Tools | AIToolsContent | LECTURER | AI-powered content generation | ✅ Implemented |
| Student Engagement | EngagementContent | LECTURER | Student interaction tools | ✅ Implemented |
| Analytics & Reports | AnalyticsContent | LECTURER | Learning analytics dashboard | ✅ Implemented |
| Word Cloud Activities | WordCloudContent | LECTURER | Collaborative word cloud activities | ✅ Implemented |

### Planned Route Extensions (Future Implementation)

| Path | Component | Role | Description | Priority |
| :--- | :--- | :--- | :--- | :--- |
| `/lecturer/courses` | LecturerCourseList | LECTURER | Detailed course management interface | High |
| `/lecturer/courses/new` | CourseCreationForm | LECTURER | Advanced course creation form | High |
| `/lecturer/courses/:id` | LecturerCourseDetail | LECTURER | Individual course management panel | High |
| `/student/courses` | StudentCourseList | STUDENT | Student course browsing interface | High |
| `/student/courses/:id` | StudentCourseDetail | STUDENT | Individual course participation view | High |
| `/student/quizzes/:id` | QuizParticipation | STUDENT | Interactive quiz taking interface | Medium |
| `/analytics` | AnalyticsPage | LECTURER | Detailed analytics and reporting | Medium |
| `/profile` | UserProfile | ALL | User profile management | Low |

## 5. Technical Architecture Overview

### Current Implementation Stack

#### Backend Architecture
- **Framework:** Spring Boot 3.3.2 with Java 21
- **Database:** MySQL 8.0 with Spring Data JPA
- **Security:** Spring Security with BCrypt password encoding
- **Authentication:** JWT-based token authentication (basic implementation)
- **API Design:** RESTful services with CORS support
- **ORM:** Hibernate with automatic DDL generation

#### Frontend Architecture
- **Core:** React 18.3.1 with functional components and hooks
- **Build System:** Vite 5.2.0 for fast development and building
- **Routing:** React Router DOM 6.30.1 with protected routes
- **State Management:** React Context API with localStorage persistence
- **HTTP Client:** Axios 1.12.2 with interceptors support
- **Styling:** Custom CSS design system with CSS variables

#### Design System
- **Color Scheme:** Custom brown theme (#B5594B) with gray scale
- **Layout:** Left-sidebar dashboard with modular content panels
- **Responsive Design:** Mobile-first approach with flexbox/grid
- **Typography:** Inter font family with consistent sizing scales
- **Components:** Reusable UI components with consistent styling

### Implementation Priorities

#### Phase 1 (Current - Completed) ✅
- User authentication and role management
- Basic dashboard with modular navigation
- AI integration placeholders
- Word cloud interactive features
- Responsive UI design system

#### Phase 2 (Next - High Priority) 🔄
- Complete course management system
- Student enrollment functionality
- Announcement system
- Basic quiz creation and participation
- Enhanced dashboard content

#### Phase 3 (Future - Medium Priority) 📋
- Advanced quiz features with scoring
- File upload and resource management
- Real-time notifications
- Detailed analytics and reporting
- Enhanced AI integration

#### Phase 4 (Advanced - Low Priority) 🚀
- Real-time collaboration features
- Mobile application development
- Advanced analytics with data visualization
- Integration with external LMS systems
- Microservices architecture migration

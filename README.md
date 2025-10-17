# SmartLearn - Interactive Learning Platform

**SmartLearn** is a comprehensive interactive learning and student engagement platform designed for modern educational environments. It provides a complete ecosystem for lecturers to create and manage courses while offering students an engaging learning experience.

## 🏗️ Architecture & Technology Stack

### Backend (Spring Boot)
- **Framework:** Spring Boot 3.3.2 with Java 21
- **Database:** MySQL 8.0 with Spring Data JPA/Hibernate
- **Security:** Spring Security with BCrypt password encryption
- **Authentication:** JWT-based token authentication
- **API:** RESTful API design with CORS support

### Frontend (React)
- **Framework:** React 18.3.1 with modern hooks
- **Build Tool:** Vite 5.2.0 for fast development
- **Routing:** React Router DOM 6.30.1
- **HTTP Client:** Axios 1.12.2
- **State Management:** React Context API with Local Storage
- **UI:** Custom CSS design system with responsive layout

### Core Features
- **Multi-role Authentication:** Lecturer and Student roles with role-based access control
- **Course Management:** Complete course creation, management, and enrollment system
- **Interactive Dashboard:** Modern left-sidebar navigation with modular content panels
- **AI-Powered Tools:** Question generation and answer clustering capabilities
- **Word Cloud Activities:** Real-time collaborative word cloud generation
- **Responsive Design:** Mobile-first design with modern UI components

## 📋 Prerequisites

### System Requirements
1. **Java Development Kit (JDK) 21+**
2. **Node.js 16+ (LTS recommended)**
3. **MySQL 8.0 Database Server**
4. **Maven 3.6+ (or use included wrapper)**
5. **Git** for version control

### Development Tools (Recommended)
- **IDE:** IntelliJ IDEA, VS Code, or Eclipse
- **Database Client:** MySQL Workbench, phpMyAdmin, or DBeaver
- **API Testing:** Postman or Thunder Client

## 🚀 Quick Start

### Database Setup

#### Method A: Local MySQL Installation
```sql
-- Create database and user
CREATE DATABASE smartlearn 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

CREATE USER 'smartlearn_user'@'localhost' IDENTIFIED BY 'secure_password_123';
GRANT ALL PRIVILEGES ON smartlearn.* TO 'smartlearn_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Method B: Docker MySQL (Alternative)
```bash
docker run --name smartlearn-mysql \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=smartlearn \
  -e MYSQL_USER=smartlearn_user \
  -e MYSQL_PASSWORD=secure_password_123 \
  -p 3306:3306 \
  -d mysql:8.0
```

### Backend Setup (Spring Boot)

#### Step 1: Database Configuration
Update `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/smartlearn?useSSL=false&serverTimezone=UTC&characterEncoding=utf8&allowPublicKeyRetrieval=true
    username: smartlearn_user
    password: secure_password_123
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update  # Automatically creates/updates tables
    show-sql: true      # Logs SQL statements for debugging
```

#### Step 2: Build and Run Backend
```bash
# Navigate to backend directory
cd backend

# Clean and install dependencies
mvn clean install

# Run the application (will start on port 8080)
mvn spring-boot:run
```
**Verification:** Backend should be accessible at `http://localhost:8080/api/hello`

### Frontend Setup (React + Vite)

#### Step 1: Install Dependencies
```bash
# Navigate to frontend directory
cd frontend

# Install all npm dependencies
npm install
# Alternative: yarn install or pnpm install
```

#### Step 2: Environment Configuration (Optional)
Create `frontend/.env.local` for custom API configuration:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

#### Step 3: Run Development Server
```bash
# Start development server (will start on port 5173)
npm run dev
# Alternative: yarn dev or pnpm dev
```
**Verification:** Frontend should be accessible at `http://localhost:5173`

### Production Build (Optional)

#### Backend Production Build
```bash
cd backend
mvn clean package
java -jar target/smartlearn-backend-0.1.0.jar
```

#### Frontend Production Build
```bash
cd frontend
npm install
npm run build
# Output will be in 'dist' folder for deployment
```

## 🎯 Getting Started Guide

### User Registration and Demo

#### Initial System Setup
1. **Access the Platform:** Navigate to `http://localhost:5173`
2. **Registration Page:** Click "Get Started Free" or navigate to `/auth`
3. **Create Accounts:** Register both lecturer and student accounts for full demonstration

### Scenario 1: Lecturer Workflow

#### Account Creation
```json
// Example registration data
{
  "username": "prof_smith",
  "password": "SecurePass123!",
  "role": "lecturer"
}
```

#### Dashboard Navigation
1. **Login:** Use lecturer credentials
2. **Dashboard Access:** Automatically redirected to role-based dashboard
3. **Module Navigation:** Use left sidebar to navigate between:
   - **Overview:** Quick stats and recent activity
   - **Course Management:** Create and manage courses
   - **AI-Powered Tools:** Content generation and analysis
   - **Student Engagement:** Interactive tools and activities
   - **Analytics & Reports:** Learning analytics dashboard
   - **Word Cloud Activities:** Collaborative word collection

#### Content Creation Features
1. **Course Management Module:**
   - Create new courses with detailed descriptions
   - Manage course content and resources
   - Monitor student enrollment and progress

2. **AI Tools Integration:**
   - Generate quiz questions automatically
   - Analyze student response patterns
   - Create adaptive learning content

3. **Interactive Features:**
   - Set up word cloud activities for brainstorming
   - Create real-time engagement tools
   - Monitor student participation

### Scenario 2: Student Workflow

#### Account Creation
```json
// Example registration data
{
  "username": "student_jane",
  "password": "StudentPass456!",
  "role": "student"
}
```

#### Learning Experience
1. **Student Dashboard:** Access personalized learning dashboard
2. **Available Modules:**
   - **Overview:** Personal learning progress and achievements
   - **My Courses:** Browse and access enrolled courses
   - **Interactive Quizzes:** Participate in course assessments
   - **Word Cloud Activities:** Contribute to collaborative activities

#### Engagement Features
1. **Course Participation:**
   - View course announcements and updates
   - Access learning materials and resources
   - Track personal progress and completion

2. **Interactive Learning:**
   - Participate in real-time quizzes
   - Contribute to word cloud brainstorming sessions
   - Engage with multimedia learning content

### Interactive Features Demo

#### Word Cloud Activity
1. **Lecturer Setup:**
   - Navigate to "Word Cloud Activities" module
   - Create a new brainstorming session
   - Share session details with students

2. **Student Participation:**
   - Access the word cloud activity
   - Submit relevant words or concepts
   - View real-time collaborative word cloud

3. **Real-time Collaboration:**
   - Both roles can see live updates
   - Word frequency visualization
   - Export results for further analysis

#### AI-Powered Tools Demo
1. **Question Generation:**
   ```bash
   # API endpoint test
   curl -X POST http://localhost:8080/api/ai/generateQuestion \
   -H "Content-Type: application/json" \
   -d '"Introduction to React Components"'
   ```

2. **Answer Analysis:**
   ```bash
   # API endpoint test
   curl -X POST http://localhost:8080/api/ai/clusterAnswers \
   -H "Content-Type: application/json" \
   -d '["React is a library", "Components are reusable", "JSX syntax"]'
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` — User registration with role selection
- `POST /api/v1/auth/login` — User login with JWT token response

### Health Check
- `GET /api/hello` — System health and connectivity check

### AI Features
- `POST /api/ai/generateQuestion` — AI-powered question generation
- `POST /api/ai/clusterAnswers` — Intelligent answer clustering

### Interactive Features
- `POST /api/wordcloud/submit` — Submit words for collaborative word clouds
- `GET /api/wordcloud/data` — Retrieve aggregated word cloud data

### Course Management (Future Extensions)
- Course creation and management
- Student enrollment and progress tracking
- Assignment and quiz systems
- Real-time collaboration features

## 🔧 Technical Features

### Current Implementation ✅

#### Authentication & Security
- **Multi-role Registration:** Lecturer and Student role support
- **JWT Authentication:** Token-based session management
- **Password Security:** BCrypt encryption for secure password storage
- **Role-based Access:** Protected routes and features based on user roles

#### User Interface
- **Modern Dashboard:** Left-sidebar navigation with modular content
- **Responsive Design:** Mobile-first approach with responsive layouts
- **Theme System:** Custom brown color scheme with consistent styling
- **Interactive Components:** Real-time feedback and smooth transitions

#### Core Functionality
- **Word Cloud System:** Real-time collaborative word collection and visualization
- **AI Integration:** Placeholder endpoints for question generation and answer analysis
- **Health Monitoring:** System health check endpoints
- **Data Persistence:** MySQL database with automatic schema generation

### Planned Extensions 🔄

#### Course Management System
- **Course Creation:** Detailed course setup with metadata
- **Student Enrollment:** Bulk enrollment and management tools
- **Content Management:** Upload and organize course materials
- **Progress Tracking:** Monitor student learning progress

#### Assessment Tools
- **Quiz Builder:** Create and manage interactive quizzes
- **Real-time Assessment:** Live quiz participation with instant feedback
- **Grading System:** Automated and manual grading capabilities
- **Analytics Dashboard:** Detailed performance analytics

#### Collaboration Features
- **Announcement System:** Course-wide communication tools
- **Discussion Forums:** Student-lecturer interaction spaces
- **Real-time Chat:** Instant messaging capabilities
- **File Sharing:** Secure document and resource sharing

## 🚀 Deployment Options

### Backend Deployment
**Recommended:** Cloud platforms with Java support
- **Render/Railway:** Simple Java web service deployment
- **AWS/GCP/Azure:** Enterprise-grade cloud deployment
- **Heroku:** Quick prototype deployment

**Build Command:**
```bash
mvn clean package
java -jar target/smartlearn-backend-0.1.0.jar
```

### Frontend Deployment
**Recommended:** Static site hosting platforms
- **Vercel/Netlify:** Optimized for React applications
- **AWS S3 + CloudFront:** Enterprise CDN distribution
- **GitHub Pages:** Simple static hosting

**Build Command:**
```bash
npm run build
```

### Configuration for Production
1. **Update API Base URL:** Edit `frontend/src/services/api.js`
2. **Environment Variables:** Configure database and security settings
3. **SSL/HTTPS:** Enable secure connections for production

## 🐛 Troubleshooting Guide

### Common Issues and Solutions

#### Database Connection Issues
```bash
# Check MySQL service status
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS

# Test database connection
mysql -u smartlearn_user -p smartlearn
```

#### Port Conflicts
```bash
# Check if ports are in use
netstat -an | grep 8080  # Backend port
netstat -an | grep 5173  # Frontend port

# Kill processes if needed
sudo kill -9 $(lsof -t -i:8080)
```

#### Build Issues
```bash
# Clean Maven cache
mvn clean
rm -rf ~/.m2/repository/com/smartlearn

# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Development Tips

#### Hot Reloading
- **Frontend:** Vite provides instant hot module replacement
- **Backend:** Use Spring Boot DevTools for automatic restart

#### Debugging
- **Frontend:** Browser DevTools with React DevTools extension
- **Backend:** IDE debugging with breakpoints
- **Database:** Check application logs for SQL statements

#### Performance Monitoring
- **Frontend:** React Profiler for component performance
- **Backend:** Spring Actuator endpoints for health monitoring
- **Database:** MySQL slow query log analysis

## 🔧 Development & Extension

### Project Structure
```
SmartLearn/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/smartlearn/
│   │   ├── auth/           # Authentication & Security
│   │   ├── controller/     # REST Controllers
│   │   ├── model/          # JPA Entities
│   │   ├── service/        # Business Logic
│   │   └── repo/           # Data Repositories
│   └── src/main/resources/
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable Components
│   │   ├── pages/          # Page Components
│   │   ├── services/       # API Services
│   │   └── styles/         # CSS Styles
│   └── public/
└── docs/                   # Documentation
```

### Next Steps for Extension
- **Database Scaling:** Implement connection pooling and optimization
- **Real-time Features:** Add WebSocket support for live collaboration
- **File Management:** Course materials and assignment uploads
- **Advanced Analytics:** Detailed learning analytics and reporting
- **Mobile App:** React Native mobile application
- **Microservices:** Service decomposition for scalability
- **CI/CD Pipeline:** Automated testing and deployment

## 📄 License & Contributing

This project is designed for educational purposes and can be extended for commercial use. Contributions are welcome through pull requests and issue reporting.

**Note:** This platform is designed for educational demonstration and can be extended for production use with additional security, scalability, and feature enhancements.

---

**SmartLearn** - Transforming education through interactive technology 🎓

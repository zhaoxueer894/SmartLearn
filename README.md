# SmartLearn - Interactive Learning Platform

**Language / 语言选择:** [English](#english) | [中文](#中文)

---

## English

SmartLearn is a modern educational platform that enables lecturers to create courses and engage students through interactive tools and AI-powered features.

### 🏗️ Tech Stack

**Backend:** Spring Boot 3.3.2 + MySQL 8.0 + Spring Security + BCrypt  
**Frontend:** React 18.3.1 + Vite 5.2.0 + Custom CSS Design System

## 🚀 Quick Start

### 🐳 Docker 方式（推荐）

**环境要求:**
- Docker Desktop
- Git

**一键启动:**
```bash
# 1. 克隆项目
git clone <your-repository-url>
cd SmartLearn

# 2. 启动所有服务
docker compose up --build

# 3. 访问应用
# 前端: http://localhost:5173
# 后端: http://localhost:8080  
# 数据库管理: http://localhost:8081
```

**停止服务:**
```bash
# 停止服务（保留数据）
docker compose down

# 停止并清理数据
docker compose down -v
```

### 💻 本地开发方式

**环境要求:**
- Java 21+
- Node.js 16+
- MySQL 8.0

**数据库配置:**
```sql
CREATE DATABASE smartlearn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'smartlearn_user'@'localhost' IDENTIFIED BY 'secure_password_123';
GRANT ALL PRIVILEGES ON smartlearn.* TO 'smartlearn_user'@'localhost';
```

**启动后端:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
# Backend: http://localhost:8080
```

**启动前端:**
```bash
cd frontend
npm install
npm run dev
# Frontend: http://localhost:5173
```

## 🎯 Features

### For Lecturers
- **Course Management**: Create and manage courses with detailed information
- **AI Tools**: Generate questions and analyze student responses
- **Word Cloud Activities**: Interactive brainstorming sessions
- **Student Analytics**: Track engagement and progress

### For Students
- **Course Enrollment**: Browse and access enrolled courses
- **Interactive Learning**: Participate in quizzes and activities
- **Progress Tracking**: Monitor learning achievements
- **Collaborative Tools**: Contribute to word clouds and discussions

## 🔧 Key Functionality

#### Authentication
- Role-based access (Lecturer/Student)
- Frontend: Mock authentication (development mode)
- Backend: Real database authentication with BCrypt
- Note: Frontend uses mock login, backend has full auth implementation

### Interactive Features
- Real-time word cloud collaboration
- AI-powered question generation
- Modern responsive dashboard
- Mobile-friendly design

#### Current Status
✅ **Fully Implemented Backend**
- Complete REST API with 15+ endpoints
- User authentication with database persistence
- Course management (CRUD operations)
- Student enrollment system
- Quiz and announcement systems
- Word cloud collaboration features

✅ **Frontend (Mock Integration)**
- User interface for all features
- Mock authentication (not connected to backend)
- Course creation and management UI
- Word cloud activities
- AI tools integration (mock data)
- Responsive design with elegant color scheme

🔄 **Integration Gap**
- Frontend uses mock authentication instead of backend API
- Frontend displays mock data instead of real database data
- API endpoints exist but frontend doesn't call them

## ⚠️ Important Notes

### Backend vs Frontend Implementation Status

**Backend (Spring Boot):** ✅ **Production Ready**
- Complete MySQL database integration
- 15+ REST API endpoints fully implemented
- Real user authentication with BCrypt encryption
- Course management, enrollment, quiz, and announcement systems
- All CRUD operations working with database persistence

**Frontend (React):** ⚠️ **Development Mode**
- UI is complete and fully functional
- Currently uses mock data and localStorage
- Authentication bypasses backend API calls
- All features work with simulated data

### 🔗 Frontend-Backend 集成状态:

**Docker 环境:**
- ✅ Frontend 通过 `VITE_API_BASE` 连接到后端容器
- ✅ 支持真实 API 调用（当设置环境变量时）
- ⚠️ 本地开发模式仍使用 Mock 认证

**本地开发连接步骤:**
1. 设置环境变量: `VITE_API_BASE=http://localhost:8080`
2. 重启前端开发服务器
3. 更新 `AuthContext.jsx` 使用真实后端登录
4. 测试所有 API 集成

---

## 中文

SmartLearn 是一个现代化的教育平台，使讲师能够创建课程并通过互动工具和AI功能与学生互动。

### 🏗️ 技术栈

**后端:** Spring Boot 3.3.2 + MySQL 8.0 + Spring Security + BCrypt  
**前端:** React 18.3.1 + Vite 5.2.0 + 自定义CSS设计系统

### 🚀 快速开始

#### 环境要求
- Java 21+
- Node.js 16+
- MySQL 8.0

#### 数据库配置
```sql
CREATE DATABASE smartlearn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'smartlearn_user'@'localhost' IDENTIFIED BY 'secure_password_123';
GRANT ALL PRIVILEGES ON smartlearn.* TO 'smartlearn_user'@'localhost';
```

#### 启动后端
```bash
cd backend
mvn clean install
mvn spring-boot:run
# 后端: http://localhost:8080
```

#### 启动前端
```bash
cd frontend
npm install
npm run dev
# 前端: http://localhost:5173
```

### 🎯 功能特性

#### 讲师功能
- **课程管理**: 创建和管理详细的课程信息
- **AI工具**: 生成问题并分析学生回答
- **词云活动**: 互动式头脑风暴会话
- **学生分析**: 跟踪参与度和进度

#### 学生功能
- **课程注册**: 浏览和访问已注册的课程
- **互动学习**: 参与测验和活动
- **进度跟踪**: 监控学习成就
- **协作工具**: 参与词云和讨论

### 🔧 核心功能

#### 用户认证
- 基于角色的访问控制（讲师/学生）
- 前端：模拟认证（开发模式）
- 后端：基于数据库的真实认证，使用BCrypt加密
- 注意：前端使用模拟登录，后端已有完整认证实现

#### 互动特性
- 实时词云协作
- AI驱动的问题生成
- 现代响应式仪表板
- 移动端友好设计

#### 当前状态
✅ **后端完全实现**
- 完整的REST API，包含15+个接口
- 基于数据库的用户认证系统
- 课程管理（CRUD操作）
- 学生注册系统
- 测验和公告系统
- 词云协作功能

✅ **前端（模拟集成）**
- 所有功能的用户界面
- 模拟认证（未连接后端）
- 课程创建和管理界面
- 词云活动
- AI工具集成（模拟数据）
- 优雅配色的响应式设计

🔄 **集成差距**
- 前端使用模拟认证而非后端API
- 前端显示模拟数据而非真实数据库数据
- API接口已存在但前端未调用

## ⚠️ 重要说明

### 后端与前端实现状态

**后端 (Spring Boot):** ✅ **生产就绪**
- 完整的MySQL数据库集成
- 15+个REST API接口完全实现
- 基于BCrypt加密的真实用户认证
- 课程管理、注册、测验和公告系统
- 所有CRUD操作都与数据库持久化工作

**前端 (React):** ⚠️ **开发模式**
- UI界面完整且功能齐全
- 当前使用模拟数据和localStorage
- 认证绕过后端API调用
- 所有功能都使用模拟数据运行

### 连接前端到后端的步骤:
1. 更新 `AuthContext.jsx` 调用 `/api/v1/auth/login` 而非模拟登录
2. 用API调用替换课程/注册组件中的模拟数据
3. 配置用于生产部署的API基础URL
4. 彻底测试所有API集成

## 🐳 Docker 部署详情

### **服务架构**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │     MySQL       │
│   (React+Vite)  │───▶│  (Spring Boot)  │───▶│   (Database)    │
│   Port: 5173    │    │   Port: 8080    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │     Adminer     │
                       │ (DB Management) │
                       │   Port: 8081    │
                       └─────────────────┘
```

### **Docker 配置文件**
- `docker-compose.yml` - 服务编排配置
- `backend/Dockerfile` - 后端构建配置
- `frontend/Dockerfile` - 前端构建配置  
- `docker/mysql/init/init.sql` - 数据库初始化脚本

### **数据库访问（Adminer）**
访问 http://localhost:8081 并使用以下信息：
- **System**: MySQL
- **Server**: `db`
- **Username**: `smartlearn_user`
- **Password**: `secure_password_123`
- **Database**: `smartlearn`

### 📋 API接口

```bash
# 用户认证（完全实现）
POST /api/v1/auth/register
POST /api/v1/auth/login

# 健康检查
GET /api/hello

# AI功能（模拟实现）
POST /api/ai/generateQuestion
POST /api/ai/clusterAnswers

# 词云（完全实现）
POST /api/wordcloud/submit
GET /api/wordcloud/data

# 课程管理（完全实现）
POST /api/v1/courses
GET /api/v1/courses
PUT /api/v1/courses/{id}
DELETE /api/v1/courses/{id}

# 学生注册系统（完全实现）
POST /api/v1/courses/{courseId}/enrollments
GET /api/v1/courses/{courseId}/enrollments

# 公告系统（完全实现）
POST /api/v1/courses/{courseId}/announcements
GET /api/v1/courses/{courseId}/announcements

# 测验系统（完全实现）
POST /api/v1/courses/{courseId}/quizzes
GET /api/v1/courses/{courseId}/quizzes
POST /api/v1/quizzes/{quizId}/submit
```

## 🛠️ 开发者指南

### **Docker 开发流程**
```bash
# 开发模式启动
docker compose up --build

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f [service-name]

# 停止服务
docker compose down

# 重置环境（清理数据）
docker compose down -v
```

### **故障排查**
```bash
# 检查容器状态
docker compose ps

# 查看特定服务日志
docker compose logs backend
docker compose logs frontend  
docker compose logs db

# 进入容器调试
docker compose exec backend bash
docker compose exec db mysql -u root -p
```

---

**SmartLearn** - Modern education through interactive technology 🎓

## Run with Docker (recommended for teammates)

This repository includes a `docker-compose.yml` that starts MySQL, the backend (Spring Boot), the frontend (nginx static build) and Adminer (DB web UI).

Quick steps (Windows PowerShell):

```powershell
# from project root
docker compose up --build
```

After startup:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- Adminer: http://localhost:8081 (username: smartlearn_user, password: secure_password_123)

To stop and remove containers:

```powershell
docker compose down -v
```

Notes:
- The MySQL initialization script is in `docker/mysql/init/init.sql` and will create a `smartlearn` database and sample users. Spring Boot is configured to auto-create/update tables using JPA.
- If you want the frontend to call the backend inside Docker, the compose file injects `VITE_API_BASE=http://backend:8080` into the frontend build environment.

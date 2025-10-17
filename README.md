# SmartLearn - Interactive Learning Platform

**Language / 语言选择:** [English](#english) | [中文](#中文)

---

## English

SmartLearn is a modern educational platform that enables lecturers to create courses and engage students through interactive tools and AI-powered features.

## 🏗️ Tech Stack

**Backend:** Spring Boot 3.3.2 + MySQL 8.0 + JWT Authentication  
**Frontend:** React 18.3.1 + Vite 5.2.0 + Custom CSS Design System

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Node.js 16+
- MySQL 8.0

### Database Setup
```sql
CREATE DATABASE smartlearn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'smartlearn_user'@'localhost' IDENTIFIED BY 'secure_password_123';
GRANT ALL PRIVILEGES ON smartlearn.* TO 'smartlearn_user'@'localhost';
```

### Run Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
# Backend: http://localhost:8080
```

### Run Frontend
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

### Authentication
- Role-based access (Lecturer/Student)
- JWT token authentication
- Secure password encryption

### Interactive Features
- Real-time word cloud collaboration
- AI-powered question generation
- Modern responsive dashboard
- Mobile-friendly design

### Current Status
✅ **Completed**
- User authentication and role management
- Course creation and listing
- Word cloud activities
- AI tools integration (mock)
- Responsive UI with elegant color scheme

🔄 **In Progress**
- Student enrollment system
- Assignment management
- Real-time collaboration features

## � API Endpoints

```bash
# Authentication
POST /api/v1/auth/register
POST /api/v1/auth/login

# Health Check
GET /api/hello

# AI Features
POST /api/ai/generateQuestion
POST /api/ai/clusterAnswers

# Word Cloud
POST /api/wordcloud/submit
GET /api/wordcloud/data
```

## 🎨 Demo Accounts

Use these for testing:

**Lecturer:**
- Username: teacher1
- Password: password123

**Student:**
- Username: student1  
- Password: password123

## � Deployment

### Backend (Production)
```bash
mvn clean package
java -jar target/smartlearn-backend-0.1.0.jar
```

### Frontend (Production)
```bash
npm run build
# Deploy 'dist' folder to static hosting
```

**Recommended Platforms:**
- Backend: Render, Railway, AWS
- Frontend: Vercel, Netlify, GitHub Pages

## �️ Development

### Project Structure
```
SmartLearn/
├── backend/           # Spring Boot API
├── frontend/          # React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/  # Auth & State
│   │   └── styles/    # CSS Design System
└── README.md
```

### Environment Configuration
```yaml
# backend/src/main/resources/application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/smartlearn
    username: smartlearn_user
    password: secure_password_123
```

## 🐛 Troubleshooting

**Port Conflicts:**
```bash
netstat -an | grep 8080  # Check backend port
netstat -an | grep 5173  # Check frontend port
```

**Database Issues:**
```bash
mysql -u smartlearn_user -p smartlearn  # Test connection
```

---

## 中文

SmartLearn 是一个现代化的教育平台，使讲师能够创建课程并通过互动工具和AI功能与学生互动。

### 🏗️ 技术栈

**后端:** Spring Boot 3.3.2 + MySQL 8.0 + JWT 认证  
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
- JWT令牌认证
- 安全密码加密

#### 互动特性
- 实时词云协作
- AI驱动的问题生成
- 现代响应式仪表板
- 移动端友好设计

#### 当前状态
✅ **已完成**
- 用户认证和角色管理
- 课程创建和列表
- 词云活动
- AI工具集成（模拟）
- 优雅配色的响应式UI

🔄 **进行中**
- 学生注册系统
- 作业管理
- 实时协作功能

### 📋 API接口

```bash
# 用户认证
POST /api/v1/auth/register
POST /api/v1/auth/login

# 健康检查
GET /api/hello

# AI功能
POST /api/ai/generateQuestion
POST /api/ai/clusterAnswers

# 词云
POST /api/wordcloud/submit
GET /api/wordcloud/data
```

### 🎨 演示账户

测试用账户：

**讲师:**
- 用户名: teacher1
- 密码: password123

**学生:**
- 用户名: student1  
- 密码: password123

### 🚢 部署

#### 后端（生产环境）
```bash
mvn clean package
java -jar target/smartlearn-backend-0.1.0.jar
```

#### 前端（生产环境）
```bash
npm run build
# 将 'dist' 文件夹部署到静态托管
```

**推荐平台:**
- 后端: Render, Railway, AWS
- 前端: Vercel, Netlify, GitHub Pages

### 🛠️ 开发

#### 项目结构
```
SmartLearn/
├── backend/           # Spring Boot API
├── frontend/          # React 应用
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/  # 认证和状态
│   │   └── styles/    # CSS设计系统
└── README.md
```

#### 环境配置
```yaml
# backend/src/main/resources/application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/smartlearn
    username: smartlearn_user
    password: secure_password_123
```

### 🐛 故障排除

**端口冲突:**
```bash
netstat -an | grep 8080  # 检查后端端口
netstat -an | grep 5173  # 检查前端端口
```

**数据库问题:**
```bash
mysql -u smartlearn_user -p smartlearn  # 测试连接
```

---

**SmartLearn** - Modern education through interactive technology 🎓

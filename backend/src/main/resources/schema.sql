-- 创建SmartLearn数据库的用户表
-- 如果使用Hibernate的ddl-auto: update，这个脚本会自动执行

CREATE DATABASE IF NOT EXISTS smartlearn 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE smartlearn;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_role ON users(role);

-- 插入一些测试数据（可选）
INSERT IGNORE INTO users (username, password, role) VALUES 
('admin', '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'lecturer'),
('student1', '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'student');
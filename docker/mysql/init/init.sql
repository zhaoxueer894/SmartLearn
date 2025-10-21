CREATE DATABASE IF NOT EXISTS smartlearn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smartlearn;
/* users table - optional, JPA can auto-create tables */
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  email VARCHAR(255)
);

INSERT INTO users (username, password, role, email) VALUES
('teacher1', '$2a$10$abcdefghijklmnopqrstuv', 'lecturer', 'teacher1@smartlearn.com'),
('student1', '$2a$10$abcdefghijklmnopqrstuv', 'student', 'student1@smartlearn.com')
ON DUPLICATE KEY UPDATE username=username;

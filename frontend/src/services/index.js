// 统一导出所有服务
export { authService } from './authService';
export { courseService } from './courseService';
export { aiService } from './aiService';
export { wordCloudService } from './wordCloudService';
export { default as apiClient } from './apiClient';

// 方便的默认导出
const services = {
  auth: authService,
  course: courseService,
  ai: aiService,
  wordCloud: wordCloudService,
};

export default services;
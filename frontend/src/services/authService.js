import apiClient from './apiClient';

/**
 * 认证相关API服务
 */
export const authService = {
  /**
   * 用户注册
   * @param {Object} userData - 用户注册数据
   * @param {string} userData.username - 用户名
   * @param {string} userData.password - 密码
   * @param {string} userData.role - 用户角色 (lecturer|student)
   * @returns {Promise} API响应
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/v1/auth/register', userData);
      return {
        success: true,
        data: response.data,
        message: 'Registration successful'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        error: error.response?.data
      };
    }
  },

  /**
   * 用户登录
   * @param {Object} credentials - 登录凭据
   * @param {string} credentials.username - 用户名
   * @param {string} credentials.password - 密码
   * @returns {Promise} API响应
   */
  async login(credentials) {
    try {
      const response = await apiClient.post('/v1/auth/login', credentials);
      return {
        success: true,
        data: response.data,
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        error: error.response?.data
      };
    }
  },

  /**
   * 检查token有效性
   * @returns {Promise} 验证结果
   */
  async validateToken() {
    try {
      const response = await apiClient.get('/v1/auth/validate');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Token validation failed'
      };
    }
  },

  /**
   * 刷新token
   * @returns {Promise} 新token
   */
  async refreshToken() {
    try {
      const response = await apiClient.post('/v1/auth/refresh');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Token refresh failed'
      };
    }
  }
};
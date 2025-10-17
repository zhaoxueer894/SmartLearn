import apiClient from './apiClient';

/**
 * 课程相关API服务
 */
export const courseService = {
  /**
   * 获取所有课程
   * @returns {Promise} 课程列表
   */
  async getAllCourses() {
    try {
      const response = await apiClient.get('/courses');
      return {
        success: true,
        data: response.data,
        message: 'Courses fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch courses'
      };
    }
  },

  /**
   * 根据用户角色获取课程
   * @param {string} role - 用户角色
   * @returns {Promise} 课程列表
   */
  async getCoursesByRole(role) {
    try {
      const response = await apiClient.get(`/courses?role=${role}`);
      return {
        success: true,
        data: response.data,
        message: 'Courses fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch courses'
      };
    }
  },

  /**
   * 获取课程详情
   * @param {string|number} courseId - 课程ID
   * @returns {Promise} 课程详情
   */
  async getCourseById(courseId) {
    try {
      const response = await apiClient.get(`/courses/${courseId}`);
      return {
        success: true,
        data: response.data,
        message: 'Course details fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch course details'
      };
    }
  },

  /**
   * 创建新课程 (仅讲师)
   * @param {Object} courseData - 课程数据
   * @returns {Promise} 创建结果
   */
  async createCourse(courseData) {
    try {
      const response = await apiClient.post('/courses', courseData);
      return {
        success: true,
        data: response.data,
        message: 'Course created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create course'
      };
    }
  },

  /**
   * 更新课程 (仅讲师)
   * @param {string|number} courseId - 课程ID
   * @param {Object} courseData - 更新的课程数据
   * @returns {Promise} 更新结果
   */
  async updateCourse(courseId, courseData) {
    try {
      const response = await apiClient.put(`/courses/${courseId}`, courseData);
      return {
        success: true,
        data: response.data,
        message: 'Course updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update course'
      };
    }
  },

  /**
   * 删除课程 (仅讲师)
   * @param {string|number} courseId - 课程ID
   * @returns {Promise} 删除结果
   */
  async deleteCourse(courseId) {
    try {
      await apiClient.delete(`/courses/${courseId}`);
      return {
        success: true,
        message: 'Course deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete course'
      };
    }
  },

  /**
   * 学生加入课程
   * @param {string|number} courseId - 课程ID
   * @returns {Promise} 加入结果
   */
  async enrollInCourse(courseId) {
    try {
      const response = await apiClient.post(`/courses/${courseId}/enroll`);
      return {
        success: true,
        data: response.data,
        message: 'Enrolled in course successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to enroll in course'
      };
    }
  },

  /**
   * 获取课程的学生列表 (仅讲师)
   * @param {string|number} courseId - 课程ID
   * @returns {Promise} 学生列表
   */
  async getCourseStudents(courseId) {
    try {
      const response = await apiClient.get(`/courses/${courseId}/students`);
      return {
        success: true,
        data: response.data,
        message: 'Students fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch students'
      };
    }
  }
};
import apiClient from './apiClient';

/**
 * AI相关API服务
 */
export const aiService = {
  /**
   * 生成问题
   * @param {Object} topic - 话题对象
   * @returns {Promise} API响应
   */
  async generateQuestion(topic) {
    try {
      const response = await apiClient.post('/ai/generateQuestion', topic);
      return {
        success: true,
        data: response.data,
        message: 'Question generated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to generate question',
        error: error.response?.data
      };
    }
  },

  /**
   * 聚类答案
   * @param {Array} answers - 答案数组
   * @returns {Promise} API响应
   */
  async clusterAnswers(answers) {
    try {
      const response = await apiClient.post('/ai/clusterAnswers', answers);
      return {
        success: true,
        data: response.data,
        message: 'Answers clustered successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to cluster answers',
        error: error.response?.data
      };
    }
  }
};
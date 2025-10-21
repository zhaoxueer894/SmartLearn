import apiClient from './apiClient';

/**
 * 词云相关API服务
 */
export const wordCloudService = {
  /**
   * 提交单词
   * @param {string} word - 要提交的单词
   * @returns {Promise} API响应
   */
  async submitWord(word) {
    try {
      const response = await apiClient.post('/wordcloud/submit', { word });
      return {
        success: true,
        data: response.data,
        message: 'Word submitted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to submit word',
        error: error.response?.data
      };
    }
  },

  /**
   * 获取词云数据
   * @returns {Promise} API响应
   */
  async getWordCloud() {
    try {
      const response = await apiClient.get('/wordcloud/data');
      return {
        success: true,
        data: response.data,
        message: 'Word cloud data retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get word cloud data',
        error: error.response?.data
      };
    }
  }
};
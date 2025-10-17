import axios from "axios";

// TODO: replace with your deployed backend base URL when on cloud:
export const API_BASE = "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_BASE,
});

export const aiAPI = {
  generateQuestion: (topic) => api.post("/ai/generateQuestion", topic),
  clusterAnswers: (answers) => api.post("/ai/clusterAnswers", answers),
};

export const wordCloudAPI = {
  submitWord: (word) => api.post("/wordcloud/submit", { word }),
  getWordCloud: () => api.get("/wordcloud/data"),
};

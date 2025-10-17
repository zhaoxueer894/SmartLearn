package com.smartlearn.service.ai;

import org.springframework.stereotype.Service;

@Service
public class AiService {

    public String generateQuestion(String topic) {
        // TODO: integrate OpenAI / HuggingFace SDK here.
        return "AI-generated question based on topic: " + topic;
    }

    public String clusterAnswers(String[] answers) {
        // TODO: call embeddings / clustering logic here.
        return "Clustered " + answers.length + " answers.";
    }
}

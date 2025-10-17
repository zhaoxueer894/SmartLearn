package com.smartlearn.service.interactive;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class WordCloudService {
    private final Map<String, Integer> wordMap = new HashMap<>();

    public void addWord(String word) {
        if (word == null || word.isBlank()) return;
        word = word.trim();
        wordMap.put(word, wordMap.getOrDefault(word, 0) + 1);
    }

    public Map<String, Integer> getWordCloud() {
        return wordMap;
    }
}

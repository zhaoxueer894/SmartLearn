package com.smartlearn.controller.interactive;

import com.smartlearn.service.interactive.WordCloudService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/wordcloud")
@CrossOrigin(origins = "*")
public class WordCloudController {

    private final WordCloudService wordCloudService;

    public WordCloudController(WordCloudService wordCloudService) {
        this.wordCloudService = wordCloudService;
    }

    @PostMapping("/submit")
    public String submitWord(@RequestBody Map<String, String> body) {
        String word = body.get("word");
        wordCloudService.addWord(word);
        return "Word received: " + word;
    }

    @GetMapping("/data")
    public Map<String, Integer> getWordCloud() {
        return wordCloudService.getWordCloud();
    }
}

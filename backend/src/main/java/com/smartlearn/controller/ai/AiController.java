package com.smartlearn.controller.ai;

import com.smartlearn.service.ai.AiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generateQuestion")
    public String generateQuestion(@RequestBody String topic) {
        return aiService.generateQuestion(topic);
    }

    @PostMapping("/clusterAnswers")
    public String clusterAnswers(@RequestBody String[] answers) {
        return aiService.clusterAnswers(answers);
    }
}

package com.smartlearn.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/api/v1/courses/{courseId}/quizzes")
    public ResponseEntity<Quiz> createQuiz(
            @PathVariable Long courseId,
            @RequestBody Quiz quiz) {
        quiz.setCourseId(courseId);
        return ResponseEntity.ok(quizService.createQuiz(quiz));
    }

    @GetMapping("/api/v1/courses/{courseId}/quizzes")
    public ResponseEntity<List<Quiz>> getQuizzes(@PathVariable Long courseId) {
        return ResponseEntity.ok(quizService.getQuizzesByCourse(courseId));
    }

    // Simple placeholder interaction
    @PostMapping("/api/v1/quizzes/{quizId}/submit")
    public ResponseEntity<String> submitQuiz(@PathVariable Long quizId, @RequestBody Map<String, String> submission) {
        if ("completed".equals(submission.get("status"))) {
            return ResponseEntity.ok(quizService.participateInQuiz(quizId));
        }
        return ResponseEntity.badRequest().body("Invalid submission status.");
    }
}

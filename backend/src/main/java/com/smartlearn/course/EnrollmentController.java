package com.smartlearn.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/courses/{courseId}/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // Request body for enrollment: {"student_ids": [1L, 2L, 3L]}
    @PostMapping
    public ResponseEntity<List<Enrollment>> enrollStudents(
            @PathVariable Long courseId,
            @RequestBody Map<String, List<Long>> requestBody) {
        List<Long> studentIds = requestBody.get("student_ids");
        if (studentIds == null || studentIds.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<Enrollment> enrollments = enrollmentService.enrollStudents(courseId, studentIds);
        return ResponseEntity.ok(enrollments);
    }

    @GetMapping
    public ResponseEntity<List<Enrollment>> getCourseEnrollments(@PathVariable Long courseId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByCourse(courseId));
    }
}

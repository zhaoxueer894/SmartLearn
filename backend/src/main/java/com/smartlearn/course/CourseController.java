package com.smartlearn.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // NOTE: In a real application, you would get the lecturerId from the authenticated user's session/token.
    // For this minimal demo, we'll assume a fixed lecturerId or pass it in the request for simplicity,
    // but the final implementation should integrate with the existing auth system.
    // Assuming the existing auth system provides a way to get the current user's ID.

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        // Placeholder for getting lecturerId from auth context
        // For now, assume course object has lecturerId set or we hardcode a value
        // course.setLecturerId(getCurrentUserId());
        return ResponseEntity.ok(courseService.createCourse(course));
    }

    @GetMapping
    public ResponseEntity<List<Course>> getCourses(@RequestParam Long userId, @RequestParam String role) {
        if ("lecturer".equals(role)) {
            return ResponseEntity.ok(courseService.getCoursesByLecturer(userId));
        }
        // Student logic will be implemented with Enrollment in the next phase
        return ResponseEntity.ok(List.of());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        try {
            return ResponseEntity.ok(courseService.updateCourse(id, courseDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}

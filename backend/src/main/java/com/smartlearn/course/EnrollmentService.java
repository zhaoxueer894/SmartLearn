package com.smartlearn.course;

import com.smartlearn.repo.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public List<Enrollment> enrollStudents(Long courseId, List<Long> studentIds) {
        List<Enrollment> newEnrollments = studentIds.stream()
                .map(studentId -> {
                    Enrollment enrollment = new Enrollment();
                    enrollment.setCourseId(courseId);
                    enrollment.setStudentId(studentId);
                    return enrollment;
                })
                .toList();
        return enrollmentRepository.saveAll(newEnrollments);
    }

    public List<Enrollment> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    public List<Enrollment> getEnrollmentsByStudent(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }
}

package com.smartlearn.repo;

import com.smartlearn.course.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByCourseIdOrderByPostedAtDesc(Long courseId);
}

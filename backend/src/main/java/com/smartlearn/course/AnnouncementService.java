package com.smartlearn.course;

import com.smartlearn.repo.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    public Announcement createAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    public List<Announcement> getAnnouncementsByCourse(Long courseId) {
        return announcementRepository.findByCourseIdOrderByPostedAtDesc(courseId);
    }
}

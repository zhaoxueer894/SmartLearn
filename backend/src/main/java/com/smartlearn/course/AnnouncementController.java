package com.smartlearn.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/courses/{courseId}/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @PostMapping
    public ResponseEntity<Announcement> createAnnouncement(
            @PathVariable Long courseId,
            @RequestBody Announcement announcement) {
        announcement.setCourseId(courseId);
        return ResponseEntity.ok(announcementService.createAnnouncement(announcement));
    }

    @GetMapping
    public ResponseEntity<List<Announcement>> getAnnouncements(@PathVariable Long courseId) {
        return ResponseEntity.ok(announcementService.getAnnouncementsByCourse(courseId));
    }
}

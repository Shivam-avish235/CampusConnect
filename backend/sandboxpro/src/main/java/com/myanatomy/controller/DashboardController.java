package com.myanatomy.controller;

import com.myanatomy.entity.Role;
import com.myanatomy.repository.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final StudentRepository students;
    private final FacultyRepository faculty;
    private final DepartmentRepository departments;
    private final AssignmentRepository assignments;
    private final EventRepository events;
    private final PlacementDriveRepository placements;
    private final AnnouncementRepository announcements;
    private final NotificationRepository notifications;

    public DashboardController(StudentRepository s, FacultyRepository f, DepartmentRepository d, AssignmentRepository a,
            EventRepository e, PlacementDriveRepository p, AnnouncementRepository an, NotificationRepository n) {
        students = s;
        faculty = f;
        departments = d;
        assignments = a;
        events = e;
        placements = p;
        announcements = an;
        notifications = n;
    }

    @GetMapping("/admin")
    public Map<String, Object> admin() {
        return Map.of("students", students.count(), "faculty", faculty.count(), "departments", departments.count(),
                "assignments", assignments.count(), "events", events.count(), "placements", placements.count(),
                "announcements", announcements.count());
    }

    @GetMapping("/faculty")
    public Map<String, Object> faculty() {
        return Map.of("students", students.count(), "assignments", assignments.count(), "events", events.count(),
                "placements", placements.count());
    }

    @GetMapping("/student")
    public Map<String, Object> student() {
        return Map.of("assignments", assignments.count(), "events", events.count(), "placements", placements.count());
    }
}

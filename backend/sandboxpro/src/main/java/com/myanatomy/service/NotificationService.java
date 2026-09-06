package com.myanatomy.service;

import com.myanatomy.entity.Notification;
import com.myanatomy.entity.Role;
import com.myanatomy.entity.User;
import com.myanatomy.repository.NotificationRepository;
import com.myanatomy.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class NotificationService {
    private final NotificationRepository notifications;
    private final UserRepository users;
    public NotificationService(NotificationRepository notifications, UserRepository users) {
        this.notifications = notifications; this.users = users;
    }
    public void notifyStudents(String type, String title, String message, String link) {
        users.findAll().stream().filter(User::isActive).filter(u -> u.getRole() == Role.STUDENT)
                .forEach(u -> save(u, type, title, message, link));
    }
    public void notifyAll(String type, String title, String message, String link) {
        users.findAll().stream().filter(User::isActive)
                .forEach(u -> save(u, type, title, message, link));
    }
    public void notifyAudience(String audience, String type, String title, String message, String link) {
        String a = audience == null ? "ALL" : audience.trim().toUpperCase();
        users.findAll().stream().filter(User::isActive).filter(u ->
                a.equals("ALL") || a.equals("EVERYONE") ||
                (a.contains("STUDENT") && u.getRole() == Role.STUDENT) ||
                (a.contains("FACULTY") && u.getRole() == Role.FACULTY))
                .forEach(u -> save(u, type, title, message, link));
    }
    private void save(User u, String type, String title, String message, String link) {
        Notification n = new Notification();
        n.setUserId(u.getId()); n.setType(type); n.setTitle(title); n.setMessage(message);
        n.setCreatedAt(Instant.now().toString()); n.setLink(link); n.setRead(false);
        notifications.save(n);
    }
}

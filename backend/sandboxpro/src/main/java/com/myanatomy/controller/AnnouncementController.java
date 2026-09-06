package com.myanatomy.controller;

import com.myanatomy.entity.Announcement;
import com.myanatomy.repository.AnnouncementRepository;
import com.myanatomy.service.NotificationService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/announcements")
public class AnnouncementController {
 private final AnnouncementRepository repo; private final NotificationService notifications;
 public AnnouncementController(AnnouncementRepository repo, NotificationService notifications){this.repo=repo;this.notifications=notifications;}
 @GetMapping public List<Announcement> all(){return repo.findAll();}
 @GetMapping("/{id}") public Announcement one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED)
 public Announcement create(@RequestBody Announcement x){if(x.getPublishDate()==null)x.setPublishDate(java.time.LocalDate.now().toString());Announcement saved=repo.save(x);if(saved.isPublished())notifications.notifyAudience(saved.getAudience(),"Announcement",saved.getTitle(),saved.getContent(),"/student/notifications");return saved;}
 @PutMapping("/{id}") public Announcement update(@PathVariable Long id,@RequestBody Announcement x){x.setId(id);return repo.save(x);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){repo.deleteById(id);}
}

package com.myanatomy.controller;

import com.myanatomy.entity.Event;
import com.myanatomy.repository.EventRepository;
import com.myanatomy.service.NotificationService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/events")
public class EventController {
 private final EventRepository repo; private final NotificationService notifications;
 public EventController(EventRepository repo, NotificationService notifications){this.repo=repo;this.notifications=notifications;}
 @GetMapping public List<Event> all(){return repo.findAll();}
 @GetMapping("/{id}") public Event one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Event create(@RequestBody Event x){Event saved=repo.save(x);notifications.notifyStudents("Academic", "New event: "+saved.getTitle(), saved.getDescription(), "/student/events");return saved;}
 @PutMapping("/{id}") public Event update(@PathVariable Long id,@RequestBody Event x){x.setId(id);return repo.save(x);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){repo.deleteById(id);}
}

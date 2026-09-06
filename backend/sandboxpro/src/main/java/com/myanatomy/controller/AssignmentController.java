package com.myanatomy.controller;

import com.myanatomy.entity.Assignment;
import com.myanatomy.repository.AssignmentRepository;
import com.myanatomy.service.NotificationService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/assignments")
public class AssignmentController {
 private final AssignmentRepository repo; private final NotificationService notifications;
 public AssignmentController(AssignmentRepository repo, NotificationService notifications){this.repo=repo;this.notifications=notifications;}
 @GetMapping public List<Assignment> all(){return repo.findAll();}
 @GetMapping("/{id}") public Assignment one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Assignment create(@RequestBody Assignment x){Assignment saved=repo.save(x);notifications.notifyStudents("Assignment","New assignment: "+saved.getTitle(),saved.getDescription(),"/student/assignments");return saved;}
 @PutMapping("/{id}") public Assignment update(@PathVariable Long id,@RequestBody Assignment x){x.setId(id);return repo.save(x);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){repo.deleteById(id);}
}

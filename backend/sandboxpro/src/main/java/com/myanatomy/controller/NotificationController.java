package com.myanatomy.controller;

import com.myanatomy.entity.Notification;
import com.myanatomy.entity.Role;
import com.myanatomy.repository.NotificationRepository;
import com.myanatomy.service.CurrentUserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationRepository repo; private final CurrentUserService current;
    public NotificationController(NotificationRepository repo, CurrentUserService current){this.repo=repo;this.current=current;}
    @GetMapping public List<Notification> all(){return current.is(Role.STUDENT)||current.is(Role.FACULTY)?repo.findByUserId(current.requireUser().getId()):repo.findAll();}
    @GetMapping("/{id}") public Notification one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public Notification create(@RequestBody Notification x){return repo.save(x);}
    @PutMapping("/{id}") public Notification update(@PathVariable Long id,@RequestBody Notification x){x.setId(id);return repo.save(x);}
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){repo.deleteById(id);}
}

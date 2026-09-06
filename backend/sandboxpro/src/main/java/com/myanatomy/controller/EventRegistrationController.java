package com.myanatomy.controller;

import com.myanatomy.entity.*;
import com.myanatomy.repository.EventRegistrationRepository;
import com.myanatomy.service.CurrentUserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@RestController
@RequestMapping("/api/event-registrations")
public class EventRegistrationController {
    private final EventRegistrationRepository repo; private final CurrentUserService current;
    public EventRegistrationController(EventRegistrationRepository repo, CurrentUserService current){this.repo=repo;this.current=current;}
    @GetMapping public List<EventRegistration> all(){return current.is(Role.STUDENT)?repo.findByStudentId(current.requireStudentId()):repo.findAll();}
    @GetMapping("/{id}") public EventRegistration one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public EventRegistration create(@RequestBody EventRegistration x){
        if(current.is(Role.STUDENT)) x.setStudentId(current.requireStudentId());
        if(x.getEventId()==null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"eventId is required");
        if(repo.existsByEventIdAndStudentId(x.getEventId(),x.getStudentId())) throw new ResponseStatusException(HttpStatus.CONFLICT,"Already registered for this event");
        if(x.getRegisteredAt()==null)x.setRegisteredAt(java.time.Instant.now().toString());
        return repo.save(x);
    }
    @PutMapping("/{id}") public EventRegistration update(@PathVariable Long id,@RequestBody EventRegistration x){x.setId(id);return repo.save(x);}
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){repo.deleteById(id);}
}

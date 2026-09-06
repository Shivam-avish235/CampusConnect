package com.myanatomy.controller;

import com.myanatomy.entity.*;
import com.myanatomy.repository.SubmissionRepository;
import com.myanatomy.service.CurrentUserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {
    private final SubmissionRepository repo; private final CurrentUserService current;
    public SubmissionController(SubmissionRepository repo, CurrentUserService current){this.repo=repo;this.current=current;}
    @GetMapping public List<Submission> all(){return current.is(Role.STUDENT)?repo.findByStudentId(current.requireStudentId()):repo.findAll();}
    @GetMapping("/{id}") public Submission one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public Submission create(@RequestBody Submission x){if(current.is(Role.STUDENT))x.setStudentId(current.requireStudentId());if(x.getSubmittedAt()==null)x.setSubmittedAt(java.time.Instant.now().toString());return repo.save(x);}
    @PutMapping("/{id}") public Submission update(@PathVariable Long id,@RequestBody Submission x){x.setId(id);return repo.save(x);}
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){repo.deleteById(id);}
}

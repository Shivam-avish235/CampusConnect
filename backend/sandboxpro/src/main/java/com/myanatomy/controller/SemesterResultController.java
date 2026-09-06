package com.myanatomy.controller;

import com.myanatomy.entity.*;
import com.myanatomy.repository.SemesterResultRepository;
import com.myanatomy.service.CurrentUserService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/results")
public class SemesterResultController {
 private final SemesterResultRepository repo; private final CurrentUserService current;
 public SemesterResultController(SemesterResultRepository repo, CurrentUserService current){this.repo=repo;this.current=current;}
 @GetMapping public List<SemesterResult> all(){return current.is(Role.STUDENT)?repo.findByStudentId(current.requireStudentId()):repo.findAll();}
 @GetMapping("/{id}") public SemesterResult one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
 @PostMapping public SemesterResult create(@RequestBody SemesterResult x){return repo.save(x);}
 @PutMapping("/{id}") public SemesterResult update(@PathVariable Long id,@RequestBody SemesterResult x){x.setId(id);return repo.save(x);}
 @DeleteMapping("/{id}") public void delete(@PathVariable Long id){repo.deleteById(id);}
}

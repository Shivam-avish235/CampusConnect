package com.myanatomy.controller;

import com.myanatomy.entity.*;
import com.myanatomy.repository.SubjectMarkRepository;
import com.myanatomy.service.CurrentUserService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/marks")
public class SubjectMarkController {
 private final SubjectMarkRepository repo; private final CurrentUserService current;
 public SubjectMarkController(SubjectMarkRepository repo, CurrentUserService current){this.repo=repo;this.current=current;}
 @GetMapping public List<SubjectMark> all(){return current.is(Role.STUDENT)?repo.findByStudentId(current.requireStudentId()):repo.findAll();}
 @GetMapping("/{id}") public SubjectMark one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
 @PostMapping public SubjectMark create(@RequestBody SubjectMark x){return repo.save(x);}
 @PutMapping("/{id}") public SubjectMark update(@PathVariable Long id,@RequestBody SubjectMark x){x.setId(id);return repo.save(x);}
 @DeleteMapping("/{id}") public void delete(@PathVariable Long id){repo.deleteById(id);}
}

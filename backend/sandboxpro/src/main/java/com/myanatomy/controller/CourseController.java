package com.myanatomy.controller;

import com.myanatomy.entity.Course;
import com.myanatomy.repository.CourseRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseRepository repo;

    public CourseController(CourseRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Course> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Course one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course create(@RequestBody Course x) {
        return repo.save(x);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable Long id, @RequestBody Course x) {
        x.setId(id);
        return repo.save(x);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}

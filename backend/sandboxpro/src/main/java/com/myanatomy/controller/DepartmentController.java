package com.myanatomy.controller;

import com.myanatomy.entity.Department;
import com.myanatomy.repository.DepartmentRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private final DepartmentRepository repo;

    public DepartmentController(DepartmentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Department> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Department one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Department create(@RequestBody Department x) {
        return repo.save(x);
    }

    @PutMapping("/{id}")
    public Department update(@PathVariable Long id, @RequestBody Department x) {
        x.setId(id);
        return repo.save(x);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}

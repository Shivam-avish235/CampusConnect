package com.myanatomy.controller;

import com.myanatomy.entity.Faculty;
import com.myanatomy.repository.FacultyRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {
    private final FacultyRepository repo;

    public FacultyController(FacultyRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Faculty> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Faculty one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Faculty create(@RequestBody Faculty x) {
        return repo.save(x);
    }

    @PutMapping("/{id}")
    public Faculty update(@PathVariable Long id, @RequestBody Faculty x) {
        x.setId(id);
        return repo.save(x);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}

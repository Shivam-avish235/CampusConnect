package com.myanatomy.controller;

import com.myanatomy.entity.Material;
import com.myanatomy.repository.MaterialRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/materials")
public class MaterialController {
    private final MaterialRepository repo;

    public MaterialController(MaterialRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Material> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Material one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Material create(@RequestBody Material x) {
        return repo.save(x);
    }

    @PutMapping("/{id}")
    public Material update(@PathVariable Long id, @RequestBody Material x) {
        x.setId(id);
        return repo.save(x);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}

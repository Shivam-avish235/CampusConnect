package com.myanatomy.controller;

import com.myanatomy.entity.Section;
import com.myanatomy.repository.SectionRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/sections")
public class SectionController {
    private final SectionRepository repo;

    public SectionController(SectionRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Section> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Section one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Section create(@RequestBody Section x) {
        return repo.save(x);
    }

    @PutMapping("/{id}")
    public Section update(@PathVariable Long id, @RequestBody Section x) {
        x.setId(id);
        return repo.save(x);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}

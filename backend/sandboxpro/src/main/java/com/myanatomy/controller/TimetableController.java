package com.myanatomy.controller;

import com.myanatomy.entity.Timetable;
import com.myanatomy.repository.TimetableRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/timetable")
public class TimetableController {
    private final TimetableRepository repo;

    public TimetableController(TimetableRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Timetable> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Timetable one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Timetable create(@RequestBody Timetable x) {
        return repo.save(x);
    }

    @PutMapping("/{id}")
    public Timetable update(@PathVariable Long id, @RequestBody Timetable x) {
        x.setId(id);
        return repo.save(x);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}

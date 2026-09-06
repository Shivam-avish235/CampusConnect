package com.myanatomy.controller;

import com.myanatomy.entity.AttendanceRecord;
import com.myanatomy.entity.Role;
import com.myanatomy.repository.AttendanceRecordRepository;
import com.myanatomy.service.CurrentUserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceRecordController {
    private final AttendanceRecordRepository repo;
    private final CurrentUserService current;
    public AttendanceRecordController(AttendanceRecordRepository repo, CurrentUserService current) { this.repo=repo; this.current=current; }

    @GetMapping
    public List<AttendanceRecord> all() {
        return current.is(Role.STUDENT) ? repo.findByStudentId(current.requireStudentId()).stream().toList() : repo.findAll();
    }
    @GetMapping("/{id}") public AttendanceRecord one(@PathVariable Long id) { return repo.findById(id).orElseThrow(); }

    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public AttendanceRecord create(@RequestBody AttendanceRecord x) {
        if (current.is(Role.STUDENT)) throw new org.springframework.web.server.ResponseStatusException(HttpStatus.FORBIDDEN, "Students cannot mark attendance");
        return repo.save(x);
    }
    @PutMapping("/{id}")
    public AttendanceRecord update(@PathVariable Long id, @RequestBody AttendanceRecord x) {
        if (current.is(Role.STUDENT)) throw new org.springframework.web.server.ResponseStatusException(HttpStatus.FORBIDDEN, "Students cannot edit attendance");
        x.setId(id); return repo.save(x);
    }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}

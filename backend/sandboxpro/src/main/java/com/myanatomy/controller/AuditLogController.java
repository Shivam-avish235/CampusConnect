package com.myanatomy.controller;

import com.myanatomy.entity.AuditLog;
import com.myanatomy.repository.AuditLogRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/audit-logs")
public class AuditLogController {
    private final AuditLogRepository repo;

    public AuditLogController(AuditLogRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<AuditLog> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public AuditLog one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AuditLog create(@RequestBody AuditLog x) {
        return repo.save(x);
    }

    @PutMapping("/{id}")
    public AuditLog update(@PathVariable Long id, @RequestBody AuditLog x) {
        x.setId(id);
        return repo.save(x);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}

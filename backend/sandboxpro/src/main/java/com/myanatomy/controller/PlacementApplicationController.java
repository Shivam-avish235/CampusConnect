package com.myanatomy.controller;

import com.myanatomy.entity.*;
import com.myanatomy.repository.PlacementApplicationRepository;
import com.myanatomy.service.CurrentUserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@RestController
@RequestMapping("/api/placement-applications")
public class PlacementApplicationController {
    private final PlacementApplicationRepository repo; private final CurrentUserService current;
    public PlacementApplicationController(PlacementApplicationRepository repo, CurrentUserService current){this.repo=repo;this.current=current;}
    @GetMapping public List<PlacementApplication> all(){return current.is(Role.STUDENT)?repo.findByStudentId(current.requireStudentId()):repo.findAll();}
    @GetMapping("/{id}") public PlacementApplication one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public PlacementApplication create(@RequestBody PlacementApplication x){
        if(current.is(Role.STUDENT)){x.setStudentId(current.requireStudentId());}
        if(x.getDriveId()==null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"driveId is required");
        if(repo.existsByDriveIdAndStudentId(x.getDriveId(),x.getStudentId())) throw new ResponseStatusException(HttpStatus.CONFLICT,"Already applied to this drive");
        if(x.getAppliedAt()==null)x.setAppliedAt(java.time.Instant.now().toString());
        return repo.save(x);
    }
    @PutMapping("/{id}") public PlacementApplication update(@PathVariable Long id,@RequestBody PlacementApplication x){x.setId(id);return repo.save(x);}
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){repo.deleteById(id);}
}

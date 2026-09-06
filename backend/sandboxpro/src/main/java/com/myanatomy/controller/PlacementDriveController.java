package com.myanatomy.controller;

import com.myanatomy.entity.PlacementDrive;
import com.myanatomy.repository.PlacementDriveRepository;
import com.myanatomy.service.NotificationService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/placements")
public class PlacementDriveController {
 private final PlacementDriveRepository repo; private final NotificationService notifications;
 public PlacementDriveController(PlacementDriveRepository repo, NotificationService notifications){this.repo=repo;this.notifications=notifications;}
 @GetMapping public List<PlacementDrive> all(){return repo.findAll();}
 @GetMapping("/{id}") public PlacementDrive one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public PlacementDrive create(@RequestBody PlacementDrive x){PlacementDrive saved=repo.save(x);notifications.notifyStudents("Placement","New placement drive: "+saved.getCompany(),saved.getRole(),"/student/placements");return saved;}
 @PutMapping("/{id}") public PlacementDrive update(@PathVariable Long id,@RequestBody PlacementDrive x){x.setId(id);return repo.save(x);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){repo.deleteById(id);}
}

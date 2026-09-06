package com.myanatomy.controller;

import com.myanatomy.entity.*;
import com.myanatomy.repository.*;
import com.myanatomy.service.CurrentUserService;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository users;
    private final CurrentUserService current;
    private final PasswordEncoder encoder;
    private final StudentRepository students;
    private final FacultyRepository faculty;

    public UserController(UserRepository users, CurrentUserService current, PasswordEncoder encoder,
                          StudentRepository students, FacultyRepository faculty) {
        this.users=users; this.current=current; this.encoder=encoder; this.students=students; this.faculty=faculty;
    }

    @GetMapping("/me")
    public Profile me() {
        User u=current.requireUser();
        String phone="";
        String identifier="";
        String department="";
        if(u.getRole()==Role.STUDENT){
            var s=students.findByUserId(u.getId()).orElse(null);
            if(s!=null){phone=s.getPhone();identifier=s.getRollNo();department=s.getDepartment();}
        } else if(u.getRole()==Role.FACULTY){
            var f=faculty.findByUserId(u.getId()).orElse(null);
            if(f!=null){phone=f.getPhone();identifier=f.getFacultyId();department=f.getDepartment();}
        }
        return new Profile(u.getId(),u.getName(),u.getEmail(),u.getRole().name(),u.isActive(),phone,identifier,department);
    }

    @PutMapping("/me/profile")
    public Profile update(@RequestBody ProfileUpdate r) {
        User u=current.requireUser();
        if(r.name()!=null&&!r.name().isBlank())u.setName(r.name().trim());
        users.save(u);
        if(u.getRole()==Role.STUDENT) students.findByUserId(u.getId()).ifPresent(s->{s.setName(u.getName());s.setPhone(r.phone());students.save(s);});
        if(u.getRole()==Role.FACULTY) faculty.findByUserId(u.getId()).ifPresent(f->{f.setName(u.getName());f.setPhone(r.phone());faculty.save(f);});
        return me();
    }

    @PutMapping("/me/password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void password(@RequestBody PasswordChange r) {
        User u=current.requireUser();
        if(r.currentPassword()==null||!encoder.matches(r.currentPassword(),u.getPassword()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Current password is incorrect");
        if(r.newPassword()==null||r.newPassword().length()<8)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"New password must be at least 8 characters");
        u.setPassword(encoder.encode(r.newPassword())); users.save(u);
    }

    public record Profile(Long id,String name,String email,String role,boolean active,String phone,String identifier,String department){}
    public record ProfileUpdate(String name,String phone){}
    public record PasswordChange(String currentPassword,String newPassword){}
}

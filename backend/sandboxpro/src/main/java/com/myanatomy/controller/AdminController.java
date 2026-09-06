package com.myanatomy.controller;

import com.myanatomy.dto.ProvisionUserRequest;
import com.myanatomy.dto.ProvisionUserResponse;
import com.myanatomy.entity.Faculty;
import com.myanatomy.entity.Role;
import com.myanatomy.entity.Student;
import com.myanatomy.entity.User;
import com.myanatomy.repository.FacultyRepository;
import com.myanatomy.repository.StudentRepository;
import com.myanatomy.repository.UserRepository;
import com.myanatomy.service.AuthService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AuthService auth;
    private final StudentRepository students;
    private final FacultyRepository faculty;
    private final UserRepository users;

    public AdminController(AuthService a, StudentRepository s, FacultyRepository f, UserRepository u) {
        auth = a;
        students = s;
        faculty = f;
        users = u;
    }

    @GetMapping("/users")
    public List<UserView> users() {
        return users.findAll().stream()
                .map(u -> new UserView(u.getId(), u.getName(), u.getEmail(), u.getRole().name(), u.isActive()))
                .toList();
    }

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public ProvisionUserResponse create(@Valid @RequestBody ProvisionUserRequest r) {
        final Role role;
        try {
            role = Role.valueOf(r.getRole().trim().toUpperCase());
        } catch (Exception ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Role must be STUDENT, FACULTY, or ADMIN");
        }

        String email = r.getEmail().trim().toLowerCase();

        if (users.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email is already registered");
        }

        // Validate role-specific identifiers BEFORE creating the User,
        // so an invalid request can never create a partial account.
        if (role == Role.STUDENT) {
            if (r.getRollNo() == null || r.getRollNo().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "rollNo is required for a STUDENT");
            }
            if (students.existsByRollNoIgnoreCase(r.getRollNo().trim())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Roll number is already registered");
            }
        }

        if (role == Role.FACULTY) {
            if (r.getFacultyId() == null || r.getFacultyId().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "facultyId is required for a FACULTY");
            }
            if (faculty.existsByFacultyIdIgnoreCase(r.getFacultyId().trim())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Faculty ID is already registered");
            }
        }

        AuthService.ProvisionedUser provisioned;
        String temporaryPassword = null;

        if (role == Role.STUDENT || role == Role.FACULTY) {
            provisioned = auth.createWithTemporaryPassword(r.getName(), email, role);
            temporaryPassword = provisioned.temporaryPassword();
        } else {
            User user = auth.create(r.getName(), email, r.getPassword(), role);
            provisioned = new AuthService.ProvisionedUser(user, null);
        }

        User u = provisioned.user();

        if (role == Role.STUDENT) {
            Student s = new Student();
            s.setName(r.getName().trim());
            s.setEmail(u.getEmail());
            s.setRollNo(r.getRollNo().trim());
            s.setPhone(r.getPhone());
            s.setDepartment(r.getDepartment());
            s.setSection(r.getSection());
            s.setYear(r.getYear());
            s.setSemester(r.getSemester());
            s.setUserId(u.getId());
            students.save(s);
        }

        if (role == Role.FACULTY) {
            Faculty f = new Faculty();
            f.setName(r.getName().trim());
            f.setEmail(u.getEmail());
            f.setFacultyId(r.getFacultyId().trim());
            f.setPhone(r.getPhone());
            f.setDepartment(r.getDepartment());
            f.setDesignation(r.getDesignation());
            f.setUserId(u.getId());
            faculty.save(f);
        }

        return new ProvisionUserResponse(
                u.getId(),
                u.getName(),
                u.getEmail(),
                u.getRole().name(),
                u.isActive(),
                temporaryPassword);
    }

    @PutMapping("/users/{id}/status")
    public UserView status(@PathVariable Long id, @RequestParam boolean active) {
        User u = users.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        u.setActive(active);
        u = users.save(u);
        return new UserView(u.getId(), u.getName(), u.getEmail(), u.getRole().name(), u.isActive());
    }

    public record UserView(Long id, String name, String email, String role, boolean active) {
    }
}

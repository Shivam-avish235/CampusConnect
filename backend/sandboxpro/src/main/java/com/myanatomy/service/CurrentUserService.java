package com.myanatomy.service;

import com.myanatomy.entity.Role;
import com.myanatomy.entity.User;
import com.myanatomy.repository.UserRepository;
import com.myanatomy.repository.StudentRepository;
import com.myanatomy.repository.FacultyRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class CurrentUserService {
    private final UserRepository users;
    private final StudentRepository students;
    private final FacultyRepository faculty;
    public CurrentUserService(UserRepository users, StudentRepository students, FacultyRepository faculty) { this.users = users; this.students = students; this.faculty = faculty; }

    public User requireUser() {
        Authentication a = SecurityContextHolder.getContext().getAuthentication();
        if (a == null || !a.isAuthenticated() || a.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        return users.findByEmail(a.getName().trim().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }

    public boolean is(Role role) { return requireUser().getRole() == role; }
    public Long requireStudentId() {
        User u = requireUser();
        if (u.getRole() != Role.STUDENT) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Student account required");
        return students.findByUserId(u.getId()).map(com.myanatomy.entity.Student::getId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student profile not found"));
    }
    public Long requireFacultyId() {
        User u = requireUser();
        if (u.getRole() != Role.FACULTY) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Faculty account required");
        return faculty.findByUserId(u.getId()).map(com.myanatomy.entity.Faculty::getId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Faculty profile not found"));
    }
}

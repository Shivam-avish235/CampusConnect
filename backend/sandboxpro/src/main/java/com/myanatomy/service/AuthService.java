package com.myanatomy.service;

import com.myanatomy.dto.AuthResponse;
import com.myanatomy.dto.LoginRequest;
import com.myanatomy.entity.Role;
import com.myanatomy.entity.User;
import com.myanatomy.repository.UserRepository;
import com.myanatomy.repository.StudentRepository;
import com.myanatomy.repository.FacultyRepository;
import com.myanatomy.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class AuthService {
    private static final String TEMP_PASSWORD_CHARS =
            "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$%";
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;
    private final StudentRepository students;
    private final FacultyRepository faculty;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwt, StudentRepository students, FacultyRepository faculty) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
        this.students = students;
        this.faculty = faculty;
    }

    public AuthResponse login(LoginRequest r) {
        String email = r.getEmail().trim().toLowerCase();
        User u = users.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!u.isActive() || !encoder.matches(r.getPassword(), u.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        Long profileId = null;
        if (u.getRole() == Role.STUDENT) {
            profileId = students.findByUserId(u.getId()).map(com.myanatomy.entity.Student::getId).orElse(null);
        } else if (u.getRole() == Role.FACULTY) {
            profileId = faculty.findByUserId(u.getId()).map(com.myanatomy.entity.Faculty::getId).orElse(null);
        }
        return new AuthResponse(
                jwt.generateToken(u.getEmail(), u.getRole().name()),
                u.getId(),
                u.getName(),
                u.getEmail(),
                u.getRole().name(),
                profileId);
    }

    /**
     * Creates a user when the caller already knows the password.
     * Used for the initial ADMIN account and any future password-setting flow.
     */
    public User create(String name, String email, String password, Role role) {
        String normalizedEmail = email.trim().toLowerCase();
        if (users.findByEmail(normalizedEmail).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        if (password == null || password.isBlank()) {
            throw new RuntimeException("Password is required for " + role + " account");
        }

        return users.save(new User(
                name.trim(),
                normalizedEmail,
                encoder.encode(password),
                role));
    }

    /**
     * Creates a STUDENT/FACULTY account with a secure random temporary password.
     * The returned plain-text password is intended to be shown to the admin once.
     * Only its BCrypt hash is stored in MySQL.
     */
    public ProvisionedUser createWithTemporaryPassword(String name, String email, Role role) {
        if (role != Role.STUDENT && role != Role.FACULTY) {
            throw new IllegalArgumentException("Temporary passwords are only for STUDENT and FACULTY accounts");
        }

        String temporaryPassword = generateTemporaryPassword();
        User user = create(name, email, temporaryPassword, role);
        return new ProvisionedUser(user, temporaryPassword);
    }

    private String generateTemporaryPassword() {
        // 12 characters, with at least one upper, lower, digit and special char.
        StringBuilder password = new StringBuilder(12);
        password.append(randomFrom("ABCDEFGHJKLMNPQRSTUVWXYZ"));
        password.append(randomFrom("abcdefghijkmnopqrstuvwxyz"));
        password.append(randomFrom("23456789"));
        password.append(randomFrom("@#$%"));

        while (password.length() < 12) {
            password.append(randomFrom(TEMP_PASSWORD_CHARS));
        }

        // Shuffle so the required character types are not always in the same positions.
        for (int i = password.length() - 1; i > 0; i--) {
            int j = RANDOM.nextInt(i + 1);
            char tmp = password.charAt(i);
            password.setCharAt(i, password.charAt(j));
            password.setCharAt(j, tmp);
        }
        return password.toString();
    }

    private char randomFrom(String chars) {
        return chars.charAt(RANDOM.nextInt(chars.length()));
    }

    public record ProvisionedUser(User user, String temporaryPassword) {
    }
}

package com.myanatomy.config;

import com.myanatomy.entity.*;
import com.myanatomy.repository.UserRepository;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    @Value("${ADMIN_NAME:CampusConnect Admin}")
    String name;
    @Value("${ADMIN_EMAIL:admin@campusconnect.edu.in}")
    String email;
    @Value("${ADMIN_PASSWORD:Admin@12345}")
    String password;

    public DataInitializer(UserRepository u, PasswordEncoder e) {
        users = u;
        encoder = e;
    }

    public void run(String... args) {
        if (users.findByEmail(email).isEmpty()) {
            users.save(new User(name, email, encoder.encode(password), Role.ADMIN));
        }
    }
}

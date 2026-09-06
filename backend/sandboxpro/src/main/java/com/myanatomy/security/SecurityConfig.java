package com.myanatomy.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.myanatomy.repository.UserRepository;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // =========================================================
    // PASSWORD ENCODER
    // =========================================================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // =========================================================
    // DATABASE USER DETAILS SERVICE
    // Prevents Spring Security from creating an in-memory user.
    // Authentication for CampusConnect users is backed by MySQL.
    // =========================================================

    @Bean
    public UserDetailsService userDetailsService(UserRepository users) {
        return username -> users.findByEmail(username.trim().toLowerCase())
                .map(u -> org.springframework.security.core.userdetails.User
                        .withUsername(u.getEmail())
                        .password(u.getPassword())
                        .roles(u.getRole().name())
                        .disabled(!u.isActive())
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    // =========================================================
    // SECURITY FILTER CHAIN
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

                // -------------------------------------------------
                // CORS
                // -------------------------------------------------
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // -------------------------------------------------
                // CSRF
                // -------------------------------------------------
                .csrf(csrf -> csrf.disable())

                // -------------------------------------------------
                // SESSION
                // JWT is stateless
                // -------------------------------------------------
                .sessionManagement(session -> session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))

                // -------------------------------------------------
                // AUTHORIZATION
                // -------------------------------------------------
                .authorizeHttpRequests(auth -> auth

                        // =================================================
                        // PUBLIC ENDPOINTS
                        // =================================================

                        // Swagger
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**")
                        .permitAll()

                        // Login
                        .requestMatchers(
                                "/api/auth/login")
                        .permitAll()

                        // Spring error endpoint
                        .requestMatchers(
                                "/error")
                        .permitAll()

                        // CORS preflight
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**")
                        .permitAll()

                        // =================================================
                        // ADMIN ONLY
                        // =================================================

                        .requestMatchers(
                                "/api/admin/**")
                        .hasRole("ADMIN")

                        // =================================================
                        // ADMIN:
                        // CREATE STUDENTS / FACULTY / DEPARTMENTS
                        // =================================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/departments/**",
                                "/api/students/**",
                                "/api/faculty/**")
                        .hasRole("ADMIN")

                        // =================================================
                        // ADMIN:
                        // UPDATE STUDENTS / FACULTY / DEPARTMENTS
                        // =================================================

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/departments/**",
                                "/api/students/**",
                                "/api/faculty/**")
                        .hasRole("ADMIN")

                        // =================================================
                        // ADMIN:
                        // DELETE STUDENTS / FACULTY / DEPARTMENTS
                        // =================================================

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/departments/**",
                                "/api/students/**",
                                "/api/faculty/**")
                        .hasRole("ADMIN")

                        // =================================================
                        // FACULTY + ADMIN:
                        // CREATE
                        // =================================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/courses/**",
                                "/api/sections/**",
                                "/api/assignments/**",
                                "/api/attendance/**",
                                "/api/results/**",
                                "/api/marks/**",
                                "/api/materials/**",
                                "/api/announcements/**",
                                "/api/events/**",
                                "/api/placements/**",
                                "/api/timetable/**")
                        .hasAnyRole(
                                "FACULTY",
                                "ADMIN")

                        // =================================================
                        // FACULTY + ADMIN:
                        // UPDATE
                        // =================================================

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/courses/**",
                                "/api/sections/**",
                                "/api/assignments/**",
                                "/api/attendance/**",
                                "/api/results/**",
                                "/api/marks/**",
                                "/api/materials/**",
                                "/api/announcements/**",
                                "/api/events/**",
                                "/api/placements/**",
                                "/api/timetable/**")
                        .hasAnyRole(
                                "FACULTY",
                                "ADMIN")

                        // =================================================
                        // FACULTY + ADMIN:
                        // DELETE
                        // =================================================

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/courses/**",
                                "/api/sections/**",
                                "/api/assignments/**",
                                "/api/materials/**",
                                "/api/announcements/**",
                                "/api/events/**",
                                "/api/placements/**",
                                "/api/timetable/**")
                        .hasAnyRole(
                                "FACULTY",
                                "ADMIN")

                        // =================================================
                        // STUDENT:
                        // CREATE
                        // =================================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/submissions/**",
                                "/api/placement-applications/**",
                                "/api/event-registrations/**")
                        .hasRole("STUDENT")

                        // =================================================
                        // STUDENT + FACULTY + ADMIN:
                        // UPDATE
                        // =================================================

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/submissions/**",
                                "/api/placement-applications/**",
                                "/api/event-registrations/**")
                        .hasAnyRole(
                                "STUDENT",
                                "FACULTY",
                                "ADMIN")

                        // =================================================
                        // STUDENT + FACULTY + ADMIN:
                        // DELETE
                        // =================================================

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/submissions/**",
                                "/api/placement-applications/**",
                                "/api/event-registrations/**")
                        .hasAnyRole(
                                "STUDENT",
                                "FACULTY",
                                "ADMIN")

                        // =================================================
                        // EVERYTHING ELSE
                        // =================================================

                        .anyRequest().authenticated())

                // -------------------------------------------------
                // JWT FILTER
                // -------------------------------------------------

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // =========================================================
    // CORS CONFIGURATION
    // =========================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // React / Vite development servers
 configuration.setAllowedOriginPatterns(List.of(
    "http://localhost:*",
    "http://127.0.0.1:*",
    "http://192.168.1.2:*",
    "http://192.168.56.1:*"
));
        // HTTP methods
        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"));

        // Request headers
        configuration.setAllowedHeaders(
                List.of("*"));

        // Allow Authorization / cookies if needed
        configuration.setAllowCredentials(true);

        // Register CORS configuration
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration);

        return source;
    }
}
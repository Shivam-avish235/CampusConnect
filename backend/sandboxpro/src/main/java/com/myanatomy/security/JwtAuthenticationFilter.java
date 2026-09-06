package com.myanatomy.security;

import com.myanatomy.entity.User;
import com.myanatomy.repository.UserRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwt;
    private final UserRepository users;

    public JwtAuthenticationFilter(JwtService jwt, UserRepository users) {
        this.jwt = jwt;
        this.users = users;
    }

    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        String h = req.getHeader("Authorization");
        if (h == null || !h.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }
        try {
            String token = h.substring(7);
            if (jwt.isTokenValid(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
                String email = jwt.extractEmail(token);
                User u = users.findByEmail(email).orElse(null);
                if (u != null && u.isActive()) {
                    var auth = new UsernamePasswordAuthenticationToken(u.getEmail(), null,
                            List.of(new SimpleGrantedAuthority("ROLE_" + u.getRole().name())));
                    auth.setDetails(u.getId());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        } catch (Exception ignored) {
        }
        chain.doFilter(req, res);
    }
}

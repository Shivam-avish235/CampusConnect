package com.myanatomy.repository;

import com.myanatomy.entity.User;
import com.myanatomy.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    List<User> findByRole(Role role);
}

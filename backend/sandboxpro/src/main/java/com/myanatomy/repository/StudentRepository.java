package com.myanatomy.repository;

import com.myanatomy.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByRollNoIgnoreCase(String rollNo);
    java.util.Optional<Student> findByUserId(Long userId);
}

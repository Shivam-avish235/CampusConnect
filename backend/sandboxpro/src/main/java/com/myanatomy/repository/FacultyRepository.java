package com.myanatomy.repository;

import com.myanatomy.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    boolean existsByFacultyIdIgnoreCase(String facultyId);

    java.util.Optional<Faculty> findByUserId(Long userId);
}
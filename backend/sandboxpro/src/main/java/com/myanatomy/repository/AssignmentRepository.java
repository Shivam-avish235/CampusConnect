package com.myanatomy.repository;

import com.myanatomy.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
}

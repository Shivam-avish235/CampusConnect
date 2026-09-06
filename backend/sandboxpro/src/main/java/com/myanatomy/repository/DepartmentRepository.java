package com.myanatomy.repository;

import com.myanatomy.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}

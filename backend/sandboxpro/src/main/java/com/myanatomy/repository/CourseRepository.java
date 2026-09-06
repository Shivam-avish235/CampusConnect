package com.myanatomy.repository;

import com.myanatomy.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface CourseRepository extends JpaRepository<Course, Long> {
}

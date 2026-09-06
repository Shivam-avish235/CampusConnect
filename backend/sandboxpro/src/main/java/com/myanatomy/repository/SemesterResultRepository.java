package com.myanatomy.repository;

import com.myanatomy.entity.SemesterResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SemesterResultRepository extends JpaRepository<SemesterResult, Long> {
    java.util.List<SemesterResult> findByStudentId(Long studentId);
}

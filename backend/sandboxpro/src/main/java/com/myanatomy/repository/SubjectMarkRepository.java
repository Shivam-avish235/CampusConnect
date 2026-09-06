package com.myanatomy.repository;

import com.myanatomy.entity.SubjectMark;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SubjectMarkRepository extends JpaRepository<SubjectMark, Long> {
    java.util.List<SubjectMark> findByStudentId(Long studentId);
}

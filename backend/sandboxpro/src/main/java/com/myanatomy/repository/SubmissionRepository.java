package com.myanatomy.repository;
import com.myanatomy.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    java.util.List<Submission> findByStudentId(Long studentId);
}

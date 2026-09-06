package com.myanatomy.repository;

import com.myanatomy.entity.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    java.util.List<EventRegistration> findByStudentId(Long studentId);
    boolean existsByEventIdAndStudentId(Long eventId, Long studentId);
}

package com.myanatomy.repository;

import com.myanatomy.entity.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {
    java.util.List<AttendanceRecord> findByStudentId(Long studentId);
    java.util.Optional<AttendanceRecord> findByStudentIdAndCourseAndDate(Long studentId, String course, String date);
}

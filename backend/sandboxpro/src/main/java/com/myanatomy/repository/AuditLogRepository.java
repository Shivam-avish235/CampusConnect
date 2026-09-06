package com.myanatomy.repository;

import com.myanatomy.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}

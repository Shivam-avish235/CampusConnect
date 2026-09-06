package com.myanatomy.repository;

import com.myanatomy.entity.PlacementApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface PlacementApplicationRepository extends JpaRepository<PlacementApplication, Long> {
    java.util.List<PlacementApplication> findByStudentId(Long studentId);
    boolean existsByDriveIdAndStudentId(Long driveId, Long studentId);
}

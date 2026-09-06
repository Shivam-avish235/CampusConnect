package com.myanatomy.repository;

import com.myanatomy.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}

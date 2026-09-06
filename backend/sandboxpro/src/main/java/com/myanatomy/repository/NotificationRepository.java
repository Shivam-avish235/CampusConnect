package com.myanatomy.repository;

import com.myanatomy.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    java.util.List<Notification> findByUserId(Long userId);
}

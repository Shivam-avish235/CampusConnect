package com.myanatomy.repository;

import com.myanatomy.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface EventRepository extends JpaRepository<Event, Long> {
}

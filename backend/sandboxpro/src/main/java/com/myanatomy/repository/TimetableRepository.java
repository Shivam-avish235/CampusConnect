package com.myanatomy.repository;

import com.myanatomy.entity.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {
}

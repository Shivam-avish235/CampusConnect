package com.myanatomy.repository;

import com.myanatomy.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SectionRepository extends JpaRepository<Section, Long> {
}

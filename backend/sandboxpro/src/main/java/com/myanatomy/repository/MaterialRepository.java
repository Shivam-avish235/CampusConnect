package com.myanatomy.repository;

import com.myanatomy.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface MaterialRepository extends JpaRepository<Material, Long> {
}

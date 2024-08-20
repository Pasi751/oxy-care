package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.model.Explorer;

@Repository
public interface ExplorerRepository extends JpaRepository<Explorer, Long> {
    // You can add custom query methods here if needed
}

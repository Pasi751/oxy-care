package com.example.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.model.CarbonEmissionResult;

@Repository
public interface CarbonEmissionRepository extends JpaRepository<CarbonEmissionResult, Long> {
    // You can add custom query methods here if needed
	
	List<CarbonEmissionResult> findAllByIndustrialistId(Long id);
}

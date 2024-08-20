package com.example.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.model.Agriculturist;

@Repository
public interface AgriculturistRepository extends JpaRepository<Agriculturist, Long> {

	Optional<Agriculturist> findByUsername(String username);
	
	boolean existsByUsernameOrEmail(String username, String email);
}

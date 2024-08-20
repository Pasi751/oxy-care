package com.example.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.model.Industrialist;

@Repository
public interface IndustrialistRepository extends JpaRepository<Industrialist, Long> {

	Optional<Industrialist> findByUsername(String username);
	
	boolean existsByUsernameOrEmail(String username, String email);
}

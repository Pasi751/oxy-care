package com.example.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByUsernameAndPassword(String username, String password);

	Optional<User> findByVerificationCode(String code);

	User findByUsername(String currentUsername);
	
}

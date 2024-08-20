package com.example.project.repository;

import com.example.project.model.IndustrialistProposalRequest;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndustrialistProposalRequestRepository extends JpaRepository<IndustrialistProposalRequest, Long> {

	List<IndustrialistProposalRequest> findByAgriculturistUsername(String username);
	
	List<IndustrialistProposalRequest> findByIndustrialistUsername(String username);
	
}

package com.example.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.model.Proposal;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {

	List<Proposal> findByIndustrialistUsername(String username);

	Proposal findByProposalTitle(String proposalTitle);
}

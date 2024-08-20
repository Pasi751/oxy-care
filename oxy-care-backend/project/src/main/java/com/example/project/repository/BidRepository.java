package com.example.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.model.Agriculturist;
import com.example.project.model.Bid;
import com.example.project.model.Proposal;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

	List<Bid> findByAgriculturistAndProposal(Agriculturist agriculturist, Proposal proposal);
    // Add any custom methods for BidRepository if needed
	
	Bid findByAgriculturist_UsernameAndProposal_ProposalTitle(String username, String proposalTitle);

	List<Bid> findAllByAgriculturistUsername(String username);
	
	
}

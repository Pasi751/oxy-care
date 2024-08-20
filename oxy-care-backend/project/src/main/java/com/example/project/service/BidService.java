package com.example.project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.project.dto.BidDTO2;
import com.example.project.dto.BidDTO3;
import com.example.project.exceptions.ResourceNotFoundException;
import com.example.project.model.Agriculturist;
import com.example.project.model.Bid;
import com.example.project.model.Proposal;
import com.example.project.repository.AgriculturistRepository;
import com.example.project.repository.BidRepository;
import com.example.project.repository.ProposalRepository;

@Service
public class BidService {

    private final BidRepository bidRepository;
    private final AgriculturistRepository agriculturistRepository;
    private final ProposalRepository proposalRepository;

    public BidService(BidRepository bidRepository, AgriculturistRepository agriculturistRepository, ProposalRepository proposalRepository) {
        this.bidRepository = bidRepository;
        this.agriculturistRepository = agriculturistRepository;
		this.proposalRepository = proposalRepository;
    }

    public Bid createBid(String agriculturistUsername, Long proposalId, Bid bid) {
        Optional<Agriculturist> agriculturistOptional = agriculturistRepository.findByUsername(agriculturistUsername);
        Optional<Proposal> proposalOptional = proposalRepository.findById(proposalId);
        
     // Check if the agriculturist has already added a bid for the same proposal
        List<Bid> existingBids = bidRepository.findByAgriculturistAndProposal(agriculturistOptional.get(), proposalOptional.get());
        if (!existingBids.isEmpty()) {
            throw new IllegalStateException("A bid for this proposal has already been added by agriculturist: " + agriculturistUsername);
        }

        if (agriculturistOptional.isPresent() && proposalOptional.isPresent()) {
            Agriculturist agriculturist = agriculturistOptional.get();
            Proposal proposal = proposalOptional.get();

            bid.setAgriculturist(agriculturist);
            bid.setProposal(proposal);
            return bidRepository.save(bid);
        } else {
            throw new ResourceNotFoundException("Agriculturist or Proposal id"+ agriculturistUsername + " or " + proposalId + "not found");
        }
    }
    
    public boolean updateBidStatusDecline(String username, String proposalTitle) {
        Bid bid = bidRepository.findByAgriculturist_UsernameAndProposal_ProposalTitle(username, proposalTitle);
        if (bid != null) {
            bid.setStatus(false);
            bidRepository.save(bid);
            return true;
        }
        return false;
    }
    
    public List<BidDTO2> getAllBidsByUsername(String username) {
    	
    	List<Bid> bidList = bidRepository.findAllByAgriculturistUsername(username);
    	
    	List<BidDTO2> bidDTOList = new ArrayList<>();
    	
    	for(Bid bid:bidList) {
    		
    		BidDTO2 bidDTO = new BidDTO2();
    		bidDTO.setBidId(String.valueOf(bid.getId()));
    		bidDTO.setIndustrialistName(bid.getProposal().getIndustrialist().getUsername());
    		bidDTO.setCompanyName(bid.getProposal().getCompanyName());
    		bidDTO.setProposalTitle(bid.getProposal().getProposalTitle());
    		bidDTO.setAmount(String.valueOf(bid.getAmount()));
    		bidDTO.setDays(String.valueOf(bid.getDays()));
    		bidDTO.setSkills(bid.getSkills());
    		bidDTO.setExperience(bid.getExperience());
    		bidDTO.setApproachDetails(bid.getApproach());
    		bidDTO.setTeamDetails(bid.getTeamMemberDetails());
    		bidDTO.setStatus(bid.getStatus());
    		
    		bidDTOList.add(bidDTO);
    	}
    	
    	
        return bidDTOList;
    }
    
    public List<BidDTO3> getCompletedBids(String username) {
        Agriculturist agriculturist = agriculturistRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Agriculturist not found"));

        Set<Bid> bidList = agriculturist.getBids();
        List<BidDTO3> completedBidsList = new ArrayList<>();

        for (Bid bid : bidList) {
            if (bid.getIsCompleted()) {
                BidDTO3 bidDTO3 = new BidDTO3();
                bidDTO3.setAmount(String.valueOf(bid.getAmount()));
                bidDTO3.setDate(bid.getDate());
                bidDTO3.setNoOfDays(String.valueOf(bid.getDays()));
                completedBidsList.add(bidDTO3);
            }
        }

        return completedBidsList;
    }

}

package com.example.project.service;

import java.util.ArrayList;
import java.util.Collections;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.project.dto.BidDTO;
import com.example.project.dto.MarkBidCompleteDTO;
import com.example.project.dto.ProposalDTO;
import com.example.project.dto.ProposalDTO2;
import com.example.project.dto.ProposalDTO3;
import com.example.project.model.Agriculturist;
import com.example.project.model.Bid;
import com.example.project.model.Industrialist;
import com.example.project.model.Proposal;
import com.example.project.repository.AgriculturistRepository;
import com.example.project.repository.BidRepository;
import com.example.project.repository.IndustrialistRepository;
import com.example.project.repository.ProposalRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ProposalService {
	
	private final ProposalRepository proposalRepository;
    private final IndustrialistRepository industrialistRepository;
    private final AgriculturistRepository agriculturistRepository;
    private final BidRepository bidRepository;

    @Autowired
    public ProposalService(ProposalRepository proposalRepository, IndustrialistRepository industrialistRepository,AgriculturistRepository agriculturistRepository,BidRepository bidRepository) {
        this.proposalRepository = proposalRepository;
        this.industrialistRepository = industrialistRepository;
        this.agriculturistRepository = agriculturistRepository;
        this.bidRepository = bidRepository;
    }
    
	
    public Proposal createProposal(String industrialistUsername, Proposal proposal) {
        Industrialist industrialist = industrialistRepository.findByUsername(industrialistUsername)
                .orElseThrow(() -> new EntityNotFoundException("Industrialist not found with username: " + industrialistUsername));
    
        proposal.setIndustrialist(industrialist);
        return proposalRepository.save(proposal);
    }
	
    
    public List<Proposal> getAllProposals() {
    	
    	List<Proposal> allProposals = proposalRepository.findAll();
    	List<Proposal> filteredProposals = new ArrayList<>();
        for (Proposal proposal : allProposals) {
            if (proposal.getAcceptedFarmer() == null && proposal.getIndustrialistProposalRequest() == null) {
                filteredProposals.add(proposal);
            }
        }
        return filteredProposals;
    }

    public Optional<Proposal> getProposalById(Long id) {
        return proposalRepository.findById(id);
    }

    public Proposal createProposal(Proposal proposal) {
        return proposalRepository.save(proposal);
    }

    public Proposal updateProposal(Long id, Proposal proposal) {
        if (proposalRepository.existsById(id)) {
            proposal.setId(id);
            return proposalRepository.save(proposal);
        }
        return null;
    }

    public void deleteProposal(Long id) {
        proposalRepository.deleteById(id);
    }
    
    public List<ProposalDTO> getProposalsByIndustrialistUsername(String username) {
        List<Proposal> proposals = proposalRepository.findByIndustrialistUsername(username);
        
        List<Proposal> filteredProposals = new ArrayList<>();

        for (Proposal proposal : proposals) {
            if (proposal.getAcceptedFarmer() == null) {
                filteredProposals.add(proposal);
            }
        }
        
        List<ProposalDTO> proposalDTOs = new ArrayList<>();
        
        
        
        for(Proposal proposal : filteredProposals) {
        	
        	ProposalDTO proposalDTO = new ProposalDTO();
        	proposalDTO.setProposalTitle(proposal.getProposalTitle());
        	proposalDTO.setProposalDescription(proposal.getAdditionalDetails());
        	List<BidDTO> bidList = new ArrayList<>();
        	
        	for(Bid bid:proposal.getBids()) {
        		
        		if (Boolean.FALSE.equals(bid.getStatus())) {
        		    continue;
        		}

        		BidDTO bidDTO = new BidDTO();
        		bidDTO.setFarmerName(bid.getAgriculturist().getUsername());
        		bidDTO.setFarmerCity(bid.getAgriculturist().getProvince());
        		bidDTO.setAmount(Double.toString(bid.getAmount()));
        		bidDTO.setDays(String.valueOf(bid.getDays()));
        		bidDTO.setSkills(bid.getSkills());
        		bidDTO.setExperience(bid.getExperience());
        		bidDTO.setApproachDetails(bid.getApproach());
        		bidDTO.setTeamDetails(bid.getTeamMemberDetails());
        		
        		bidList.add(bidDTO);
        	}
        	proposalDTO.setBidList(bidList);
        	proposalDTOs.add(proposalDTO);
        }
        
        
        return proposalDTOs;
    }
    
    public ResponseEntity<?> acceptFarmer(String farmerUsername, String proposalTitle) {
    	
        Optional<Agriculturist> agriculturistOptional = agriculturistRepository.findByUsername(farmerUsername);
        
        if (agriculturistOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agriculturist not found");
        }
        
        Agriculturist agriculturist = agriculturistOptional.get();

        Proposal proposal = proposalRepository.findByProposalTitle(proposalTitle);
        if (proposal == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proposal not found");
        }
        
        Set<Bid> bids = proposal.getBids();
        for (Bid bid : bids) {
            bid.setStatus(false);
        }
        
        Bid acceptedBid = bids.stream()
                .filter(bid -> bid.getAgriculturist().equals(agriculturist))
                .findFirst()
                .orElse(null);

        if (acceptedBid != null) {
            acceptedBid.setStatus(true);
        }

        proposal.setAcceptedFarmer(agriculturist);
        proposalRepository.save(proposal);

        return ResponseEntity.ok("Farmer accepted successfully");
    }
    
    
    public List<ProposalDTO2> getAcceptedFarmersByUsername(String username){
    	
    	List<Proposal> proposals = proposalRepository.findByIndustrialistUsername(username);
    	List<ProposalDTO2> proposalDTOList = proposals.stream()
    	        .filter(proposal -> proposal.getAcceptedFarmer() != null)
    	        .map(proposal -> {
    	            ProposalDTO2 dto = new ProposalDTO2();
    	            dto.setId(proposal.getId());
    	            dto.setProposalTitle(proposal.getProposalTitle());
    	            dto.setEstimatedCarbonEmission(String.valueOf(proposal.getEstimatedCarbonEmission()));
    	            dto.setMainEmissionSource(proposal.getMainEmissionSource());
    	            dto.setAdditionalDetails(proposal.getAdditionalDetails());
    	            dto.setFarmerUsername(proposal.getAcceptedFarmer().getUsername());
    	            dto.setFarmerCity(proposal.getAcceptedFarmer().getCity());
    	            dto.setFarmerProvince(proposal.getAcceptedFarmer().getProvince());
    	            Boolean isCompleted = proposal.getBids().stream()
                            .filter(bid -> bid.getIsCompleted() != null)
                            .map(Bid::getIsCompleted)
                            .findFirst()
                            .orElse(false);
                    dto.setIsCompleted(isCompleted);
    	            return dto;
    	        })
    	        .collect(Collectors.toList());
    	return proposalDTOList;
    }


    public List<ProposalDTO3> getAllProposalsForAgriculturist(String username) {
        Optional<Agriculturist> agriculturistOptional = agriculturistRepository.findByUsername(username);
        if (agriculturistOptional.isEmpty()) {
            // Handle the case where agriculturist is not found, e.g., throw an exception or return an empty list
            return Collections.emptyList();
        }

        Agriculturist agriculturist = agriculturistOptional.get();

        List<Proposal> allProposals = proposalRepository.findAll();
        List<ProposalDTO3> proposalDTOs = new ArrayList<>();

        for (Proposal proposal : allProposals) {
            if (proposal.getAcceptedFarmer() == null && proposal.getIndustrialistProposalRequest() == null && proposal.getBids().stream().noneMatch(bid -> bid.getAgriculturist().equals(agriculturist) && bid.getStatus() == null)) {
                ProposalDTO3 proposalDTO = new ProposalDTO3();
                proposalDTO.setId(proposal.getId());
                proposalDTO.setProposalTitle(proposal.getProposalTitle());
                proposalDTO.setUsername(proposal.getIndustrialist().getUsername());
                proposalDTO.setCompanyName(proposal.getCompanyName());
                proposalDTO.setIndustryType(proposal.getIndustryType());
                proposalDTO.setAmount(String.valueOf(proposal.getRewardOffered()));
                proposalDTOs.add(proposalDTO);
            }
        }

        return proposalDTOs;
    }
    
    public Boolean markBidAsCompleted(MarkBidCompleteDTO markBidCompleteDto) {
    	
        Proposal proposal = proposalRepository.findByProposalTitle(markBidCompleteDto.getProposalTitle());
        if (proposal == null) {
            return false;
        }

        Bid bid = proposal.getBids().stream()
                        .filter(b -> b.getStatus() == true)
                        .findFirst()
                        .orElse(null);

        if (bid == null) {
            return false;
        }
        
        bid.setDate(markBidCompleteDto.getDate());
        bid.setIsCompleted(true);
        bidRepository.save(bid);
        
        return true;
    }

	

}

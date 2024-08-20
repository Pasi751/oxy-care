package com.example.project.controller;
import com.example.project.dto.BidDTO3;
import com.example.project.dto.MarkBidCompleteDTO;
import com.example.project.dto.ProposalDTO;
import com.example.project.dto.ProposalDTO2;
import com.example.project.dto.ProposalDTO3;
import com.example.project.model.Proposal;
import com.example.project.service.BidService;
import com.example.project.service.ProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/proposals")
public class ProposalController {

    @Autowired
    private ProposalService proposalService;
    
    @Autowired
    private BidService bidService;

    @GetMapping
    public List<Proposal> getAllProposals() {
        return proposalService.getAllProposals();
    }
    
    @GetMapping("/agriculturist/{username}")
    public List<ProposalDTO3> getAllProposalsForAgriculturist(@PathVariable String username) {
        return proposalService.getAllProposalsForAgriculturist(username);
    }

    @GetMapping("/industrialist/{username}")
    public ResponseEntity<List<ProposalDTO>> getProposalsByIndustrialistUsername(@PathVariable String username) {
        List<ProposalDTO> proposals = proposalService.getProposalsByIndustrialistUsername(username);
        return ResponseEntity.ok(proposals);
    }
    
    @PostMapping("/accept-farmer")
    public ResponseEntity<?> acceptFarmer(@RequestParam String farmerUsername, @RequestParam String proposalTitle) {
        return proposalService.acceptFarmer(farmerUsername, proposalTitle);
    }
    
    @GetMapping("/{username}/accepted-farmers")
    public ResponseEntity<List<ProposalDTO2>> getAcceptedFarmersByUsername(@PathVariable String username) {
        List<ProposalDTO2> proposals = proposalService.getAcceptedFarmersByUsername(username);
        return new ResponseEntity<>(proposals, HttpStatus.OK);
    }
    
    @PutMapping("/mark-bid-completed")
    public ResponseEntity<String> markBidAsCompleted(@RequestBody MarkBidCompleteDTO markBidCompleteDto) {
    		
    		
            Boolean isFound = proposalService.markBidAsCompleted(markBidCompleteDto);
            
            if(isFound == true) {
            	return ResponseEntity.ok("Bid marked as completed successfully");
            }
            else {
            	return ResponseEntity.notFound().build();
            }   
    }
    
    
    @GetMapping("/agriculturist/completed-bids/{username}")
    public ResponseEntity<List<BidDTO3>> getCompletedBids(@PathVariable String username) {
        List<BidDTO3> completedBids = bidService.getCompletedBids(username);
        return ResponseEntity.ok(completedBids);
    }

    
    
}

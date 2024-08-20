package com.example.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.BidDTO2;
import com.example.project.model.Bid;
import com.example.project.service.BidService;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/bids")
public class BidController {

    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PutMapping("/updateStatusDecline")
    public ResponseEntity<String> updateBidStatus(@RequestParam String username, @RequestParam String proposalTitle) {
        boolean updated = bidService.updateBidStatusDecline(username, proposalTitle);
        if (updated) {
            return ResponseEntity.ok("Bid status updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to update bid status");
        }
    }
    
    @GetMapping("/{username}")
    public ResponseEntity<List<BidDTO2>> getAllBidsByUsername(@PathVariable String username) {
        List<BidDTO2> bids = bidService.getAllBidsByUsername(username);
        return new ResponseEntity<>(bids, HttpStatus.OK);
    }
    
}

package com.example.project.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.AgriculturistDTO;
import com.example.project.model.Agriculturist;
import com.example.project.model.Bid;
import com.example.project.service.AgriculturistService;
import com.example.project.service.BidService;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AgriculturistController {

    private final AgriculturistService agriculturistService;
    
    private final BidService bidService;

    @Autowired
    public AgriculturistController(AgriculturistService agriculturistService,BidService bidService) {
        this.agriculturistService = agriculturistService;
		this.bidService = bidService;
    }

    @GetMapping("/agriculturists/viewAll")
    public ResponseEntity<List<AgriculturistDTO>> getAllAgriculturists() {
        List<AgriculturistDTO> agriculturists = agriculturistService.getAllAgriculturists();
        return ResponseEntity.ok().body(agriculturists);
    }
    
    @DeleteMapping("/deleteAgriculturist/{id}")
    public ResponseEntity<String> deleteAgriculturistById(@PathVariable Long id) {
        boolean deleted = agriculturistService.deleteAgriculturistById(id);
        if (deleted) {
            return new ResponseEntity<>("Agriculturist with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Agriculturist with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
    
    @PutMapping("/updateAgriculturist/{id}")
    public ResponseEntity<Agriculturist> updateAgriculturist(@PathVariable Long id, @RequestBody Agriculturist updatedAgriculturist) {
        Agriculturist agriculturist = agriculturistService.updateAgriculturist(id, updatedAgriculturist);
        if (agriculturist != null) {
            return ResponseEntity.ok(agriculturist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/getAgriculturist/{id}")
    public ResponseEntity<Agriculturist> getAgriculturistById(@PathVariable Long id) {
        Agriculturist agriculturist = agriculturistService.getAgriculturistById(id);
        if (agriculturist != null) {
            return ResponseEntity.ok(agriculturist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/agriculturist/{agriculturistUsername}/proposal/{proposalId}")
    public ResponseEntity<String> createBid(@PathVariable String agriculturistUsername, @PathVariable Long proposalId, @RequestBody Bid bid) {
        Bid savedBid = bidService.createBid(agriculturistUsername, proposalId, bid);
        if (savedBid != null) {
            return new ResponseEntity<>("Bid saved successfully.", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to save Bid.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


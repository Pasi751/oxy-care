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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.project.dto.IndustrialistDTO;
import com.example.project.model.Industrialist;
import com.example.project.model.Proposal;
import com.example.project.service.IndustrialistService;
import com.example.project.service.ProposalService;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class IndustrialistController {

    private final IndustrialistService industrialistService;
    
    private final ProposalService proposalService;

    @Autowired
    public IndustrialistController(IndustrialistService industrialistService,ProposalService proposalService) {
        this.industrialistService = industrialistService;
		this.proposalService = proposalService;
    }

    @GetMapping("/industrialists/viewAll")
    public ResponseEntity<List<IndustrialistDTO>> getAllIndustrialists() {
        List<IndustrialistDTO> industrialists = industrialistService.getAllIndustrialists();
        return ResponseEntity.ok().body(industrialists);
    }
    
    @DeleteMapping("deleteIndustrialist/{id}")
    public ResponseEntity<String> deleteIndustrialistById(@PathVariable Long id) {
        boolean deleted = industrialistService.deleteIndustrialistById(id);
        if (deleted) {
            return new ResponseEntity<>("Industrialist with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Industrialist with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("industrialist/{id}")
    public ResponseEntity<Industrialist> getIndustrialistById(@PathVariable Long id) {
        Industrialist industrialist = industrialistService.getIndustrialistById(id);
        if (industrialist != null) {
            return ResponseEntity.ok(industrialist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("updateIndustrialist/{id}")
    public ResponseEntity<Industrialist> updateIndustrialist(@PathVariable Long id, @RequestBody Industrialist updatedIndustrialist) {
        Industrialist industrialist = industrialistService.updateIndustrialist(id, updatedIndustrialist);
        return ResponseEntity.ok(industrialist);
    }
    
    @GetMapping("industrialist/{username}/id")
    public ResponseEntity<Long> getIndustrialistIdByUsername(@PathVariable String username) {
        Long industrialistId = industrialistService.getIndustrialistIdByUsername(username);
        if (industrialistId != null) {
            return ResponseEntity.ok(industrialistId);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/createProposal/{industrialistUsername}")
    public ResponseEntity<Proposal> createProposal(@PathVariable String industrialistUsername, @RequestBody Proposal proposal) {
        Proposal createdProposal = proposalService.createProposal(industrialistUsername, proposal);
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdProposal.getId())
                .toUri())
                .body(createdProposal);
    }
    
    @GetMapping("/industrialists/{username}")
    public Industrialist getIndustrialistByUsername(@PathVariable String username) {
        return industrialistService.findByUsername(username);
    }
    
    
}

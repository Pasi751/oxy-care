package com.example.project.controller;
import com.example.project.dto.CreateIndustrialistProposalRequestDTO;
import com.example.project.dto.IndustrialistRequestDto;
import com.example.project.model.Agriculturist;
import com.example.project.model.Industrialist;
import com.example.project.model.IndustrialistProposalRequest;
import com.example.project.model.Proposal;
import com.example.project.repository.AgriculturistRepository;
import com.example.project.repository.IndustrialistRepository;
import com.example.project.service.IndustrialistProposalRequestService;
import com.example.project.service.ProposalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/requests")
public class IndustrialistProposalRequestController {

    @Autowired
    private IndustrialistProposalRequestService service;
    
    @Autowired
    private ProposalService proposalService;
    
    @Autowired
    private AgriculturistRepository agriculturistRepository;
    
    @Autowired
    private IndustrialistRepository industrialistRepository;

    @GetMapping
    public ResponseEntity<List<IndustrialistProposalRequest>> getAllRequests() {
        List<IndustrialistProposalRequest> requests = service.getAllRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IndustrialistProposalRequest> getRequestById(@PathVariable Long id) {
        return service.getRequestById(id)
                .map(request -> new ResponseEntity<>(request, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<IndustrialistProposalRequest> createRequest(@RequestBody IndustrialistProposalRequest request) {
        IndustrialistProposalRequest createdRequest = service.createRequest(request);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IndustrialistProposalRequest> updateRequest(@PathVariable Long id, @RequestBody IndustrialistProposalRequest request) {
        IndustrialistProposalRequest updatedRequest = service.updateRequest(id, request);
        return updatedRequest != null
                ? new ResponseEntity<>(updatedRequest, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        return service.deleteRequest(id)
                ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @PostMapping("/create")
    public ResponseEntity<IndustrialistProposalRequest> createIndustrialistProposalRequest(@RequestBody CreateIndustrialistProposalRequestDTO requestDTO) {
        Optional<Industrialist> industrialistOptional = industrialistRepository.findByUsername(requestDTO.getIndustrialistUsername());
        Optional<Agriculturist> agriculturistOptional = agriculturistRepository.findByUsername(requestDTO.getAgriculturistUsername());

        if (industrialistOptional.isEmpty() || agriculturistOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        requestDTO.getProposal().setIndustrialist(industrialistOptional.get());
        // Save the Proposal first
        Proposal proposal = proposalService.createProposal(requestDTO.getProposal());

        IndustrialistProposalRequest request = new IndustrialistProposalRequest();
        request.setIndustrialist(industrialistOptional.get());
        request.setAgriculturist(agriculturistOptional.get());
        request.setProposal(proposal);

        IndustrialistProposalRequest createdRequest = service.createRequest(request);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }
    
    @GetMapping("/agriculturist/{username}")
    public ResponseEntity<List<IndustrialistRequestDto>> getIndustrialistRequestsForAgriculturist(@PathVariable String username) {
        List<IndustrialistRequestDto> requestDtos = service.getIndustrialistRequestsForAgriculturist(username);
        return ResponseEntity.ok(requestDtos);
    }
    
    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable Long id) {
        Boolean updated = service.updateStatus(id);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        if (updated) {
            return ResponseEntity.ok("Updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Updating failed");
        }
    }
    
    
    @PutMapping("/declineStatus/{id}")
    public ResponseEntity<String> declineStatus(@PathVariable Long id) {
        Boolean updated = service.declineStatus(id);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        if (updated) {
            return ResponseEntity.ok("Updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Updating failed");
        }
    }
    
    @GetMapping("/findByIndustrialist/{username}")
    public ResponseEntity<List<IndustrialistRequestDto>> findByIndustrialist(@PathVariable String username) {
        List<IndustrialistProposalRequest> requests = service.findByIndustrialistUsername(username);
        if (requests.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<IndustrialistRequestDto> dtos = new ArrayList<>();
        for (IndustrialistProposalRequest request : requests) {
            IndustrialistRequestDto dto = new IndustrialistRequestDto();
            dto.setId(request.getId().toString());
            dto.setProposalTitle(request.getProposal().getProposalTitle());
            dto.setCompanyName(request.getProposal().getCompanyName());
            dto.setIndustryType(request.getProposal().getIndustryType());
            dto.setEstimatedCarbonEmission(request.getProposal().getEstimatedCarbonEmission().toString());
            dto.setRewardOffered(request.getProposal().getRewardOffered().toString());
            dto.setUsername(request.getAgriculturist().getUsername());
            dto.setContactNumber(request.getAgriculturist().getPhoneNumber());

            // Set status based on proposalStatus
            if (request.getProposalStatus() == null) {
                dto.setStatus("pending");
            } else if (request.getProposalStatus()) {
                dto.setStatus("accepted");
            } else {
                dto.setStatus("declined");
            }

            dtos.add(dto);
        }

        return ResponseEntity.ok(dtos);
    }
}



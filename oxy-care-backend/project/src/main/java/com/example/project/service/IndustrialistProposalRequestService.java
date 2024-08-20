package com.example.project.service;
import com.example.project.dto.IndustrialistRequestDto;
import com.example.project.model.IndustrialistProposalRequest;
import com.example.project.repository.IndustrialistProposalRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IndustrialistProposalRequestService {

    @Autowired
    private IndustrialistProposalRequestRepository repository;

    public List<IndustrialistProposalRequest> getAllRequests() {
        return repository.findAll();
    }

    public Optional<IndustrialistProposalRequest> getRequestById(Long id) {
        return repository.findById(id);
    }

    public IndustrialistProposalRequest createRequest(IndustrialistProposalRequest request) {
        return repository.save(request);
    }

    public IndustrialistProposalRequest updateRequest(Long id, IndustrialistProposalRequest request) {
        if (repository.existsById(id)) {
            request.setId(id);
            return repository.save(request);
        }
        return null;
    }
    

    public boolean deleteRequest(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<IndustrialistRequestDto> getIndustrialistRequestsForAgriculturist(String username) {
        List<IndustrialistProposalRequest> requests = repository.findByAgriculturistUsername(username);
        return requests.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private IndustrialistRequestDto mapToDto(IndustrialistProposalRequest request) {
        IndustrialistRequestDto dto = new IndustrialistRequestDto();
        dto.setId(String.valueOf(request.getId()));
        dto.setProposalTitle(request.getProposal().getProposalTitle());
        dto.setCompanyName(request.getProposal().getCompanyName());
        dto.setIndustryType(request.getProposal().getIndustryType());
        dto.setEstimatedCarbonEmission(String.valueOf(request.getProposal().getEstimatedCarbonEmission()));
        dto.setRewardOffered(String.valueOf(request.getProposal().getRewardOffered()));
        dto.setUsername(request.getIndustrialist().getUsername());
        dto.setStatus(String.valueOf(request.getProposalStatus()));
        return dto;
    }
    
    public Boolean updateStatus(Long id) {
        Optional<IndustrialistProposalRequest> requestOptional = repository.findById(id);
        if (requestOptional.isPresent()) {
            IndustrialistProposalRequest request = requestOptional.get();
            request.setProposalStatus(true);
            request.getProposal().setAcceptedFarmer(request.getAgriculturist());
            repository.save(request);
            return true;
        }
        return false;
    }
    
    public Boolean declineStatus(Long id) {
        Optional<IndustrialistProposalRequest> requestOptional = repository.findById(id);
        if (requestOptional.isPresent()) {
            IndustrialistProposalRequest request = requestOptional.get();
            request.setProposalStatus(false);
            return true;
        }
        return false;
    }
    
    public List<IndustrialistProposalRequest> findByIndustrialistUsername(String username) {
        return repository.findByIndustrialistUsername(username);
    }
}

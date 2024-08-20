package com.example.project.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.dto.IndustrialistDTO;
import com.example.project.exceptions.ResourceNotFoundException;
import com.example.project.model.Industrialist;
import com.example.project.repository.IndustrialistRepository;

@Service
public class IndustrialistService {

    private final IndustrialistRepository industrialistRepository;

    @Autowired
    public IndustrialistService(IndustrialistRepository industrialistRepository) {
        this.industrialistRepository = industrialistRepository;
    }

    public List<IndustrialistDTO> getAllIndustrialists() {
    	List<Industrialist> industrialists = industrialistRepository.findAll();
        
        List<IndustrialistDTO> industrialistDTOs = industrialists.stream()
                .map(industrialist -> convertToDto(industrialist))
                .collect(Collectors.toList());

        return industrialistDTOs;
    }
    
    public boolean deleteIndustrialistById(Long id) {
        Optional<Industrialist> industrialistOptional = industrialistRepository.findById(id);
        if (industrialistOptional.isPresent()) {
            industrialistRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    
    public Industrialist getIndustrialistById(Long id) {
        Optional<Industrialist> optionalIndustrialist = industrialistRepository.findById(id);
        return optionalIndustrialist.orElse(null);
    }
    
    
    public Industrialist updateIndustrialist(Long id, Industrialist updatedIndustrialist) {
        Industrialist industrialist = industrialistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Industrialist not found with id " + id));

        // Update the industrialist fields with the values from updatedIndustrialist
        industrialist.setUsername(updatedIndustrialist.getUsername());
        industrialist.setEmail(updatedIndustrialist.getEmail());
        industrialist.setCity(updatedIndustrialist.getCity());
        industrialist.setProvince(updatedIndustrialist.getProvince());
        industrialist.setCompanyName(updatedIndustrialist.getCompanyName());
        industrialist.setCompanyType(updatedIndustrialist.getCompanyType());
        industrialist.setCompanySize(updatedIndustrialist.getCompanySize());

        // Save the updated industrialist
        return industrialistRepository.save(industrialist);
    }
    
    
    public Long getIndustrialistIdByUsername(String username) {
        Optional<Industrialist> optionalIndustrialist = industrialistRepository.findByUsername(username);
        return optionalIndustrialist.map(Industrialist::getId).orElse(null);
    }
    
    public Industrialist findByUsername(String username) {
    	Optional<Industrialist> optionalIndustrialist = industrialistRepository.findByUsername(username);
        return optionalIndustrialist.orElse(null);
    }
    
    private IndustrialistDTO convertToDto(Industrialist industrialist) {
        IndustrialistDTO industrialistDTO = new IndustrialistDTO();
        industrialistDTO.setId(String.valueOf(industrialist.getId()));
        industrialistDTO.setUsername(industrialist.getUsername());
        industrialistDTO.setEmail(industrialist.getEmail());
        industrialistDTO.setCity(industrialist.getCity());
        industrialistDTO.setProvince(industrialist.getProvince());
        industrialistDTO.setCompanyName(industrialist.getCompanyName());
        industrialistDTO.setCompanyType(industrialist.getCompanyType());
        industrialistDTO.setCompanySize(industrialist.getCompanySize());
        return industrialistDTO;
    }

    
}

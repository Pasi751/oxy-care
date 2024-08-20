package com.example.project.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.dto.AgriculturistDTO;
import com.example.project.model.Agriculturist;
import com.example.project.repository.AgriculturistRepository;

@Service
public class AgriculturistService {

    private final AgriculturistRepository agriculturistRepository;

    @Autowired
    public AgriculturistService(AgriculturistRepository agriculturistRepository) {
        this.agriculturistRepository = agriculturistRepository;
    }

    public List<AgriculturistDTO> getAllAgriculturists() {
    	List<Agriculturist> agriculturists = agriculturistRepository.findAll();
    	
        List<AgriculturistDTO> agriculturistDTOs = agriculturists.stream()
                .map(agriculturist -> convertToDto(agriculturist))
                .collect(Collectors.toList());

        return agriculturistDTOs;
    }
    
    public boolean deleteAgriculturistById(Long id) {
        Optional<Agriculturist> agriculturistOptional = agriculturistRepository.findById(id);
        if (agriculturistOptional.isPresent()) {
            agriculturistRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public Agriculturist updateAgriculturist(Long id, Agriculturist updatedAgriculturist) {
        Optional<Agriculturist> agriculturistOptional = agriculturistRepository.findById(id);
        if (agriculturistOptional.isPresent()) {
            Agriculturist agriculturist = agriculturistOptional.get();
            agriculturist.setUsername(updatedAgriculturist.getUsername());
            agriculturist.setEmail(updatedAgriculturist.getEmail());
            agriculturist.setCity(updatedAgriculturist.getCity());
            agriculturist.setProvince(updatedAgriculturist.getProvince());
            agriculturist.setPhoneNumber(updatedAgriculturist.getPhoneNumber());
            agriculturist.setTypesOfTreesPlanted(updatedAgriculturist.getTypesOfTreesPlanted());
            agriculturist.setTreesPlanted(updatedAgriculturist.getTreesPlanted());
            // Set other attributes as needed
            agriculturistRepository.save(agriculturist);
            return agriculturist;
        }
        return null;
    }
    
    public Agriculturist getAgriculturistById(Long id) {
        Optional<Agriculturist> agriculturistOptional = agriculturistRepository.findById(id);
        return agriculturistOptional.orElse(null);
    }
    
    private AgriculturistDTO convertToDto(Agriculturist agriculturist) {
        AgriculturistDTO agriculturistDTO = new AgriculturistDTO();
        agriculturistDTO.setId(String.valueOf(agriculturist.getId()));
        agriculturistDTO.setUsername(agriculturist.getUsername());
        agriculturistDTO.setEmail(agriculturist.getEmail());
        agriculturistDTO.setCity(agriculturist.getCity());
        agriculturistDTO.setProvince(agriculturist.getProvince());
        agriculturistDTO.setPhoneNumber(agriculturist.getPhoneNumber());
        agriculturistDTO.setTypesOfTreesPlanted(agriculturist.getTypesOfTreesPlanted());
        agriculturistDTO.setTreesPlanted(String.valueOf(agriculturist.getTreesPlanted()));
        return agriculturistDTO;
    }
    
    
}

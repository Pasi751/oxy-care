package com.example.project.service;



import com.example.project.dto.ExplorerDTO;
import com.example.project.model.Explorer;
import com.example.project.repository.ExplorerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExplorerService {

    @Autowired
    private ExplorerRepository explorerRepository;


    public List<ExplorerDTO> getAllExplorers() {
    	List<Explorer> explorers = explorerRepository.findAll();
        
        List<ExplorerDTO> explorerDTOs = explorers.stream()
                .map(explorer -> convertToDto(explorer))
                .collect(Collectors.toList());

        return explorerDTOs;
    }


    public Explorer getExplorerById(Long id) {
        Optional<Explorer> optionalExplorer = explorerRepository.findById(id);
        return optionalExplorer.orElse(null);
    }


    public Explorer addExplorer(Explorer explorer) {
        return explorerRepository.save(explorer);
    }


    public Explorer updateExplorer(Long id, Explorer explorer) {
        Optional<Explorer> optionalExplorer = explorerRepository.findById(id);
        if (optionalExplorer.isPresent()) {
            Explorer existingExplorer = optionalExplorer.get();
            existingExplorer.setContactNumber(explorer.getContactNumber());
            existingExplorer.setUsername(explorer.getUsername());
            existingExplorer.setEmail(explorer.getEmail());
            // Set other fields here
            return explorerRepository.save(existingExplorer);
        }
        return null;
    }

    public String deleteExplorer(Long id) {
        Optional<Explorer> optionalExplorer = explorerRepository.findById(id);
        if (optionalExplorer.isPresent()) {
            explorerRepository.delete(optionalExplorer.get());
            return "Explorer with ID " + id + " deleted successfully.";
        } else {
            return "Explorer with ID " + id + " not found.";
        }
    }
    
    private ExplorerDTO convertToDto(Explorer explorer) {
        ExplorerDTO explorerDTO = new ExplorerDTO();
        explorerDTO.setId(String.valueOf(explorer.getId()));
        explorerDTO.setUsername(explorer.getUsername());
        explorerDTO.setEmail(explorer.getEmail());
        explorerDTO.setContactNumber(explorer.getContactNumber());
        explorerDTO.setCity(explorer.getCity());
        explorerDTO.setProvince(explorer.getProvince());
        return explorerDTO;
    }
}

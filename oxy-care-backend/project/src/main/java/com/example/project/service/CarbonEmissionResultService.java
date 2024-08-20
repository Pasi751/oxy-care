package com.example.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.project.model.CarbonEmissionResult;
import com.example.project.model.Industrialist;
import com.example.project.repository.CarbonEmissionRepository;
import com.example.project.repository.IndustrialistRepository;

@Service
public class CarbonEmissionResultService {

    private final IndustrialistRepository industrialistRepository;
    private final CarbonEmissionRepository carbonEmissionResultRepository;

    public CarbonEmissionResultService(IndustrialistRepository industrialistRepository, CarbonEmissionRepository carbonEmissionResultRepository) {
        this.industrialistRepository = industrialistRepository;
        this.carbonEmissionResultRepository = carbonEmissionResultRepository;
    }

    public boolean saveCarbonEmissionResultForIndustrialist(Long industrialistId, CarbonEmissionResult carbonEmissionResult) {
        Industrialist industrialist = industrialistRepository.findById(industrialistId).orElse(null);
        if (industrialist != null) {
            carbonEmissionResult.setIndustrialist(industrialist);
            carbonEmissionResultRepository.save(carbonEmissionResult);
            return true;
        }
        return false;
    }
    
    public List<CarbonEmissionResult> getAllCarbonEmissionResultsForIndustrialist(Long id) {
        return carbonEmissionResultRepository.findAllByIndustrialistId(id);
    }
}

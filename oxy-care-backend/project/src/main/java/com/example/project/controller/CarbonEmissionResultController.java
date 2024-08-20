package com.example.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.model.CarbonEmissionResult;
import com.example.project.service.CarbonEmissionResultService;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/carbon-emission-results")
public class CarbonEmissionResultController {

    private final CarbonEmissionResultService carbonEmissionResultService;

    public CarbonEmissionResultController(CarbonEmissionResultService carbonEmissionResultService) {
        this.carbonEmissionResultService = carbonEmissionResultService;
    }

    @PostMapping("/industrialist/{id}")
    public ResponseEntity<String> addCarbonEmissionResult(@PathVariable Long id, @RequestBody CarbonEmissionResult carbonEmissionResult) {
        boolean saved = carbonEmissionResultService.saveCarbonEmissionResultForIndustrialist(id, carbonEmissionResult);
        if (saved) {
            return new ResponseEntity<>("Carbon Emission Result saved successfully.", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to save Carbon Emission Result.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/industrialist/{id}")
    public ResponseEntity<List<CarbonEmissionResult>> getAllCarbonEmissionResultsForIndustrialist(@PathVariable Long id) {
        List<CarbonEmissionResult> results = carbonEmissionResultService.getAllCarbonEmissionResultsForIndustrialist(id);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}

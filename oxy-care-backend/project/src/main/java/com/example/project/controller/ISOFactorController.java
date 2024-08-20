package com.example.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.model.ISOFactor;
import com.example.project.service.ISOFactorService;

import java.util.List;

@RestController
@RequestMapping("/iso-factors")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ISOFactorController {

    @Autowired
    private ISOFactorService isoFactorsService;

    @GetMapping
    public ResponseEntity<List<ISOFactor>> getAllIsoFactors() {
        List<ISOFactor> isoFactorsList = isoFactorsService.getAllIsoFactors();
        return new ResponseEntity<>(isoFactorsList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ISOFactor> getIsoFactorsById(@PathVariable Long id) {
        ISOFactor isoFactors = isoFactorsService.getIsoFactorsById(id);
        if (isoFactors != null) {
            return new ResponseEntity<>(isoFactors, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<ISOFactor> createIsoFactors(@RequestBody ISOFactor isoFactors) {
        ISOFactor createdIsoFactors = isoFactorsService.createIsoFactors(isoFactors);
        return new ResponseEntity<>(createdIsoFactors, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ISOFactor> updateIsoFactors(@PathVariable Long id, @RequestBody ISOFactor isoFactors) {
        ISOFactor updatedIsoFactors = isoFactorsService.updateIsoFactors(id, isoFactors);
        if (updatedIsoFactors != null) {
            return new ResponseEntity<>(updatedIsoFactors, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIsoFactors(@PathVariable Long id) {
        isoFactorsService.deleteIsoFactors(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

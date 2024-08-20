package com.example.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.model.ISOFactor;
import com.example.project.repository.ISOFactorRepository;

import java.util.List;

@Service
public class ISOFactorService {

    @Autowired
    private ISOFactorRepository isoFactorsRepository;

    public List<ISOFactor> getAllIsoFactors() {
        return isoFactorsRepository.findAll();
    }

    public ISOFactor getIsoFactorsById(Long id) {
        return isoFactorsRepository.findById(id).orElse(null);
    }

    public ISOFactor createIsoFactors(ISOFactor isoFactors) {
        return isoFactorsRepository.save(isoFactors);
    }

    public ISOFactor updateIsoFactors(Long id, ISOFactor isoFactors) {
        ISOFactor existingIsoFactors = isoFactorsRepository.findById(id).orElse(null);
        if (existingIsoFactors != null) {
            existingIsoFactors.setElectricity(isoFactors.getElectricity());
            existingIsoFactors.setNaturalGas(isoFactors.getNaturalGas());
            existingIsoFactors.setHeatingOil(isoFactors.getHeatingOil());
            existingIsoFactors.setPropane(isoFactors.getPropane());
            existingIsoFactors.setGasoline(isoFactors.getGasoline());
            existingIsoFactors.setDiesel(isoFactors.getDiesel());
            return isoFactorsRepository.save(existingIsoFactors);
        }
        return null;
    }

    public void deleteIsoFactors(Long id) {
        isoFactorsRepository.deleteById(id);
    }
}

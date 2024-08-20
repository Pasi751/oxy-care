package com.example.project.component;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.example.project.model.ISOFactor;
import com.example.project.repository.ISOFactorRepository;

@Component
public class ISOFactorInitializer implements ApplicationRunner {

    private final ISOFactorRepository isoFactorRepository;

    public ISOFactorInitializer(ISOFactorRepository isoFactorRepository) {
        this.isoFactorRepository = isoFactorRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        ISOFactor isoFactor = new ISOFactor();
        isoFactor.setElectricity(0.4);
        isoFactor.setNaturalGas(0.2);
        isoFactor.setHeatingOil(2.8);
        isoFactor.setPropane(2.5);
        isoFactor.setGasoline(2.3);
        isoFactor.setDiesel(2.7);
        isoFactor.setRawMaterials(1.5);
        isoFactor.setWasteGeneration(0.8);
        isoFactor.setProductionOutput(0.3);
        isoFactor.setTransportation(1.2);
        isoFactor.setProcessEmissions(3.0);
        isoFactor.setWaterUsage(0.6);
        isoFactor.setChemicalUsage(1.2);
        isoFactor.setPackagingMaterials(0.5);
        isoFactor.setCoolantsRefrigerants(2.0);
        isoFactor.setByproductUtilization(0.7);
        isoFactor.setSupplyChainEmissions(1.5);
        isoFactor.setRenewableEnergyUsage(0.8);
        isoFactor.setCcs(2.0);
        isoFactor.setLandUseChanges(1.3);
        isoFactor.setMethaneEmissions(25.0);
        isoFactor.setNitrousOxideEmissions(298.0);

        isoFactorRepository.save(isoFactor);
    }
}

package com.example.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ISOFactor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double electricity;
    private double naturalGas;
    private double heatingOil;
    private double propane;
    private double gasoline;
    private double diesel;
    private double rawMaterials;
    private double wasteGeneration;
    private double productionOutput;
    private double transportation;
    private double processEmissions;
    private double waterUsage;
    private double chemicalUsage;
    private double packagingMaterials;
    private double coolantsRefrigerants;
    private double byproductUtilization;
    private double supplyChainEmissions;
    private double renewableEnergyUsage;
    private double ccs;
    private double landUseChanges;
    private double methaneEmissions;
    private double nitrousOxideEmissions;
 

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getElectricity() {
        return electricity;
    }

    public void setElectricity(double electricity) {
        this.electricity = electricity;
    }

    public double getNaturalGas() {
        return naturalGas;
    }

    public void setNaturalGas(double naturalGas) {
        this.naturalGas = naturalGas;
    }

    public double getHeatingOil() {
        return heatingOil;
    }

    public void setHeatingOil(double heatingOil) {
        this.heatingOil = heatingOil;
    }

    public double getPropane() {
        return propane;
    }

    public void setPropane(double propane) {
        this.propane = propane;
    }

    public double getGasoline() {
        return gasoline;
    }

    public void setGasoline(double gasoline) {
        this.gasoline = gasoline;
    }

    public double getDiesel() {
        return diesel;
    }

    public void setDiesel(double diesel) {
        this.diesel = diesel;
    }

	public double getRawMaterials() {
		return rawMaterials;
	}

	public void setRawMaterials(double rawMaterials) {
		this.rawMaterials = rawMaterials;
	}

	public double getWasteGeneration() {
		return wasteGeneration;
	}

	public void setWasteGeneration(double wasteGeneration) {
		this.wasteGeneration = wasteGeneration;
	}

	public double getProductionOutput() {
		return productionOutput;
	}

	public void setProductionOutput(double productionOutput) {
		this.productionOutput = productionOutput;
	}

	public double getTransportation() {
		return transportation;
	}

	public void setTransportation(double transportation) {
		this.transportation = transportation;
	}

	public double getProcessEmissions() {
		return processEmissions;
	}

	public void setProcessEmissions(double processEmissions) {
		this.processEmissions = processEmissions;
	}

	public double getWaterUsage() {
		return waterUsage;
	}

	public void setWaterUsage(double waterUsage) {
		this.waterUsage = waterUsage;
	}

	public double getChemicalUsage() {
		return chemicalUsage;
	}

	public void setChemicalUsage(double chemicalUsage) {
		this.chemicalUsage = chemicalUsage;
	}

	public double getPackagingMaterials() {
		return packagingMaterials;
	}

	public void setPackagingMaterials(double packagingMaterials) {
		this.packagingMaterials = packagingMaterials;
	}

	public double getCoolantsRefrigerants() {
		return coolantsRefrigerants;
	}

	public void setCoolantsRefrigerants(double coolantsRefrigerants) {
		this.coolantsRefrigerants = coolantsRefrigerants;
	}

	public double getByproductUtilization() {
		return byproductUtilization;
	}

	public void setByproductUtilization(double byproductUtilization) {
		this.byproductUtilization = byproductUtilization;
	}

	public double getSupplyChainEmissions() {
		return supplyChainEmissions;
	}

	public void setSupplyChainEmissions(double supplyChainEmissions) {
		this.supplyChainEmissions = supplyChainEmissions;
	}

	public double getRenewableEnergyUsage() {
		return renewableEnergyUsage;
	}

	public void setRenewableEnergyUsage(double renewableEnergyUsage) {
		this.renewableEnergyUsage = renewableEnergyUsage;
	}

	public double getCcs() {
		return ccs;
	}

	public void setCcs(double ccs) {
		this.ccs = ccs;
	}

	public double getLandUseChanges() {
		return landUseChanges;
	}

	public void setLandUseChanges(double landUseChanges) {
		this.landUseChanges = landUseChanges;
	}

	public double getMethaneEmissions() {
		return methaneEmissions;
	}

	public void setMethaneEmissions(double methaneEmissions) {
		this.methaneEmissions = methaneEmissions;
	}

	public double getNitrousOxideEmissions() {
		return nitrousOxideEmissions;
	}

	public void setNitrousOxideEmissions(double nitrousOxideEmissions) {
		this.nitrousOxideEmissions = nitrousOxideEmissions;
	}
    
    
}

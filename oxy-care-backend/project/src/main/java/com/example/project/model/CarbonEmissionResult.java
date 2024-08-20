package com.example.project.model;

import jakarta.persistence.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "carbon_emission_results")
public class CarbonEmissionResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private double totalCarbonEmissions;
    private int urbanTreesNeeded;

    @ManyToOne
    @JsonIgnore // Ignore this field when serializing to JSON
    private Industrialist industrialist;


    public CarbonEmissionResult() {
    }

    public CarbonEmissionResult(LocalDate date, double totalCarbonEmissions, int urbanTreesNeeded) {
        this.date = date;
        this.totalCarbonEmissions = totalCarbonEmissions;
        this.urbanTreesNeeded = urbanTreesNeeded;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getTotalCarbonEmissions() {
        return totalCarbonEmissions;
    }

    public void setTotalCarbonEmissions(double totalCarbonEmissions) {
        this.totalCarbonEmissions = totalCarbonEmissions;
    }

    public int getUrbanTreesNeeded() {
        return urbanTreesNeeded;
    }

    public void setUrbanTreesNeeded(int urbanTreesNeeded) {
        this.urbanTreesNeeded = urbanTreesNeeded;
    }

    public Industrialist getIndustrialist() {
        return industrialist;
    }

    public void setIndustrialist(Industrialist industrialist) {
        this.industrialist = industrialist;
    }
}

package com.example.project.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Industrialist extends User {
	
	
    @OneToMany(mappedBy = "industrialist", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Proposal> proposals;
    
    @OneToOne(mappedBy = "industrialist")
    private IndustrialistProposalRequest industrialistProposalRequest;
    
    private String companyName;
    private String companyType;
    private String companySize;
    
    @OneToMany(mappedBy = "industrialist", cascade = CascadeType.ALL)
    private Set<CarbonEmissionResult> carbonEmissionResults;
    
    
    public Industrialist() {}
    
    
    

	public String getCompanyName() {
		return companyName;
	}




	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}




	public String getCompanyType() {
		return companyType;
	}




	public void setCompanyType(String companyType) {
		this.companyType = companyType;
	}




	public String getCompanySize() {
		return companySize;
	}




	public void setCompanySize(String companySize) {
		this.companySize = companySize;
	}


	public Set<Proposal> getProposals() {
		return proposals;
	}

	public void setProposals(Set<Proposal> proposals) {
		this.proposals = proposals;
	}
	
	public Set<CarbonEmissionResult> getCarbonEmissionResults() {
        return carbonEmissionResults;
    }

    public void setCarbonEmissionResults(Set<CarbonEmissionResult> carbonEmissionResults) {
        this.carbonEmissionResults = carbonEmissionResults;
    }

    
}

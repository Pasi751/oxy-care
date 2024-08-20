package com.example.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class IndustrialistProposalRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Agriculturist agriculturist;

    @OneToOne
    private Industrialist industrialist;
    
    @OneToOne
    private Proposal proposal;

    private Boolean proposalStatus;

    public IndustrialistProposalRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Agriculturist getAgriculturist() {
        return agriculturist;
    }

    public void setAgriculturist(Agriculturist agriculturist) {
        this.agriculturist = agriculturist;
    }

    public Industrialist getIndustrialist() {
        return industrialist;
    }

    public void setIndustrialist(Industrialist industrialist) {
        this.industrialist = industrialist;
    }

    public Boolean getProposalStatus() {
        return proposalStatus;
    }

    public void setProposalStatus(Boolean proposalStatus) {
        this.proposalStatus = proposalStatus;
    }

	public Proposal getProposal() {
		return proposal;
	}

	public void setProposal(Proposal proposal) {
		this.proposal = proposal;
	}
    
    
}
